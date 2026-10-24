### Portals & Profiler API

#### Portals

React Portals provide a way to render children into a different part of the DOM tree. Normally children render inside the DOM node of their parent component, but Portals let you render children somewhere else in the DOM tree — very useful for certain UI patterns such as modals, dialogs, and floating layers.

##### Creating and Using Portals

1. **Creating a Portal**

   To create a Portal, use the `ReactDOM.createPortal` function. It takes two arguments:
   - **children**: the children to render.
   - **container**: the DOM node the children will be rendered into.

   ```jsx
   import React from 'react';
   import ReactDOM from 'react-dom';

   const MyPortal = ({ children }) => {
     const portalRoot = document.getElementById('portal-root');
     return ReactDOM.createPortal(children, portalRoot);
   };

   const App = () => {
     return (
       <div>
         <h1>App Component</h1>
         <MyPortal>
           <div>Rendered in Portal</div>
         </MyPortal>
       </div>
     );
   };

   export default App;
   ```

   In the example above, the `MyPortal` component renders its children into the `portal-root` DOM node. You need to provide a DOM node with the matching ID in your HTML file, like:

   ```html
   <div id="portal-root"></div>
   ```

2. **Use cases for Portals**

   - **Modals**: render the modal to the document's root node so it is not affected by its parent's CSS.
   - **Tooltips**: render tooltips elsewhere on the page so they always stay above the viewport.
   - **Dialogs**: when adding dialogs to an app, rendering them to the root node avoids styling issues.

##### Caveats

- **Event handling**: events in a Portal bubble up the **React component tree** (not the DOM tree). That is, the event is caught first by the parent component in the React tree, even if the Portal is rendered elsewhere in the DOM.
- **CSS styling**: CSS inheritance and cascade follow the **DOM position** — a Portal's content inherits styles from the ancestors at its real rendered location (such as `body`), not from the parent component in the React tree. React Context, by contrast, flows down the React tree and is independent of the DOM position.

#### Profiler API

The Profiler API is used to analyze the performance of a React app. React Profiler lets developers collect and inspect component render times so they can optimize performance.

##### Using the Profiler Component

1. **The Profiler component**

   The `Profiler` component wraps the part you want to profile. It takes two main props:
   - **id**: a string that uniquely identifies the Profiler instance.
   - **onRender**: a callback invoked when the component renders.

   ```jsx
   import React, { Profiler } from 'react';

   const onRenderCallback = (
     id,
     phase,
     actualDuration,
     baseDuration,
     startTime,
     commitTime,
     interactions
   ) => {
     console.log(`Profiler data for ${id}:`);
     console.log(`Phase: ${phase}`);
     console.log(`Actual Duration: ${actualDuration}`);
     console.log(`Base Duration: ${baseDuration}`);
     console.log(`Start Time: ${startTime}`);
     console.log(`Commit Time: ${commitTime}`);
   };

   const MyComponent = () => {
     return (
       <Profiler id="MyComponent" onRender={onRenderCallback}>
         <div>My Profiler Component</div>
       </Profiler>
     );
   };

   export default MyComponent;
   ```

   In this example, `onRenderCallback` is invoked every time the component renders, providing detailed information about the render.

2. **Use cases for the Profiler**

   - **Performance tuning**: use the Profiler component during development to detect performance bottlenecks and identify components that take too long to render.
   - **Monitoring the app**: use the Profiler in production to keep app performance stable.

##### Profiler Data

- **id**: the component's unique identifier.
- **phase**: the render phase ("mount" or "update").
- **actualDuration**: the actual render time.
- **baseDuration**: the render time excluding renders in a "hidden" state.
- **startTime**: when the render started.
- **commitTime**: when the render was committed.
- **interactions**: interaction information related to the component.

##### Caveats

- **Overhead**: the Profiler component has a performance cost in development mode, so it should only be used during development.
- **Analyzing the data**: when analyzing the data the Profiler provides, make optimization decisions in the context of the app's overall performance.

### React 18 → 19 Version Comparison

The body of this page is based on React 18. The table below maps the Portals and Profiler APIs to React 19:

| API | React 18 Status | React 19 Change | Notes |
| --- | --- | --- | --- |
| `ReactDOM.createPortal` | Stable | No change | — |
| `Profiler` component | Stable since 16.5 | No change | The `onRender` callback parameters are unchanged |

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

### Summary

- **Portals**: allow children to be rendered elsewhere in the DOM tree — ideal for modals, dialogs, and similar scenarios.
- **Profiler**: used to collect and analyze component render performance data to optimize the app. Get detailed render times and performance information through the `Profiler` component and its `onRender` callback.

These two APIs are powerful tools for managing and optimizing render performance and DOM operations in a React app.

## References

- [React Official Docs · Profiler](https://react.dev/reference/react/Profiler)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [glossary](glossary.md))
- [knowledge](knowledge.md))