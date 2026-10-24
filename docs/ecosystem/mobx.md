### MobX and State Management

**MobX** is a simple, scalable state management library, well suited for managing state in React applications. It provides reactive programming capabilities, making synchronization between state and UI more natural and efficient. Compared with other state management tools like Redux, MobX focuses more on automation and simplicity in state management, eliminating a lot of boilerplate code.

#### 1. Core Concepts of MobX

MobX's core concepts revolve around three key parts: **observable**, **computed**, and **action**.

- **Observable (observable state)**: MobX lets you mark objects, arrays, and even primitives as observable, meaning their changes can be detected and automatically reflected in the relevant UI.
  
  ```javascript
  import { observable } from 'mobx';

  class TodoStore {
    @observable todos = [];
  }
  ```

- **Computed (computed properties)**: Computed properties are values derived from observables, and they only recompute when the observables they depend on change. This lazy evaluation helps improve performance.

  ```javascript
  import { computed } from 'mobx';

  class TodoStore {
    @observable todos = [];

    @computed get unfinishedTodoCount() {
      return this.todos.filter(todo => !todo.finished).length;
    }
  }
  ```

- **Action (actions)**: An action is any function that can modify observable state. MobX requires state changes to be executed through actions, which makes tracking state changes easier.

  ```javascript
  import { action } from 'mobx';

  class TodoStore {
    @observable todos = [];

    @action addTodo = (title) => {
      this.todos.push({ title, finished: false });
    }
  }
  ```

#### 2. State Management with MobX

Integrating MobX with React is very simple — the `mobx-react` library can inject MobX's observable state into React components.

##### 1. Install MobX and MobX-React

```bash
npm install mobx mobx-react
```

##### 2. Create the Store

First, create a store to manage application state. Here is a simple TodoStore example.

```javascript
import { observable, action, computed } from 'mobx';

class TodoStore {
  @observable todos = [];

  @action addTodo = (title) => {
    this.todos.push({ title, finished: false });
  };

  @computed get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length;
  }
}

const store = new TodoStore();
export default store;
```

##### 3. Inject the Store into React Components

Next, inject the store into React components so they can react to state changes in the store.

```jsx
import React from 'react';
import { observer } from 'mobx-react';
import todoStore from './stores/TodoStore';

const TodoList = observer(() => {
  const { todos, unfinishedTodoCount, addTodo } = todoStore;

  return (
    <div>
      <h3>Todos ({unfinishedTodoCount})</h3>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo.title}</li>
        ))}
      </ul>
      <button onClick={() => addTodo('New Task')}>Add Todo</button>
    </div>
  );
});

export default TodoList;
```

In the example above, `observer` is a higher-order component that turns a React component into a reactive one. When an observable in the store changes, the `TodoList` component automatically re-renders.

#### 3. Advantages of MobX

- **Simple and intuitive**: MobX makes state management more intuitive and eliminates a lot of boilerplate code. Developers can directly mark data as observable without explicitly creating reducers and actions.
- **Reactive programming**: MobX is built on reactive programming ideas — synchronization between state and UI is automatic, with no manual work required from developers.
- **Performance optimizations**: Thanks to MobX's computed properties and automatic dependency tracking, recomputation and re-rendering only happen when necessary, improving performance.
- **Highly flexible**: MobX's API is simple but powerful, suitable for projects from small to large, and it integrates seamlessly with mainstream frameworks like React and Vue.

#### 4. Comparison with Other State Management Tools

- **Compared with Redux**: MobX is more flexible and easier to use than Redux. Redux emphasizes a single state tree and immutability, providing a stricter state management pattern suited for large, complex applications. MobX, in contrast, focuses on convenience and automation, making it a good fit for rapid development and small-to-medium projects.
- **Compared with the Context API**: The Context API is more lightweight but lacks MobX's automatic reactivity and computed properties. For simple global state sharing, the Context API is a good choice, but for complex state management, MobX offers more powerful capabilities.

**Summary**: MobX provides a concise, efficient way to manage state in React applications, especially for apps that need to handle state changes flexibly. Through observable state, computed properties, and actions, MobX delivers automated reactive programming, greatly improving developer experience and code maintainability. When choosing a state management tool, decide whether to use MobX based on the project's complexity and your team's needs.

## References

- [MobX Official Docs](https://mobx.js.org/README.html)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
