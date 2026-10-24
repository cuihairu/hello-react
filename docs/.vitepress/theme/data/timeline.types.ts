// React 发展史时间线：共享类型定义。
// 数据分语言存放于 timeline.zh.ts / timeline.en.ts，页面把对应语言的
// localeData 通过 <DevTimeline :data="..." /> 传入，组件本身不感知语言。

export interface TimelineEvent {
  year: number
  title: string
  who: string
  field: 'core' | 'concurrent' | 'ecosystem' | 'future'
  why: string
  /** 站内章节路径，语言相对（不带 /zh 前缀），组件按当前 locale 补前缀 */
  link?: string
}

export type TimelineField = TimelineEvent['field']

export interface TimelineEra {
  name: string
  from: number
  to: number
  intro: string
}

/** 组件模板里的少量 UI 文案，随数据一起按语言提供 */
export interface TimelineUI {
  filterAria: string
  all: string
  today: string
  hint: (total: number) => string
  nodes: (count: number) => string
  more: string
  readAll: (count: number) => string
}

export interface TimelineLocaleData {
  fieldLabels: Record<TimelineField, string>
  eras: TimelineEra[]
  timeline: TimelineEvent[]
  ui: TimelineUI
}
