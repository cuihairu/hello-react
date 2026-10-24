### 16.3 Nested Routes and Page Navigation

Nested routes and page navigation are key React Router features that let developers build more complex UI structures and user interaction flows. Below is how to implement nested routes and page navigation with React Router.

#### 16.3.1 Nested Routes

Nested routes let you define sub-routes within a route, creating hierarchical page views. This is very useful for applications with complex layouts, such as admin panels with multiple panels or tabs.

**1. Defining nested routes**

You can define sub-routes inside the main route's component:
```jsx
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Sub-components
function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="overview">Overview</Link></li>
          <li><Link to="settings">Settings</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="overview" element={<Overview />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

function Overview() {
  return <h3>Overview Page</h3>;
}

function Settings() {
  return <h3>Settings Page</h3>;
}

// Main app component
function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return <h2>Home Page</h2>;
}

export default App;
```

**Explanation**:
- **Main route definition**: The `/dashboard/*` route has the sub-routes `overview` and `settings` defined under it.
- **Nested `Routes` component**: Sub-routes are defined inside the `Dashboard` component, so clicking different links renders different sub-pages.

#### 16.3.2 Page Navigation

Page navigation lets users move between different pages or views in the app. In React Router, you can achieve page navigation with the `Link` component and the `useNavigate` Hook.

**1. Using the `Link` component**

The `Link` component is used for in-app navigation, similar to the HTML `<a>` tag, but it does not trigger a page reload:
```jsx
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}
```

**2. Using the `useNavigate` Hook**

The `useNavigate` Hook is used for programmatic navigation in function components:
```jsx
import { useNavigate } from 'react-router-dom';

function LoginButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the login page
    navigate('/login');
  };

  return <button onClick={handleClick}>Login</button>;
}
```

**Complete example**:
```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>
    </nav>
  );
}

function Home() {
  return <h2>Home Page</h2>;
}

function About() {
  return <h2>About Page</h2>;
}

function Contact() {
  return <h2>Contact Page</h2>;
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="overview">Overview</Link></li>
          <li><Link to="settings">Settings</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="overview" element={<Overview />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

function Overview() {
  return <h3>Overview Page</h3>;
}

function Settings() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard/overview');
  };

  return (
    <div>
      <h3>Settings Page</h3>
      <button onClick={handleClick}>Go to Overview</button>
    </div>
  );
}

export default App;
```

**Summary**:
- **Nested routes**: Define sub-routes inside a parent route to create hierarchical pages.
- **Page navigation**: Use the `Link` component for link navigation, or the `useNavigate` Hook for programmatic navigation.

These features let you build more flexible and dynamic user interfaces, enhancing the user experience.

## References

- [React Router Official Docs](https://reactrouter.com/home)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
