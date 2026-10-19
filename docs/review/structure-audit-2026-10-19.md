# hello-react 文档结构审计（2026-10-19）

范围：只读核查仓库文档、VitePress 导航与可用链接审计结果；本次仅新增本报告，不调整任何既有文档或配置。统计口径为 `docs/` 下 Markdown（含 `SUMMARY.md`，但目录表只列一级主题目录）；行数按当前文件物理行计算。仓库另有 `src/` 文档树，作为重复维护风险记录。

## 量化事实

### `docs/` 一级主题目录

| 目录 | Markdown 文件数 | 总行数 |
|---|---:|---:|
| api | 16 | 3,133 |
| architecture | 16 | 2,152 |
| basics | 28 | 4,670 |
| build-tools | 14 | 2,326 |
| ecosystem | 18 | 2,799 |
| future | 6 | 1,296 |
| projects | 11 | 1,842 |
| source-code | 14 | 1,252 |
| typescript-react | 27 | 5,214 |
| **主题目录合计** | **150** | **24,684** |

另有 `docs/` 根目录 Markdown 5 个：`index.md`（37 行）、`glossary.md`（400）、`knowledge.md`（278）、`timeline.md`（36）、`SUMMARY.md`（156）。因此全 `docs/` 共 155 个 Markdown、25,591 行；不含 `SUMMARY.md` 页面内容为 154 个 Markdown、25,435 行。依据：各目录文件清单与行数；`docs/SUMMARY.md` 被 `docs/.vitepress/config.mts:13-14` 明确排除构建。

### 当前组织轴

按“读者如何找到内容”的方式计为 **5 套并行组织轴**；前四套是主要导航方式，第五套是附录收纳方式。

| 组织轴 | 条目数 | 命名/组织规律 | 有无编号 | 编号连续性 |
|---|---:|---|---|---|
| 主题目录 | 9 个一级目录、150 个 Markdown | `basics`、`typescript-react`、`architecture` 等按知识领域分目录，文件名多为英文小写 kebab-case | 文件路径无数字前缀 | 不适用 |
| 章节/课程序列 | 8 个部分、23 个章节；侧栏 153 个链接总项（含根级导航与附录） | `docs/.vitepress/sidebar.json` 用“第N部分/第N章”组织，链接落到主题目录文件 | 有，编号在侧栏标签/章节标题，不在文件名 | 章节 1–23 连续，无重复、跳号；部分章节名/链接文件在 README 与正文首行复现 |
| API 参考 | `api/` 16 篇 | React API 概念拆分为独立参考页，聚合页为 `README.md` | 目录内无编号 | 不适用 |
| 源码/实现专题 | `source-code/` 14 篇 | 按内部机制拆页，聚合页为 `README.md` | 目录内无编号 | 不适用 |
| 指南、时间线与未入章专题 | 根级 4 个页面（不含 SUMMARY）；`future/` 6 篇 | `index`、`knowledge`、`glossary`、`timeline` 提供入口/横切材料；`future` 由侧栏“附录·未入目录”收纳 | 无章编号 | 不适用；附录 5 篇内容页集中于一个目录 |

**计数说明：**153 是 `sidebar.json` 中 `link` 的总数且无重复；其中根级侧栏链接、章节页、普通内容页和未来专题都包含在内。23 章的标签位于 `docs/.vitepress/sidebar.json:16-658`，序号连续。

## 问题清单与证据

### 1. 组织复杂度与内容归属交叉（严重度：中）

- 证据：九个主题目录承载实体文件，但 23 章序列又跨目录编排，见 `docs/.vitepress/sidebar.json:16-658`；例如第 13–15 章在 `source-code/`，第 20–21 章在 `api/`。
- 判断：它是“内容按主题存放、阅读按课程推进”的双重索引，不等于文件结构本身失序；目录轴和章节轴总体可互相解释。新读者若只看目录会看不到课程顺序，维护者若只按章节重排可能破坏稳定 URL。问题中等，核心在导航模型需要明确说明。

### 2. 同一主题横跨多个主题目录（严重度：中）

- Hooks/状态：`docs/architecture/hooks-deep-dive.md`、`docs/architecture/use-state.md`、`docs/source-code/hooks-source.md`、`docs/source-code/use-state-effect.md`、`docs/api/hooks-api.md`、`docs/ecosystem/context-reducer.md`。
- React Router/生态：`docs/ecosystem/react-router.md`、`docs/ecosystem/react-router-setup.md`、`docs/projects/react-ecosystem.md`。
- SSR/Next.js：`docs/ecosystem/ssr.md`、`docs/ecosystem/nextjs.md`、`docs/projects/nextjs-overview.md`。
- 测试：`docs/ecosystem/testing.md`、`docs/ecosystem/testing-tools.md`、`docs/projects/testing-tools.md`。
- 判定：这些路径存在合理的“概念/实现/API/项目”视角差异，但目录页或交叉链接需要明确边界，才能避免同一内容重复扩写。暂未逐篇比对内容重复度，是否实质重复未核实。

### 3. 两套实体文档树并存（严重度：高）

- 证据：`docs/` 与仓库 `src/` 都有 `basics`、`api`、`architecture`、`build-tools`、`ecosystem`、`projects`、`typescript-react` 等同名领域；例如同时存在 `docs/api/hooks-api.md` 与 `src/api/hooks-api.md`、`docs/build-tools/vite.md` 与 `src/build-tools/vite.md`。`package.json` 的 docs 脚本明确以 `docs` 为 VitePress 源目录；`docs/.vitepress/config.mts:12-14` 说明 `SUMMARY.md` 是 mdbook 遗留映射底稿。
- 判断：主站以 `docs/` 构建、`src/` 似乎保留旧书源，两个位置都可被误认为编辑入口。内容是否完全同步未逐文件核对，未核实；但维护入口歧义和漂移风险明确。应先确认 `src/` 的保留用途，未获决定前不删除或搬迁。

### 4. 命名样式有少量例外（严重度：低）

- 证据：目录/文件主体多为小写连字符，如 `docs/build-tools/build-tools-overview.md`、`docs/typescript-react/react-history-principles.md`；同目录也有 `docs/typescript-react/setstate.md`（无分隔符）、`docs/api/reactdom-api.md`（ReactDOM 合并写）、`docs/api/README.md`（大写 README），并存 `docs/SUMMARY.md`（大写）和 `docs/index.md`（小写）。文件名均以英文为主，页面正文/侧栏为中文，例如 `docs/.vitepress/sidebar.json:16-22`。
- 判定：这是可识别的低风险历史命名差异；大小写 README/SUMMARY 有工具约定，不应为统一外观随意改名。小写 slug 对 URL 稳定性更重要，机械改名收益有限。

### 5. 侧边栏对账（严重度：低）

- 配置但文件不存在：**0 条**。逐一核对 `docs/.vitepress/sidebar.json` 的 153 个唯一链接，均能映射到 Markdown 文件。
- 文件存在但未进侧栏：**1 条**：`docs/index.md`（VitePress 首页由 `docs/.vitepress/config.mts:20-22` 的 nav `/` 入口提供）。这是设计性首页入口，不应视为漏配。
- `docs/SUMMARY.md` 被 `srcExclude` 排除是显式行为（`docs/.vitepress/config.mts:13-14`），不计作漏侧栏页面；根级 `knowledge.md`、`timeline.md`、`glossary.md` 均在侧栏。

### 6. 编号断档、跳号、重复（严重度：低/无现行缺陷）

- 抽取文件名数字前缀：**0 个**，因此文件名级没有可列出的跳号或重复。
- 抽取侧栏章节标签“第N章”：排序为 **1–23**，缺号 `无`、重复 `无`、跳号 `无`；证据 `docs/.vitepress/sidebar.json:16-658`，其中首章在第 16 行、第 23 章在第 632 行。
- 判断：编号放在导航而非文件名，是合理选择，文件路径保持稳定。需要注意目前 `build-tools.md`、`taro.md` 等正文首页复述章节名（见 `docs/build-tools/build-tools.md:1`、`docs/build-tools/taro.md:1`），属于重复展示而非编号冲突。

### 7. 死链与构建可验证性（严重度：中）

- 运行 `npm run audit:links`：现存 `docs/.vitepress/dist` 产物报告 `dead links: 0`，检查 29,842 个站内引用、155 个页面。
- 尝试 `npm run docs:build`：未能启动，报错 `sh: 1: vitepress: not found`。故上述审计只证明当前磁盘上的既有构建产物没有被脚本发现死链，不证明本次源码可成功构建；源码对应死链状态标记为**未核实**。
- 证据：`package.json` 的 `docs:build`、`audit:links` 脚本；`scripts/audit-links.mjs`；运行结果如上。未做外链可达性检查，外链状态未核实。

### 8. 根目录与非页面文件（严重度：低）

- 根目录 Markdown：`README.md` 与 `README.zh.md` 两份语言版本；不是重复 README，是否有语言切换入口未核实。另有 `book.toml`、`package.json`、`package-lock.json`、`LICENSE`、`.gitignore`，均属于项目/构建元数据，不是文档杂物。
- `docs/` 根级内容文件 `index.md`、`glossary.md`、`knowledge.md`、`timeline.md` 各承担首页、术语表、知识总纲、历史时间线不同职责；`SUMMARY.md` 明确作为映射底稿保留（`docs/.vitepress/config.mts:13-14`）。因此目前没有发现明显临时文件或重复 README；根级入口的职责略多但有导航入口支撑。
- 根目录其他临时文件：未发现（按根目录文件名清单）；未跟踪/忽略文件的临时性未核查。

## 判断与推荐

> **审计时的原始建议（执行时已按用户口径修订）：** 下列“课程阅读轴”是报告初稿中的建议，本次不采纳；站点定位以个人学习笔记、心得与经验分享为准。

建议把 **5 套并行入口/索引轴收敛为 3 套**，实体文件仍按主题组织：

1. **主题内容目录作为唯一存储轴**：保持现有九个主题目录与 URL，不按章节移动文件。
2. **主题浏览作为导航轴**：保留主题目录、稳定 URL 与跨角度互链；不按课程顺序或学习阶段组织。
3. **参考与辅助入口作为同一类入口**：API、源码专题分别保留为主题分类；时间线、总纲、术语表及未来专题作为“参考/附录”入口，不再成为额外的平行章节系统。

推荐上述方案，因为它保住了已有主题 URL 与顺序学习体验，同时让“存放位置”和“阅读路径”职责清晰。**不建议把 23 章强行转成 23 个编号目录**：这会制造大量移动和链接风险，也不解决概念/API/源码的多视角需求。

### 其实不乱、不用动

- 九个一级目录总体职责清楚，基础、TypeScript、架构、构建、生态、项目、API、源码、未来专题可以辨识（计数见上表）。
- 侧栏章节 1–23 连续，无断档、重复；所有 153 个配置链接均存在。
- `docs/index.md` 未列进侧栏有首页路由解释；`SUMMARY.md` 被明确排除且作为旧书目录底稿保留有配置说明。
- `api/` 与 `source-code/` 分开，是“公开 API 查阅”与“内部机制理解”的合理区分；不应仅因主题交叉而合并。
- `README.md`/`README.zh.md` 是语言区分，不是重复文件；README、SUMMARY 的大小写也有约定用途。
- 当前已有构建产物的站内链接审计通过；不要仅凭“太乱”推断存在大量死链。

## 三期收口方案

| 阶段 | 动作清单 | 影响范围 | 风险（链接/搜索/外链） | 用户拍板 |
|---|---|---|---|---|
| 一期：机械整理（目标 1 小时内） | 在各目录 README/索引中明确“本目录收什么、与相邻专题边界、推荐阅读顺序”；补充 `docs/` 与 `src/` 哪个是主编辑源的说明（仅在确认事实后）；统一新文件命名约定为小写 kebab-case，旧文件名不改；记录本次侧栏对账基线 | 索引页和贡献说明；不移动现有页面、不改 slug | 极低；不改变页面路径，不打断既有链接、搜索或外链 | **必须拍板**：`src/` 的保留用途与主编辑源；目录边界/阅读顺序若涉及内容归属需确认 |
| 二期：侧栏与重定向 | 在 VitePress 侧栏明确分组“课程顺读 / 按主题查找 / 参考附录”；如确需改名或搬迁，添加旧 URL 重定向并逐条验证；确定语言版 README 互链 | `docs/.vitepress/sidebar.json`、`config.mts`、重定向配置及相关索引 | 中；改导航不改 URL 风险低；改路径会影响搜索索引、书签和外链，须保留重定向并提交站点地图/搜索重建 | **必须拍板**：课程导航和主题导航是否并列、附录位置；任何 slug 变更与旧 URL 保留期限 |
| 三期：章节深度重构 | 在逐篇内容比对后决定是否拆分/合并 Hooks、SSR、测试、React 生态等重复主题；必要时合并章节、去重正文、重写交叉引用和目录映射 | 正文、主题目录、侧栏、`SUMMARY.md` 与历史 URL | 高；可能影响搜索排名、书签、外链和目录结构，需重定向、链接审计与发布后监测 | **必须拍板**：是否删并章节、权威内容归属、旧页面保留/重定向策略、是否接受 URL 变化 |

## 结论：最该先做的三件事

1. **先确认 `src/` 与 `docs/` 的关系及唯一编辑源**，这是最高风险的结构问题（`docs/api/hooks-api.md` 与 `src/api/hooks-api.md` 是可核查的同名例子）。
2. **在现有目录 README 中写清主题边界与阅读顺序**，先减少“同主题散落”的认知成本，不动路径。
3. **恢复可重复的本地构建/链接核验环境**，使 `npm run docs:build` 能运行；当前仅有旧 dist 审计通过，源码死链未核实。

## 收口执行记录（2026-10-19）

本次按“个人学习笔记、心得与开发经验分享”的口径处理导航与内容。侧栏仍按主题浏览，未新增课程顺序、学习阶段或讲次骨架；原有路径保持不变。

### A：导航权威源

- 权威源为 `docs/.vitepress/sidebar.json`：`docs/.vitepress/config.mts` 将其导入并作为 `themeConfig.sidebar`（配置行 2、25–27）。
- `docs/SUMMARY.md` 原为重复目录副本（原始行 1–156），已改为维护说明，明确 sidebar 是唯一编辑入口、SUMMARY 不参与构建；见 `docs/SUMMARY.md:1–5`。
- 侧栏 153 个链接项均唯一（自检：153 项、153 个唯一值、0 个同侧栏重复）。分类标签移除“第 N 部分/第 N 章”，保留原链接；见 `docs/.vitepress/sidebar.json:1–8` 及各主题分组。

### B：跨轴重复分组与证据

| 分类 | 页面与改动 | 两处文本对比证据 |
|---|---|---|
| 真重复，收敛 1 组 | SSR 定义、CSR/SSR 对比及优缺点以 `docs/ecosystem/what-is-ssr.md` 为权威；`docs/ecosystem/ssr.md` 改为摘要并链接权威页，保留 React SSR API 与实现笔记。 | 修改前 `what-is-ssr.md:1–29` 概述 SSR 生成 HTML、CSR 对比、首屏/SEO/社交预览及服务端负载/复杂度/交互缺点；`ssr.md:1–25` 逐项重述相同定义、优点和缺点。修改后 `ssr.md:3–5` 只保留要点摘要并链接 `what-is-ssr.md`，API 内容从 `ssr.md:7` 起保留。 |
| 不同角度，保留 3 组 | Hooks 概念/实践、测试工具/测试方法、Next.js 框架概览/使用笔记均保留并在对应索引中互链。 | Hooks：`architecture/hooks-deep-dive.md` 关注设计与实践，`source-code/hooks-source.md` 关注 Dispatcher/源码分发；`api/hooks-api.md` 是公开 API 查询，结论和用途不同。测试：`ecosystem/testing-tools.md` 着重工具比较，`projects/testing-tools.md` 着重项目安装/配置示例，`ecosystem/testing.md` 讨论测试类型与策略。Next.js：`ecosystem/nextjs.md` 记录创建、路由与数据获取细节，`projects/nextjs-overview.md` 放在项目生态语境概览；保留并由两侧索引交叉发现，不硬并。 |

以上保留组不是对同一事实复制后择一删减；不同页面承担概念、API、源码、工具选择或项目应用角度。URL 与文件均保留。

### C：口径与入口校准

- `README.md:20–42`、`README.zh.md:20–42` 已改为真实目录：列出 `docs/` 当前目录、将 `docs/` 说明为 VitePress 编辑源、将 `src/` 和 `book.toml` 标为 mdBook 遗留文件，并将可构建 Markdown 数修正为 154（不含被排除的 SUMMARY）。
- `docs/.vitepress/sidebar.json` 分类标签已不再使用讲次编号；未发现死条目，153 个链接均映射至现存 Markdown。
- `docs/index.md` 继续作为 `/` 首页入口，不需加入侧栏；`docs/knowledge.md`、`timeline.md` 与 `glossary.md` 已在侧栏根级入口。
