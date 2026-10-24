# A Quick Look at New React Features

A summary of features from the React 19 line (including the 19.3 stable release) and the Canary channel, to help you weigh upgrade benefits against migration cost.

## 1. `use` — Reading Promises/Context in a Component

```tsx
import { use } from 'react';

function Comments({ promise }: { promise: Promise<Comment[]> }) {
  const comments = use(promise); // Suspends rendering until it resolves
  return <ul>{comments.map(c => <li key={c.id}>{c.text}</li>)}</ul>;
}
```

- Callable in a component body, loops, and conditionals (not bound by the Rules of Hooks)
- When reading a Promise it throws, triggering the nearest `<Suspense>` boundary
- Reading Context is equivalent to `useContext`, but usable anywhere

## 2. `useOptimistic` — Optimistic Updates

```tsx
function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const [optimisticLikes, addOptimistic] = useOptimistic(likes, (curr, delta) => curr + delta);

  return (
    <button onClick={() => { addOptimistic(1); api.like().then(() => setLikes(l => l + 1)); }}>
      ❤️ {optimisticLikes}
    </button>
  );
}
```

- Reflects UI changes immediately, rolls back automatically if the background request fails
- Suits high-frequency interactions like likes, favorites, and form submits

## 3. `useActionState` / `useFormStatus` — Form Actions

```tsx
function SearchForm() {
  const [state, formAction] = useActionState(async (prev, formData) => {
    const res = await fetch('/api/search', { method: 'POST', body: formData });
    return res.json();
  }, { results: [] });

  return (
    <form action={formAction}>
      <input name="q" />
      <button type="submit">Search</button>
      {state.results.map(r => <div key={r.id}>{r.title}</div>)}
    </form>
  );
}
```

- `<form action={asyncFn}>` is native form submission — no manual `preventDefault`
- `useFormStatus` reads `pending`/`data`/`method`/`action` in a child component
- Combined with `useOptimistic` for seamless refreshes

## 4. Form Actions and `<form>` Enhancements

```tsx
export default function Page() {
  return (
    <form action={async (formData) => {
      'use server';
      await db.post.create({ title: formData.get('title') });
      redirect('/posts');
    }}>
      <input name="title" required />
      <button type="submit">Publish</button>
    </form>
  );
}
```

- Server Action: defined in a Server Component, the client form talks directly to the server
- Server utilities like `redirect`, `revalidatePath`, and `cookies` are available
- Gradually replaces the hand-written `onSubmit` + `fetch` pattern

## 5. Document Metadata `<head>` Support

```tsx
import { Title, Meta, Link } from 'react';

export default function Article({ slug }) {
  return (
    <article>
      <Title>Article Title - Hello React</Title>
      <Meta name="description" content="Article excerpt..." />
      <Meta property="og:image" content="/cover.png" />
      <Link rel="canonical" href={`/articles/${slug}`} />
      {/* Body */}
    </article>
  );
}
```

- Declared anywhere in the component tree, automatically hoisted to `<head>` at render time
- Replaces third-party libraries like `react-helmet`, with zero runtime overhead

## 6. `useId` Stabilization and SSR Consistency

```tsx
function FormField() {
  const id = useId(); // :r0:, :r1:, ... consistent on server and client
  return (
    <>
      <label htmlFor={id}>Email</label>
      <input id={id} type="email" />
    </>
  );
}
```

- Solves hydration mismatch — no hand-written `id` generation logic needed

## 7. Simplifying `forwardRef` (Experimental)

```tsx
// Old way: must wrap with forwardRef
const Input = forwardRef((props, ref) => <input {...props} ref={ref} />);
```


```tsx
// New way (experimental): receive ref as an ordinary prop
function Input(props, ref) {
  return <input {...props} ref={ref} />;
}
Input.displayName = 'Input';
```

- Function components receive `ref` directly as the second parameter, no `forwardRef` wrapper

## 8. React 19.3: View Transitions and Fragment refs

React 19.3 (released September 9, 2026) brings view-transition animation into the core:

```tsx
import { ViewTransition, addTransitionType } from 'react';

function Tabs({ tab, children }) {
  return (
    <ViewTransition>
      <div key={tab}>{children}</div>
    </ViewTransition>
  );
}
```

- `<ViewTransition />`: wraps a subtree that needs animation; enter, exit, and shared-element transitions are orchestrated by React automatically
- `addTransitionType`: tags a transition so animations can be customized per type
- Fragment refs: `<Fragment />` supports refs, easing composition of platform behavior
- `browser()` from react-dom: returns a thenable that throws during server render and resolves in the browser; combined with `use(browser())` to mark a subtree as browser-only

## Migration Recommendations

| Feature | Stable Version | Migration Priority | Notes |
|------|----------|------------|------|
| `use` | 19 | High | Replaces the Suspense + useEffect data-fetching pattern |
| `useOptimistic` | 19 | High | A clear boost to perceived interaction speed |
| `useActionState` | 19 | Medium | Biggest payoff when refactoring forms alongside Server Actions |
| Document metadata | 19 | Low | Can replace helmet incrementally |
| Simplifying `forwardRef` | Experimental | Low | Refactor in one go once it's stable |
| `<ViewTransition />` | 19.3 | Medium | Use the official primitive for view transitions, replacing hand-written View Transitions API |
| `browser()` | 19.3 | Low | Mark browser-only subtrees, replacing render-after-mount via `useEffect` |

## Related Resources

- [React 19 RC release notes](https://react.dev/blog/2024/12/05/react-19)
- [React 19.3 release notes](https://react.dev/blog/2026/09/09/react-19-3)
- [RFC: use Hook](https://github.com/reactjs/rfcs/pull/229)
- [RFC: Server Actions](https://github.com/reactjs/rfcs/pull/271)

## References

- [React Official Docs · React Compiler](https://react.dev/learn/react-compiler)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [context-api](/api/context-api.md))
- [hooks-api](/api/hooks-api.md))
- [hooks-deep-dive](/architecture/hooks-deep-dive.md))
- [use-effect](/architecture/use-effect.md))
- [use-reducer](/architecture/use-reducer.md))
- [use-state](/architecture/use-state.md))
- [README](README.md)
- [knowledge](/knowledge.md))
- [context-api](/typescript-react/context-api.md))
- [react-basics](/typescript-react/react-basics.md))
- [react-history-principles](/typescript-react/react-history-principles.md))
- [render-method](/typescript-react/render-method.md))
- [render-props](/typescript-react/render-props.md))
- [setstate](/typescript-react/setstate.md))
