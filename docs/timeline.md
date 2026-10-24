---
title: History Timeline
layout: page
---

<script setup>
import { localeData } from './.vitepress/theme/data/timeline.en'
import DevTimeline from './.vitepress/theme/components/DevTimeline.vue'
</script>

# History Timeline

Every major React release is an answer to the pain points of the previous era: open-sourcing in 2013 answered the fragility of hand-syncing state in the MVC age; publishing Fiber in 2016 answered recursive diffs blowing the frame budget; Hooks in 2018 answered the nested-hell of reusing logic in class components; and React 17 in 2020 shipped no features at all, yet laid the groundwork for multiple versions to coexist. This line arranges {{ localeData.timeline.length }} nodes in chronological order, and each node first answers the same question: why this moment.

## How to Read This Line

**Periodize first, then filter.** The page slices sixteen years into four Eras: Germination and Open Source (2010 to 2015), Core Rewrite (2016 to 2019), Concurrency and the Server (2020 to 2024), and The Compiler Era (2025 to today). Each Era has a lead-in sentence naming the main contradiction of the time. The topic tags at the top — Core Versions, Concurrency and Rendering, Ecosystem and Tools, Toward the Future — split the same line into four threads, with the counts marked on the tags. Narrow to a single group and the trade-offs within that period read more clearly: select only "Concurrency and Rendering" and you can follow one nine-year arc from the Fiber announcement in 2016 all the way to Activity shipping in 2025.

**Click open to read the reasoning.** A collapsed node shows only the year, title and originator; the expanded details answer two things: what pain point it addressed, and which chapter on this site goes deeper on it. Most nodes link into a full chapter here — read the timeline first and then the chapter, or read the chapter and circle back to line it up against the timeline. Both paths work.

**When you need to read it straight through**, the "Read All Nodes by Era" section at the bottom of the page is a plain-text rendering of the same data — no interaction required, and handy for checking each chapter against it one by one.

## Notes on This Data's Conventions

Years here mark the moment something was announced or released, not the moment it became widely adopted: Hooks was previewed at React Conf in October 2018 and only stabilized in 16.8 in February 2019; Server Components debuted in December 2020, but scaled only with the Next.js App Router. So this line marks when a direction was publicly committed to — consensus usually takes another year or two to form. The technical details of each node are consistent with the chapters on this site (such as [Development History and Core Principles](/typescript-react/react-history-principles)), [React Fiber Architecture Explained](/architecture/react-fiber)), [The Future of React](/future/react-future))) — when they conflict, the chapters take precedence.

<DevTimeline :data="localeData" />

## References

- [React Repository](https://github.com/react/react)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [knowledge](knowledge.md)
