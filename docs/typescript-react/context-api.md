### 7.8 Using the Context API

The Context API is a mechanism React provides for sharing data throughout the component tree, without manually passing props through every intermediate layer. It is ideal for scenarios where data must cross multiple levels, such as theming, user authentication, and language settings.

---

## 7.8.1 What Is the Context API

### Definition

The Context API is a React feature for sharing data throughout the component tree without passing props layer by layer. It consists of two main parts:

- **`React.createContext()`**: creates a Context object that includes a Provider and a Consumer.
- **`Provider`**: the component that supplies the data, making it accessible to its children.
- **`Consumer`**: the component that consumes the data, retrieving it through the context object.

### Basic Usage

#### 1. Creating a Context

Use `React.createContext()` to create a Context object.

```jsx
import React from 'react';

// Create the Context object
const ThemeContext = React.createContext('light');
```

#### 2. Using the Provider

Use the `Provider` component to supply the context data.

```jsx
import React from 'react';
import ThemeContext from './ThemeContext'; // Import the created Context

const App = () => (
  <ThemeContext.Provider value="dark">
    <Toolbar />
  </ThemeContext.Provider>
);

const Toolbar = () => (
  <div>
    <ThemedButton />
  </div>
);
```

#### 3. Using the Consumer

Use the `Consumer` component to consume the context data.

```jsx
import React from 'react';
import ThemeContext from './ThemeContext'; // Import the created Context

const ThemedButton = () => (
  <ThemeContext.Consumer>
    {theme => (
      <button className={theme}>
        {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
      </button>
    )}
  </ThemeContext.Consumer>
);
```

### Example

```jsx
import React from 'react';

// Create the Context object
const ThemeContext = React.createContext('light');

const App = () => (
  <ThemeContext.Provider value="dark">
    <Toolbar />
  </ThemeContext.Provider>
);

const Toolbar = () => (
  <div>
    <ThemedButton />
  </div>
);

const ThemedButton = () => (
  <ThemeContext.Consumer>
    {theme => (
      <button style={{ background: theme === 'dark' ? '#333' : '#FFF', color: theme === 'dark' ? '#FFF' : '#000' }}>
        {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
      </button>
    )}
  </ThemeContext.Consumer>
);

export default App;
```

## 7.8.2 Scenarios for Using the Context API

### Theming

The Context API is commonly used for theming. It lets you share theme information throughout the application without passing it layer by layer.

```jsx
import React from 'react';

// Create the Context object
const ThemeContext = React.createContext('light');

const App = () => (
  <ThemeContext.Provider value="dark">
    <ThemedComponent />
  </ThemeContext.Provider>
);

const ThemedComponent = () => (
  <ThemeContext.Consumer>
    {theme => (
      <div style={{ background: theme === 'dark' ? '#333' : '#FFF', color: theme === 'dark' ? '#FFF' : '#000' }}>
        The current theme is {theme}
      </div>
    )}
  </ThemeContext.Consumer>
);

export default App;
```

### User Authentication

The Context API can also be used to share user authentication information, such as the current user and permissions.

```jsx
import React from 'react';

// Create the Context object
const UserContext = React.createContext(null);

const App = () => (
  <UserContext.Provider value={{ name: 'John Doe', isAuthenticated: true }}>
    <UserProfile />
  </UserContext.Provider>
);

const UserProfile = () => (
  <UserContext.Consumer>
    {user => (
      <div>
        {user.isAuthenticated ? `Hello, ${user.name}` : 'Please log in'}
      </div>
    )}
  </UserContext.Consumer>
);

export default App;
```

### Multi-Language Support

The Context API can be used to implement multi-language support, sharing the language setting across the whole application.

```jsx
import React from 'react';

// Create the Context object
const LanguageContext = React.createContext('en');

const App = () => (
  <LanguageContext.Provider value="fr">
    <Greeting />
  </LanguageContext.Provider>
);

const Greeting = () => (
  <LanguageContext.Consumer>
    {language => (
      <div>
        {language === 'fr' ? 'Bonjour' : 'Hello'}
      </div>
    )}
  </LanguageContext.Consumer>
);

export default App;
```

## 7.8.3 Notes on Using the Context API

### Avoid Overuse

Context should be used for global data, or data shared across many components. For local or single-component data, props are often more appropriate. Overusing Context leads to tight coupling between components and makes maintenance harder.

### Performance Optimization

When Context changes, every component that uses it re-renders. To optimize performance, you can use `React.memo` or `useMemo` to avoid unnecessary re-renders.

### Composing Multiple Contexts

If you need to manage multiple kinds of data, you can compose multiple Contexts.

```jsx
import React from 'react';

// Create multiple Context objects
const ThemeContext = React.createContext('light');
const UserContext = React.createContext(null);

const App = () => (
  <ThemeContext.Provider value="dark">
    <UserContext.Provider value={{ name: 'John Doe', isAuthenticated: true }}>
      <UserProfile />
    </UserContext.Provider>
  </ThemeContext.Provider>
);

const UserProfile = () => (
  <ThemeContext.Consumer>
    {theme => (
      <UserContext.Consumer>
        {user => (
          <div style={{ background: theme === 'dark' ? '#333' : '#FFF', color: theme === 'dark' ? '#FFF' : '#000' }}>
            {user.isAuthenticated ? `Hello, ${user.name}` : 'Please log in'}
          </div>
        )}
      </UserContext.Consumer>
    )}
  </ThemeContext.Consumer>
);

export default App;
```

## 7.8.4 Using the `useContext` Hook (Function Components)

### Basic Usage

Using the `useContext` hook in function components is a more concise way to access context data.

```jsx
import React, { useContext } from 'react';

// Create the Context object
const ThemeContext = React.createContext('light');

const ThemedComponent = () => {
  const theme = useContext(ThemeContext);

  return (
    <div style={{ background: theme === 'dark' ? '#333' : '#FFF', color: theme === 'dark' ? '#FFF' : '#000' }}>
      The current theme is {theme}
    </div>
  );
};

const App = () => (
  <ThemeContext.Provider value="dark">
    <ThemedComponent />
  </ThemeContext.Provider>
);

export default App;
```

### Combining with Other Hooks

`useContext` can be combined with hooks such as `useState` or `useReducer` to manage and share state.

```jsx
import React, { useState, useContext } from 'react';

// Create the Context object
const ThemeContext = React.createContext('light');

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={theme}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      <ThemedComponent />
    </ThemeContext.Provider>
  );
};

const ThemedComponent = () => {
  const theme = useContext(ThemeContext);

  return (
    <div style={{ background: theme === 'dark' ? '#333' : '#FFF', color: theme === 'dark' ? '#FFF' : '#000' }}>
      The current theme is {theme}
    </div>
  );
};

export default ThemeToggle;
```

---

The Context API is a powerful tool in React for sharing global data throughout the component tree. Used well, it simplifies data passing and state management between components while keeping components maintainable and flexible.

---

## React 18 → 19 Comparison

The body of this page follows React 18. The table below maps this page's Context patterns to React 19:

| Pattern | React 18 status | React 19 change | Notes |
| --- | --- | --- | --- |
| Legacy Context (`contextTypes` / `getChildContext`) | Available | **Removed** | Use `createContext` + `contextType` instead |
| `<Context.Provider>` | Required | **Can be shortened** | `<Context value={...}>` is equivalent to `.Provider` |
| `useContext` | Stable since 16.8 | No change | — |
| Class component `contextType` | Available | No change | Still the class component way in after legacy Context was removed |
| Reading Context | Required calling `useContext` inside a component | **Added `use`** | Async components can now read a Context directly as a parameter; see [React 19 new features](../future/react-new-features.md) |

Reference: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## References

- [React official docs · Context](https://react.dev/learn/scaling-up-with-reducer-and-context)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [knowledge](/knowledge.md))
- [README](README.md)
- [deep-dive-components](deep-dive-components.md)
