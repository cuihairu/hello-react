React Routing
---

In React applications, routing is used to manage different views or pages of the application. React Router is one of the most popular routing libraries, providing powerful features for building dynamic, navigable single-page applications (SPAs). Here I collect the basics of React Router — installation, configuration, and advanced features.

### 16.1 Installing React Router and Basic Configuration

#### 16.1.1 Installing React Router

React Router's core library is `react-router-dom`, used to implement routing in web apps. Install it with the command below:

```bash
npm install react-router-dom
```

Or use yarn:

```bash
yarn add react-router-dom
```

#### 16.1.2 Basic Usage

Using React Router in a React app requires a few basic steps:

1. **Import the needed components**:
   ```javascript
   import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
   ```

2. **Set up routes**:
   ```jsx
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

         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/about" element={<About />} />
           <Route path="/contact" element={<Contact />} />
         </Routes>
       </Router>
     );
   }
   ```

3. **Create the components**:
   ```jsx
   function Home() {
     return <h2>Home Page</h2>;
   }

   function About() {
     return <h2>About Page</h2>;
   }

   function Contact() {
     return <h2>Contact Page</h2>;
   }
   ```

### 16.2 Route Parameters and Dynamic Loading

#### 16.2.1 Route Parameters

React Router supports parameters in route paths. Define a parameter by adding a `:` prefix in the route path, for example `"/user/:id"`. In a component, use the `useParams` Hook to access these parameters:

```jsx
import { useParams } from 'react-router-dom';

function User() {
  const { id } = useParams();
  return <h2>User ID: {id}</h2>;
}

// Configure in Routes
<Route path="/user/:id" element={<User />} />
```

#### 16.2.2 Dynamic Loading

Sometimes you need to load components or content dynamically based on conditions. Use React's `lazy` and `Suspense` for code splitting and dynamic loading:

```jsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Use lazy to load components
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
```

### 16.3 Nested Routes and Page Navigation

#### 16.3.1 Nested Routes

Nested routes let you define more routes inside a sub-route. For example, you might want to show different sub-pages on one page:

```jsx
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
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
```

#### 16.3.2 Page Navigation

React Router provides the `useNavigate` Hook for programmatic navigation. Use it inside an event handler to navigate between pages:

```jsx
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Run the login logic
    navigate('/dashboard');
  };

  return (
    <button onClick={handleSubmit}>Login</button>
  );
}
```

### 16.4 Route Protection and Authentication

#### 16.4.1 Route Protection

You can create a higher-order component or a wrapper component to protect routes:

```jsx
import { Navigate } from 'react-router-dom';

// Example authentication state: in a real project this can come from Context, Redux, or a server-side session
function getAuthToken() {
  return localStorage.getItem('token');
}

function PrivateRoute({ element }) {
  const isAuthenticated = Boolean(getAuthToken());

  return isAuthenticated ? element : <Navigate to="/login" />;
}

// Use PrivateRoute
<Routes>
  <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
</Routes>
```

### 16.5 Route Configuration and Programmatic Navigation

#### 16.5.1 Configuration

React Router supports setting up routes via a configuration object. Extract the route config into a separate file:

```jsx
const routes = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/contact', element: <Contact /> },
  { path: '/user/:id', element: <User /> },
];
```

#### 16.5.2 Programmatic Navigation

Use `useNavigate` for programmatic navigation:

```jsx
import { useNavigate } from 'react-router-dom';

function NavigateButton() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/somepath')}>
      Go to Some Path
    </button>
  );
}
```

### Summary

Here I collect React Router's basic configuration, route parameters, dynamic loading, nested routes, page navigation, route protection, and programmatic navigation, recording how these features combine in single-page applications.

## References

- [React Router Official Docs](https://reactrouter.com/home)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [glossary](/glossary.md))
