### 16.1 Installing React Router and Basic Configuration

React Router is one of the most commonly used libraries for implementing routing in React applications. It lets you create and manage dynamic single-page applications (SPAs) and provides rich features for handling different views and navigation. Below are the installation and basic configuration steps:

#### 16.1.1 Installing React Router

React Router's core library is `react-router-dom`, used to implement routing in web apps. Install it with the command below:

Using npm:
```bash
npm install react-router-dom
```

Using yarn:
```bash
yarn add react-router-dom
```

#### 16.1.2 Basic Usage

Using React Router in a React app requires a few basic steps:

1. **Import the needed components**:
   ```javascript
   import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
   ```

   - `BrowserRouter`: Manages the app's browser history.
   - `Route`: Defines a route rule, specifying a path and the component to render.
   - `Routes`: A container holding all `Route` components, used to render the matching route.
   - `Link`: Used to create navigation links.

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

   - **`<Router>`** wraps the app's root component and manages all routes.
   - The **`<nav>`** section contains navigation links that users can use to move around the app.
   - **`<Routes>`** holds multiple **`<Route>`** components; each **`<Route>`** defines a path and its corresponding component.

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

   These components are rendered based on the route configuration.

#### 16.1.3 Complete Example

Here is a complete React Router configuration example:

```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

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

function Home() {
  return <h2>Home Page</h2>;
}

function About() {
  return <h2>About Page</h2>;
}

function Contact() {
  return <h2>Contact Page</h2>;
}

export default App;
```

#### 16.1.4 Other Router Components

- **`HashRouter`**: Uses the URL hash to manage history, suitable for environments that don't support the HTML5 History API.
  ```javascript
  import { HashRouter as Router } from 'react-router-dom';
  ```

- **`MemoryRouter`**: Used for testing or non-browser environments, managing history in memory.
  ```javascript
  import { MemoryRouter as Router } from 'react-router-dom';
  ```

### Summary

With the configuration above you can create a routed app; for route parameters, nested routes, and dynamic loading examples, see their respective pages.

## References

- [React Router Official Docs](https://reactrouter.com/start/framework/installation)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
