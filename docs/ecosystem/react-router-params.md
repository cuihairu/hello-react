### 16.2 Route Parameters and Dynamic Loading

In React Router, route parameters and dynamic loading are powerful features that let you create more flexible and dynamic user interfaces. Below is how to use route parameters and dynamically load components.

#### 16.2.1 Route Parameters

Route parameters let you pass dynamic data in the URL and render different content based on that data. For example, you can create a user page where the user ID is passed via a route parameter.

**1. Defining route parameters**

In a route definition, use a colon `:` to define a parameter:
```jsx
<Route path="/user/:id" element={<UserProfile />} />
```

**2. Accessing route parameters**

In a component, use the `useParams` Hook to access these parameters:
```jsx
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams(); // Get the route parameter id

  return (
    <div>
      <h2>User Profile</h2>
      <p>User ID: {id}</p>
    </div>
  );
}
```

**Complete example**:
```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/user/1">User 1</Link></li>
          <li><Link to="/user/2">User 2</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return <h2>Home Page</h2>;
}

function UserProfile() {
  const { id } = useParams();

  return (
    <div>
      <h2>User Profile</h2>
      <p>User ID: {id}</p>
    </div>
  );
}

export default App;
```

#### 16.2.2 Dynamic Component Loading

Dynamically loading components helps optimize your app's performance by loading components on demand, reducing initial load time. React Router combined with React's `lazy` and `Suspense` components can achieve dynamic component loading.

**1. Using `React.lazy` and `Suspense`**

`React.lazy` is used to dynamically load components, while `Suspense` provides fallback content or a loading indicator while a component loads.

**2. Dynamic component loading example**

```jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Dynamically load components
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));
const Contact = lazy(() => import('./Contact'));

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
```

**Explanation**:
- **`React.lazy(() => import('./Home'))`**: The corresponding module is loaded only when the `Home` component needs to be rendered.
- **`<Suspense fallback={<div>Loading...</div>}>`**: The content displayed while the dynamic component loads.

**Notes**:
- `React.lazy` can only be used with default-exported components.
- Make sure `Suspense` wraps all components that use `React.lazy`.

### Summary

With route parameters, you can pass dynamic data in the URL and create more flexible user interfaces. Dynamically loading components improves application performance by reducing initial load time through on-demand loading. Combined, these features make React Router a powerful and flexible routing solution.

## References

- [React Router Official Docs](https://reactrouter.com/home)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [knowledge](/knowledge.md))
