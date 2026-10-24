### React's Development History and Core Principles

---

## 1. React's Development History

### 1.1 Early Background

In May 2013, Facebook publicly released React. React's development originated from Facebook's needs for front-end development: a more efficient way to build dynamic user interfaces. React was designed by Jordan Walke and his team, and after internal use, they decided to open-source it so other developers could benefit from the technology.

### 1.2 React's Release and Early Development

- **May 2013**: React was open-sourced and 0.3 was released, providing basic component features and a Virtual DOM.
- **March 2015**: React 0.13 was released, beginning to support defining components with ES6 `class`.
- **October 2015**: React 0.14 was released, introducing function components and splitting DOM-related code into `react-dom`.
- **September 2017**: React 16 was released, introducing the new Fiber architecture, enhancing performance and scalability.
- **March 2018**: React 16.3 was released, bringing new lifecycle methods (`getDerivedStateFromProps`, `getSnapshotBeforeUpdate`) and a new Context API.
- **February 2019**: React 16.8 was released, formally introducing Hooks (`useState`, `useEffect`, and more).
- **October 2020**: React 17 was released, focusing mainly on event system improvements and backward compatibility (a version with no new features).
- **March 2022**: React 18 was released, bringing new features such as Concurrent Rendering and Automatic Batching.
- **December 2024**: React 19 was released, bringing the `use` API, Actions, improved Context and resource loading, and more.

### 1.3 Development to the Present

React continues to develop rapidly, releasing new versions regularly and continuously introducing new features and improvements (the current latest mainline is React 19.x). The React community keeps growing, forming a vast ecosystem of tools, libraries, and best practices.

---

## 2. React's Core Principles

### 2.1 Components

One of React's core principles is components. Components are the basic units for building user interfaces, and each component is responsible for its own state and rendering logic. Components can be nested and composed to build complex user interfaces. The benefits of components include:

- **Reusability**: Components can be used in multiple places, reducing code duplication.
- **Maintainability**: Each component is responsible for its own part, making it easy to maintain and modify.
- **Testability**: Components can be tested independently, ensuring they function correctly.

### 2.2 Declarative Programming

React encourages declarative programming, meaning you describe what the UI should look like rather than how to update it. Declarative programming makes UI code more concise and predictable. React implements declarative programming through the Virtual DOM and an efficient update mechanism:

- **Virtual DOM**: React uses a Virtual DOM to improve performance, reducing direct manipulation of the real DOM.
- **Declarative updates**: Developers describe what the UI should look like, and React handles the actual updates and rendering.

### 2.3 One-Way Data Flow

React uses one-way data binding to pass data. Data flows from parent components to child components through Props, and child components cannot directly modify their parent's data. This one-way data flow makes data flow clearer and state management more controllable.

- **Props**: Used to pass data from parent components to child components.
- **State**: Internal state of a component, used to manage and update data.

### 2.4 Virtual DOM

The Virtual DOM is the core technique React uses to optimize UI updates. The Virtual DOM is a lightweight copy of the real DOM. React uses the Virtual DOM to compute differences between components and performs only the necessary updates in the actual DOM. The Virtual DOM's workflow includes:

- **Rendering**: When a component renders, a Virtual DOM tree is generated.
- **Comparison**: React compares the new Virtual DOM tree with the old one to compute the diff.
- **Update**: Based on the diff, update the real DOM, minimizing operations to improve performance.

### 2.5 Efficient Update Mechanism

React's update mechanism includes:

- **Reconciliation**: React's algorithm for determining which parts need updating and how to update them efficiently.
- **Fiber**: The Fiber architecture introduced in React 16, which improved the Reconciliation algorithm, supporting priority scheduling and concurrent mode, making UI updates more efficient and smooth.

### 2.6 Ecosystem

React has a vast ecosystem, including:

- **React Router**: For handling client-side routing.
- **Redux/MobX**: For state management.
- **React Native**: For mobile application development.
- **Next.js**: For server-side rendering and static generation.
- **Jest/Enzyme/React Testing Library**: For testing React components and applications.

## React 18 → 19 Version Comparison

This page uses React 18 as its narrative baseline. React 19 (December 2024) does not change the core principles above; changes are concentrated at the API layer:

| Topic | React 18 Status | React 19 Change | Notes |
| --- | --- | --- | --- |
| Components / Declarative / One-way data flow / Virtual DOM | Core principles | No change | Principles are stable across versions |
| Concurrency and scheduling | Introduced in React 18 | No change | See [Concurrent Mode](../architecture/concurrent-mode.md) |
| Data fetching and forms | Handwritten `useEffect` + `onSubmit` | **New** | `use`, Actions (`useActionState` / `useOptimistic`), see [React 19 New Features](../future/react-new-features.md) |
| Legacy APIs | Available or deprecated | **Removed** | String refs, legacy Context, `createFactory`, `ReactDOM.render`, and more |

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

---

## 3. Summary

React's core principles include components, declarative programming, one-way data flow, and the Virtual DOM. Through these principles, React provides an efficient, maintainable way to build user interfaces. React's continued development and maturity have made it the mainstream choice in modern front-end development, with a powerful ecosystem and community support.

## References

- [React Official Documentation (external link)](https://react.dev/learn)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
- [timeline](/timeline.md))
- [README](README.md)
