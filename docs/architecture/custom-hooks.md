### Creating and Using Custom Hooks

Custom Hooks are a mechanism in React that lets you abstract logic inside a component into reusable functions. Custom Hooks make it easier to share logic across multiple components and keep code clean and maintainable.

## 1. The Basics of Custom Hooks

Custom Hooks are functions that start with `use`, which ensures they follow React's Hook rules. Inside a custom Hook you can use other Hooks such as `useState` and `useEffect`.

### 1.1 The Basic Structure of a Custom Hook

A custom Hook function has a structure similar to any other Hook:

```jsx
import { useState, useEffect } from 'react';

function useCustomHook(param) {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Logic handling
    fetchData(param).then(data => setState(data));
  }, [param]);

  return state;
}
```

## 2. Creating Custom Hooks

### 2.1 Example: Fetching Data with a Custom Hook

Suppose you need to fetch user data in multiple components. You can create a custom Hook to do this:

```jsx
// useFetchUser.js
import { useState, useEffect } from 'react';

function useFetchUser(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/users/${userId}`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [userId]);

  return { user, loading, error };
}

export default useFetchUser;
```

### 2.2 Using a Custom Hook

You can use the custom Hook you created inside a component:

```jsx
import React from 'react';
import useFetchUser from './useFetchUser';

function UserProfile({ userId }) {
  const { user, loading, error } = useFetchUser(userId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

## 3. Best Practices for Custom Hooks

### 3.1 Abstracting Logic

Custom Hooks should be used to abstract logic that is reused repeatedly. For example, you can move form logic, animation logic, or data-fetching logic into a custom Hook.

### 3.2 Parameterizing Hooks

Custom Hooks typically accept parameters, which control the behavior of the Hook's internal logic. For example, `useFetchUser` takes a `userId` parameter to specify which user's data to fetch.

### 3.3 Composing Hooks

You can call other Hooks from inside a custom Hook. This lets you compose several pieces of logic and keep code modular and reusable.

```jsx
import { useState, useEffect } from 'react';
import useFetch from './useFetch'; // Assume useFetch is another custom Hook

function useUserProfile(userId) {
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`);

  return { user, loading, error };
}
```

### 3.4 Managing Side Effects

If a custom Hook needs to handle side effects, such as data fetching or event listeners, make sure to use `useEffect` correctly with cleanup to avoid memory leaks and unnecessary side effects.

## 4. Advanced Usage of Custom Hooks

### 4.1 Return Values of a Custom Hook

A custom Hook can return any kind of data — not only state, but also functions, objects, and more. For example, you can return a function that handles form logic:

```jsx
import { useState } from 'react';

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return [values, handleChange];
}
```

### 4.2 Testing Custom Hooks

To test a custom Hook, you can use React Testing Library's `renderHook` method to create an instance of the Hook and verify its behavior. `renderHook` has been built in since `@testing-library/react` v13.1 (the standalone `@testing-library/react-hooks` package is deprecated and has been merged into the main package).

```jsx
import { renderHook, waitFor } from '@testing-library/react';
import useFetchUser from './useFetchUser';

test('should fetch user data', async () => {
  const { result } = renderHook(() => useFetchUser(1));

  await waitFor(() => expect(result.current.user).toBeDefined());

  expect(result.current.loading).toBe(false);
});
```

## 5. Summary

Custom Hooks let you reuse and organize component logic. I usually extract logic into a Hook only when it has clear boundaries and is genuinely reused by multiple components, avoiding abstraction for its own sake.

---

## React 18 → 19 Comparison

The body of this page targets React 18. The table below maps this page's custom Hook content to React 19:

| Topic | React 18 status | React 19 change | Notes |
| --- | --- | --- | --- |
| Defining and calling custom Hooks | Stable | No change | — |
| Built-in Hook set | 11 basic Hooks | **4 added** | `use`, `useActionState`, `useOptimistic`, `useFormStatus` (react-dom) |
| Custom Hooks returning a ref | `useRef()` can take no argument | **TypeScript requires an argument** | Write `useRef(undefined)`; every returned `RefObject` is fully mutable |
| Cleanup logic | Written only in a `useEffect` return value | **Added ref cleanup** | A ref callback can return a cleanup function |
| StrictMode behavior | Double rendering | **Behavior refined** | `useMemo` / `useCallback` reuse the first result, making side-effect issues easier to spot when writing custom Hooks |

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## References

- [React official docs · Hooks API Reference](https://react.dev/reference/react/apis)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [hooks-deep-dive](hooks-deep-dive.md)
- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
