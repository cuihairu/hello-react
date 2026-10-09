#!/usr/bin/env node
/**
 * dist 死链门禁：构建产物 docs/.vitepress/dist 全量内链审计。
 *
 * VitePress 内置死链检查（构建期，srcExclude 之外的源级链接）不覆盖两类：
 *   1. 指向被 srcExclude 排除文件的链接（如 SUMMARY.md）——源里存在、产物里 404
 *   2. 页内锚点（#fragment）失效——产物 HTML 里锚点 id 不存在
 * 本脚本在构建后扫 dist HTML 全部 href/src，逐条验证文件与锚点，任一失效即非零退出。
 *
 * 用法：node scripts/audit-links.mjs [distDir]  默认 docs/.vitepress/dist
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, posix } from 'node:path'

const DIST = process.argv[2] ?? 'docs/.vitepress/dist'
const BASE = 'hello-react' // 与 config.mts 的 base: '/hello-react/' 对应

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) walk(full, acc)
    else if (name.endsWith('.html')) acc.push(full)
  }
  return acc
}

const REF_RE = /(?:href|src)\s*=\s*"([^"]*)"/g

// 去掉 base 前缀并规整为 dist 相对路径；处理 /a/b、/a/b/、/a/b.html 三种形态
function resolveTarget(rawPath, fromPage) {
  const head = rawPath.split('#')[0].split('?')[0]
  if (head === '') return { page: null, fromSelf: true } // 纯 #frag，锚点落本页
  let p
  if (head.startsWith(`/${BASE}/`)) p = head.slice(BASE.length + 2) // 带 base 前缀
  else if (head.startsWith('/')) p = head.slice(1) // dist 根绝对路径
  else p = posix.normalize(posix.join(posix.dirname(fromPage), head)) // 相对当前页
  if (p.endsWith('/')) p += 'index'
  if (p.endsWith('.html')) p = p.slice(0, -5)
  if (p === '') p = 'index' // 站点根链接 /hello-react/ 归一为首页
  return { page: p, fromSelf: false }
}

function pageFilePath(p) {
  if (existsSync(join(DIST, p + '.html'))) return p + '.html'
  if (existsSync(join(DIST, p, 'index.html'))) return posix.join(p, 'index.html')
  return null
}

function pageExists(p) {
  // 资源文件（css/js/svg/woff2 等）直接按文件存在性判；页面再尝试 .html 与目录 index 两种形态
  const direct = join(DIST, p)
  if (existsSync(direct) && statSync(direct).isFile()) return true
  return pageFilePath(p) !== null
}

// 与上一轮人工审计同口径：取页面 id 属性 + 标题 slug（GitHub 风格）
function collectAnchors(html) {
  const found = new Set()
  for (const m of html.matchAll(/id="([^"]+)"/g)) found.add(m[1])
  for (const m of html.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/g)) {
    const text = m[2]
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/[`*_~]/g, '')
      .toLowerCase()
    let slug = ''
    for (const ch of text) {
      if (/[a-z0-9_一-鿿-]/.test(ch)) slug += ch
      else if (ch === ' ' || ch === '.') slug += ' '
    }
    slug = slug.trim().replace(/\s+/g, '-').replace(/-+/g, '-')
    if (slug) found.add(slug)
  }
  return found
}

const pages = walk(DIST)
const anchorsCache = new Map()
const dead = []
let checked = 0

for (const file of pages) {
  const rel = file.slice(DIST.length + 1).replace(/\\/g, '/')
  const pageDir = rel.replace(/\.html$/, '')
  const html = readFileSync(file, 'utf8')
  anchorsCache.set(pageDir, collectAnchors(html))

  for (const m of html.matchAll(REF_RE)) {
    const raw = m[1]
    if (!raw || /^(https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(raw)) continue
    checked += 1
    const { page, fromSelf } = resolveTarget(raw, pageDir)
    const targetPage = fromSelf ? pageDir : page
    if (!targetPage || !pageExists(targetPage)) {
      dead.push(`${rel} -> ${raw} (页面缺失)`)
      continue
    }
    const frag = raw.includes('#') ? raw.slice(raw.indexOf('#') + 1) : null
    if (frag) { // 空 # 不校验（常见占位锚点，目标页存在即放行）
      let anchors = anchorsCache.get(targetPage)
      if (!anchors) {
        const tPath = pageFilePath(targetPage)
        anchors = collectAnchors(readFileSync(join(DIST, tPath), 'utf8'))
        anchorsCache.set(targetPage, anchors)
      }
      if (!anchors.has(frag)) dead.push(`${rel} -> ${raw} (锚点缺失 #${frag})`)
    }
  }
}

if (dead.length) {
  console.error(`dead links: ${dead.length} (checked ${checked} internal refs)`)
  for (const d of dead) console.error('  ' + d)
  process.exit(1)
}
console.log(`dead links: 0 (checked ${checked} internal refs across ${pages.length} pages)`)
