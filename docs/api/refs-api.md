### Refs & DOM Interaction APIs

In React, refs are used to directly access and manipulate DOM elements or React component instances. They are commonly used for integrating with third-party libraries, managing focus, triggering animations, and similar operations. React provides several ways to create and use refs.

#### 1. **Creating a Ref**

Refs can be created with `React.createRef` or `useRef`.

- **`React.createRef` in class components**

  In a class component, use `React.createRef` to create a ref object and attach it to an element in the component.

  ```jsx
  import React, { Component } from 'react';

  class MyComponent extends Component {
    constructor(props) {
      super(props);
      this.myRef = React.createRef();
    }

    componentDidMount() {
      // Access the DOM element
      this.myRef.current.focus();
    }

    render() {
      return <input ref={this.myRef} />;
    }
  }
  ```

- **`useRef` in function components**

  In a function component, use the `useRef` hook to create a ref object.

  ```jsx
  import React, { useRef, useEffect } from 'react';

  const MyComponent = () => {
    const myRef = useRef(null);

    useEffect(() => {
      // Access the DOM element
      myRef.current.focus();
    }, []);

    return <input ref={myRef} />;
  };
  ```

#### 2. **Attaching a Ref to a DOM Element**

Attach the created ref to a DOM element's `ref` attribute so the element can be accessed inside the component.

```jsx
const MyComponent = () => {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
};
```

#### 3. **Accessing a DOM Element**

Access the DOM element through `ref.current`. `ref.current` is a reference to the DOM element, which you can use to call DOM methods or read the element's properties.

```jsx
const MyComponent = () => {
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.style.backgroundColor = 'lightblue';
    }
  }, []);

  return <div ref={divRef}>Hello World</div>;
};
```

#### 4. **Interacting with Class Component Instances**

Refs can also access a class component's instance methods. A ref created on a class component gives you access to that component's public methods.

```jsx
class MyClassComponent extends Component {
  myMethod() {
    console.log('Method in class component');
  }

  render() {
    return <div>Class Component</div>;
  }
}

const App = () => {
  const componentRef = useRef(null);

  const callMethod = () => {
    if (componentRef.current) {
      componentRef.current.myMethod();
    }
  };

  return (
    <div>
      <MyClassComponent ref={componentRef} />
      <button onClick={callMethod}>Call Method</button>
    </div>
  );
};
```

#### 5. **Ref and Forward Refs**

In some cases you may need to forward a ref to a child component. `React.forwardRef` makes that possible.

```jsx
const MyInput = React.forwardRef((props, ref) => (
  <input ref={ref} {...props} />
));

const ParentComponent = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <MyInput ref={inputRef} />;
};
```

#### 6. **Best Practices for Using Refs**

- **Avoid overuse**: refs are mainly for managing focus, triggering animations, and integrating with non-React code. Avoid manipulating the DOM directly with refs, to keep components predictable and consistent.
- **Combine with function components**: use `useRef` in function components to access DOM elements or manage state.
- **Forward Refs**: use `React.forwardRef` to forward refs in function components.
- **Integrate with animation libraries**: pair refs with third-party animation libraries such as GSAP.

### React 18 → 19 Version Comparison

The body of this page is based on React 18. The ref system got a significant update in React 19 (ref became a regular prop, and cleanup functions were added); the table below is for upgrade reference:

| API / Pattern | React 18 Status | React 19 Change | Notes |
| --- | --- | --- | --- |
| `React.createRef` | Stable since 16.3 | No change | — |
| `useRef` | Stable since 16.8 | No change | Tighter TypeScript types: the initial value argument is now required |
| Callback ref | Stable | **Updated** | May return a cleanup function, called on unmount; a `null` callback no longer substitutes for cleanup |
| `React.forwardRef` | Stable since 16.3 | Still usable, no longer needed in most cases | A function component's `ref` becomes a regular prop and can be received directly; official deprecation is planned for a future version |
| Accessing `element.ref` | Available | **Deprecated** | Use `element.props.ref` |

TypeScript note: a callback ref with an implicitly returned value is rejected by the type system; assignments need a block-style function body.

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

### Summary

- **Creating a ref**: use `React.createRef` (class components) or `useRef` (function components).
- **Attaching a ref**: attach it to a DOM element or a component.
- **Accessing a DOM element**: access and manipulate the DOM element via `ref.current`.
- **Class component instances**: access a class component's instance methods.
- **Forward Refs**: use `React.forwardRef` to forward refs to a child component.

Refs are a powerful, flexible way to manipulate DOM elements and React component instances directly — but use them sparingly to keep your code maintainable and consistent.

## References

- [React Official Docs · useRef](https://react.dev/reference/react/useRef)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [glossary](glossary.md))