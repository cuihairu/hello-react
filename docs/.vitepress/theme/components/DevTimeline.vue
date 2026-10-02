<script setup lang="ts">
// React 发展史时间线：分期竖排年表（economics 理论时间线的精简版，无缩放画布）。
//   · 顶部分类 chips 带计数，筛选只看一条线
//   · 四个 Era 各带导语；点节点展开「为什么是这个时候」与站内章节
//   · 进场动画走 IntersectionObserver，prefers-reduced-motion 下整体旁路
// 页面底部 <details> 是同一份数据的文本形态，可整段通读。
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { withBase } from 'vitepress'
import { ERAS, FIELD_LABELS, TIMELINE, type TimelineEvent } from '../data/timeline'

type Field = TimelineEvent['field']
type Filter = 'all' | Field

const filter = ref<Filter>('all')
const selected = ref<number | null>(null)

const fields = Object.keys(FIELD_LABELS) as Field[]
const filterOptions: Filter[] = ['all', ...fields]

const countOf = (f: Filter) =>
  f === 'all' ? TIMELINE.length : TIMELINE.filter((e) => e.field === f).length

const filtered = computed(() =>
  TIMELINE.map((e, i) => ({ e, i })).filter(
    ({ e }) => filter.value === 'all' || e.field === filter.value,
  ),
)

const eraGroups = computed(() =>
  ERAS.map((era) => ({
    ...era,
    label: `${era.from} → ${era.to >= 2026 ? '今天' : era.to}`,
    count: TIMELINE.filter((e) => e.year >= era.from && e.year <= era.to).length,
    events: filtered.value.filter(({ e }) => e.year >= era.from && e.year <= era.to),
  })).filter((g) => g.events.length > 0),
)

const toggle = (i: number) => {
  selected.value = selected.value === i ? null : i
}

/* ---------- 进场动画：IO 揭示；reduced motion 下不武装、CSS 也整体旁路 ---------- */

const rootEl = ref<HTMLElement | null>(null)
const armed = ref(false)
const seen = ref(new Set<number>())
let io: IntersectionObserver | null = null
let mq: MediaQueryList | null = null

const reducedNow = () => mq?.matches ?? false

const syncReduced = () => {
  if (reducedNow()) {
    armed.value = false
    io?.disconnect()
  }
}

const observeItems = async () => {
  await nextTick()
  io?.disconnect()
  if (reducedNow()) return
  const root = rootEl.value
  if (!root) return
  io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue
        const k = Number((en.target as HTMLElement).dataset.index)
        const next = new Set(seen.value)
        next.add(k)
        seen.value = next
        io?.unobserve(en.target)
      }
    },
    { threshold: 0.06 },
  )
  root.querySelectorAll<HTMLElement>('.tl-item').forEach((el) => io!.observe(el))
}

onMounted(() => {
  mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener?.('change', syncReduced)
  if (!reducedNow()) {
    armed.value = true
    observeItems()
  }
})

watch(filter, () => {
  selected.value = null
  observeItems()
})

onBeforeUnmount(() => {
  io?.disconnect()
  mq?.removeEventListener?.('change', syncReduced)
})
</script>

<template>
  <div ref="rootEl" class="dev-tl">
    <div class="chips" role="group" aria-label="按主题筛选">
      <button
        v-for="f in filterOptions"
        :key="f"
        type="button"
        :class="['chip', { 'is-active': filter === f }]"
        :aria-pressed="filter === f"
        @click="filter = f"
      >
        {{ f === 'all' ? '全部' : FIELD_LABELS[f] }}
        <span class="count">{{ countOf(f) }}</span>
      </button>
    </div>

    <p class="hint">
      一共 {{ TIMELINE.length }} 个节点。点任意一行展开它「为什么是这个时候」；筛选标签只看一条线。
    </p>

    <section v-for="era in eraGroups" :key="era.name" class="era">
      <header class="era-head">
        <h2 class="era-name">{{ era.name }}</h2>
        <p class="era-meta">
          <span class="era-range">{{ era.label }}</span>
          <span class="sep">·</span>
          <span>{{ era.count }} 个节点</span>
        </p>
        <p class="era-intro">{{ era.intro }}</p>
      </header>

      <ol class="events">
        <li
          v-for="{ e, i } in era.events"
          :key="e.year + e.title"
          class="tl-item"
          :class="{ 'is-armed': armed && !seen.has(i) }"
          :data-index="i"
        >
          <button
            type="button"
            class="row"
            :class="{ 'is-open': selected === i }"
            :aria-expanded="selected === i"
            @click="toggle(i)"
          >
            <span class="node" aria-hidden="true" />
            <span class="year">{{ e.year }}</span>
            <span class="body">
              <span class="title">{{ e.title }}</span>
              <span v-if="e.who" class="who">{{ e.who }}</span>
            </span>
            <span class="tag">{{ FIELD_LABELS[e.field] }}</span>
          </button>
          <div v-show="selected === i" class="detail">
            <p class="why">{{ e.why }}</p>
            <a v-if="e.link" class="more" :href="withBase(e.link)">进入相关章节</a>
          </div>
        </li>
      </ol>
    </section>

    <details class="readall">
      <summary>按时期通读全部 {{ filtered.length }} 个节点</summary>
      <section v-for="era in eraGroups" :key="'r' + era.name" class="era">
        <header class="era-head">
          <h3 class="era-name">{{ era.name }}</h3>
          <p class="era-meta">
            <span class="era-range">{{ era.label }}</span>
            <span class="sep">·</span>
            <span>{{ era.count }} 个节点</span>
          </p>
        </header>
        <ol class="events plain">
          <li v-for="{ e } in era.events" :key="'r' + e.year + e.title" class="plain-item">
            <p class="plain-head">
              <span class="year">{{ e.year }}</span>
              <span class="title">{{ e.title }}</span>
              <span class="tag">{{ FIELD_LABELS[e.field] }}</span>
            </p>
            <p v-if="e.who" class="who">{{ e.who }}</p>
            <p class="why">{{ e.why }}</p>
            <a v-if="e.link" class="more" :href="withBase(e.link)">进入相关章节</a>
          </li>
        </ol>
      </section>
    </details>
  </div>
</template>

<style scoped>
/* 品牌色与形状沿用主题 token：单一 accent（teal），light/dark 由变量自动切换 */

.dev-tl {
  margin-top: 1rem;
}

.dev-tl p {
  text-indent: 0;
}

/* ---------- 筛选 chips ---------- */

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 0 0 0.9rem;
}

.chip {
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border-radius: var(--radius-pill);
  padding: 0.28rem 0.85rem;
  font-size: 0.85rem;
  line-height: 1.4;
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
}

.chip:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.chip.is-active {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  font-weight: 600;
}

.chip .count {
  font-family: var(--vp-font-mono);
  font-size: 0.78em;
  color: var(--vp-c-text-3);
  margin-left: 0.15rem;
}

.chip.is-active .count {
  color: var(--vp-c-brand-1);
}

.chip:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.hint {
  color: var(--vp-c-text-3);
  font-size: 0.88rem;
  margin: 0 0 1.6rem;
}

/* ---------- Era 分期 ---------- */

.era {
  margin-bottom: 2.4rem;
}

.era-head {
  border-left: 3px solid var(--vp-c-brand-1);
  padding: 0.15rem 0 0.15rem 1rem;
  margin-bottom: 1.1rem;
}

.era-name {
  margin: 0;
  padding: 0;
  border: none;
  font-family: var(--vp-font-display);
  font-size: 1.22rem;
  letter-spacing: -0.01em;
}

.era-meta {
  margin: 0.3rem 0 0;
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
}

.era-range {
  font-family: var(--vp-font-mono);
  color: var(--vp-c-brand-1);
}

.sep {
  margin: 0 0.45rem;
}

.era-intro {
  margin: 0.5rem 0 0;
  font-size: 0.92rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

/* ---------- 事件行 ---------- */

.events {
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
}

/* 主轴线 */
.events::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 6px;
  bottom: 6px;
  width: 1px;
  background: var(--teal-hairline);
}

.tl-item {
  position: relative;
  transition: opacity 0.4s ease, transform 0.4s ease;
}

/* IO 揭示：armed 且未进入视口时收起；reduced motion 由下方 media 块整体旁路 */
.tl-item.is-armed {
  opacity: 0;
  transform: translateY(10px);
}

.row {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  padding: 0.55rem 0.6rem 0.55rem 1.35rem;
  cursor: pointer;
  border-radius: var(--radius-card);
  transition: background-color 0.2s ease;
}

.row:hover {
  background: var(--teal-soft);
}

.row:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}

/* 节点圆点骑在主轴线上 */
.node {
  position: absolute;
  left: 1px;
  top: 1.05rem;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-bg);
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.row:hover .node,
.row.is-open .node {
  transform: scale(1.25);
}

.year {
  font-family: var(--vp-font-mono);
  font-size: 0.86rem;
  color: var(--vp-c-brand-1);
  min-width: 3.2em;
  flex-shrink: 0;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
}

.title {
  font-family: var(--vp-font-display);
  font-size: 0.98rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  letter-spacing: -0.01em;
}

.row.is-open .title {
  color: var(--vp-c-brand-1);
}

.who {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  margin: 0;
}

.tag {
  margin-left: auto;
  flex-shrink: 0;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  border: 1px solid var(--vp-c-border);
  border-radius: var(--radius-pill);
  padding: 0.08rem 0.55rem;
  white-space: nowrap;
}

/* ---------- 展开详情 ---------- */

.detail {
  padding: 0.15rem 1rem 0.9rem 4.6rem;
}

.why {
  margin: 0 0 0.5rem;
  font-size: 0.92rem;
  line-height: 1.75;
  color: var(--vp-c-text-2);
  background: var(--teal-soft);
  border-left: 3px solid var(--vp-c-brand-1);
  border-radius: 0 var(--radius-card) var(--radius-card) 0;
  padding: 0.7rem 0.95rem;
}

.more {
  font-size: 0.85rem;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  text-underline-offset: 3px;
}

.more:hover {
  text-decoration: underline;
}

/* ---------- 底部通读（文本形态） ---------- */

.readall {
  margin-top: 2rem;
  border: 1px solid var(--vp-c-border);
  border-radius: var(--radius-card);
  background: var(--vp-c-bg-soft);
  box-shadow: 0 2px 10px var(--brand-shadow);
}

.readall summary {
  cursor: pointer;
  padding: 0.85rem 1.1rem;
  font-family: var(--vp-font-display);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  border-radius: var(--radius-card);
  transition: background-color 0.2s ease;
}

.readall summary:hover {
  background: var(--teal-soft);
}

.readall .era {
  padding: 0 1.1rem;
}

.readall .era-head {
  margin-bottom: 0.8rem;
}

.readall .era-name {
  font-size: 1.05rem;
}

.readall .events.plain {
  padding-bottom: 1rem;
}

.readall .events.plain::before {
  display: none;
}

.plain-item {
  padding: 0.55rem 0 0.7rem 1.35rem;
  position: relative;
}

.plain-item::before {
  content: '';
  position: absolute;
  left: 1px;
  top: 0.95rem;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-bg-soft);
}

.plain-head {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  margin: 0;
}

.plain-head .title {
  font-size: 0.94rem;
}

.plain-item .who {
  margin: 0.15rem 0 0;
}

.plain-item .why {
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
  margin: 0.35rem 0 0.3rem;
}

.plain-item .more {
  font-size: 0.82rem;
}

/* ---------- 动效红线：系统声明减少动态时全部旁路 ---------- */

@media (prefers-reduced-motion: reduce) {
  .tl-item,
  .tl-item.is-armed {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .chip,
  .row,
  .node,
  .readall summary {
    transition: none;
  }
}

/* ---------- 窄屏：年份上移成独立行，标签藏进 who 行 ---------- */

@media (max-width: 640px) {
  .row {
    flex-wrap: wrap;
    padding-left: 1.2rem;
  }

  .node {
    left: 0;
  }

  .year {
    min-width: 0;
  }

  .body {
    flex-basis: 100%;
  }

  .tag {
    margin-left: 0;
  }

  .detail {
    padding-left: 1.2rem;
  }
}
</style>
