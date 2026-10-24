### The Mounting and Update Flow of Components

In React, component mounting and updating are two key lifecycle phases. Each phase has a set of lifecycle methods that are invoked in different component states. Below is the detailed mounting and update flow along with the order in which the lifecycle methods are called.

#### 1. Component Mounting

Component mounting is the process of a component being created and rendered onto the page. This phase includes the following steps:

1. **Component Initialization**
   - **`constructor(props)`**: Called when the component is created, used to initialize state and bind event handlers. It is the first stage of the mounting process.

2. **Dispatching the `render` Method**
   - **`static getDerivedStateFromProps(props, state)`**: Called before the `render` method, used to update state based on props. It is a static method and does not access the component instance.
   - **`render()`**: The core method, returning the component's virtual DOM. React creates the real DOM based on this virtual DOM.

3. **Component Mounting Complete**
   - **`componentDidMount()`**: Called after the component has finished mounting. You can perform side effects here, such as data fetching, event listeners, or subscriptions.

**Mounting Flow Summary**:
   1. `constructor`
   2. `static getDerivedStateFromProps`
   3. `render`
   4. `componentDidMount`

#### 2. Component Updating

Component updating is the process of a component re-rendering when its props or state change. This phase includes the following steps:

1. **Update Triggered**
   - The update process begins when a component's props or state change.

2. **Pre-Update Processing**
   - **`static getDerivedStateFromProps(props, state)`**: Called before the `render` method, used to update state based on the new props.
   - **`shouldComponentUpdate(nextProps, nextState)`**: Called before the component updates, used to determine whether a re-render is needed. If it returns `false`, the update is skipped.
   - **`render()`**: Returns the updated virtual DOM. React updates the real DOM based on this virtual DOM.

3. **Getting the Snapshot**
   - **`getSnapshotBeforeUpdate(prevProps, prevState)`**: Captures a snapshot before the update, used in `componentDidUpdate`. The returned value is passed as the third argument to `componentDidUpdate`.

4. **Post-Update Processing**
   - **`componentDidUpdate(prevProps, prevState, snapshot)`**: Called after the component has finished updating. You can perform side effects here, such as updating the DOM or sending requests.

**Update Flow Summary**:
   1. `static getDerivedStateFromProps`
   2. `shouldComponentUpdate`
   3. `render`
   4. `getSnapshotBeforeUpdate`
   5. `componentDidUpdate`

#### 3. Component Unmounting

Component unmounting is the process of a component being removed from the DOM. This phase includes the following steps:

1. **Component Unmounting**
   - **`componentWillUnmount()`**: Called before the component is removed from the DOM, used to clean up resources such as timers, event listeners, or subscriptions.

**Unmounting Flow Summary**:
   1. `componentWillUnmount`

#### 4. Error Handling

When a component or its child components encounter JavaScript errors, React's error boundary mechanism can catch and handle them. Below are the lifecycle methods for the error handling phase:

1. **Error Capture**
   - **`static getDerivedStateFromError(error)`**: Called when a child component throws an error, used to update the error state.
   - **`componentDidCatch(error, info)`**: Catches the error and logs it or displays error information.

**Error Handling Flow Summary**:
   1. `static getDerivedStateFromError`
   2. `componentDidCatch`

#### Summary

Understanding the mounting and update flow of components along with the call order of their lifecycle methods is the foundation for writing efficient, maintainable React components. By using these methods correctly, you can effectively manage component state, optimize performance, and handle various side effects and error scenarios.

## References

- [The React Repository](https://github.com/react/react)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [react-internals](react-internals.md)
- [glossary](/glossary.md))
