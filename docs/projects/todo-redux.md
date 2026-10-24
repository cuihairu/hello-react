Integrating Redux for state management makes an app's state handling more centralized and predictable. Here are the steps for integrating Redux into a React and TypeScript project:

### 1. Install Redux and related libraries

First, install Redux and React-Redux:

```bash
npm install redux react-redux
```

> Since `react-redux` v8, TypeScript type definitions are built in, so there's no need to install `@types/react-redux` (that package only covers v7 and earlier).

### 2. Configure Redux

#### 2.1. Create the Redux-related files

In the `src` directory, create the following folder and file structure:

```
src/
├── store/
│   ├── actions.ts
│   ├── reducer.ts
│   └── store.ts
├── types/
│   └── todo.d.ts
└── components/
    ├── TodoList.tsx
    ├── TodoItem.tsx
    ├── TodoForm.tsx
    └── Filters.tsx
```

#### 2.2. Define Action types and Action Creators

**`src/store/actions.ts`**

```ts
import { Todo } from '../types/todo';

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

interface AddTodoAction {
  type: typeof ADD_TODO;
  payload: { text: string };
}

interface ToggleTodoAction {
  type: typeof TOGGLE_TODO;
  payload: { id: number };
}

interface DeleteTodoAction {
  type: typeof DELETE_TODO;
  payload: { id: number };
}

export type TodoActionTypes = AddTodoAction | ToggleTodoAction | DeleteTodoAction;

export const addTodo = (text: string): TodoActionTypes => ({
  type: ADD_TODO,
  payload: { text },
});

export const toggleTodo = (id: number): TodoActionTypes => ({
  type: TOGGLE_TODO,
  payload: { id },
});

export const deleteTodo = (id: number): TodoActionTypes => ({
  type: DELETE_TODO,
  payload: { id },
});

// The filter state also lives in the store, for the Filters component to use
export type TodoFilter = 'all' | 'completed' | 'active';

export const SET_FILTER = 'SET_FILTER';

export interface SetFilterAction {
  type: typeof SET_FILTER;
  payload: { filter: TodoFilter };
}

export const setFilter = (filter: TodoFilter): SetFilterAction => ({
  type: SET_FILTER,
  payload: { filter },
});
```

#### 2.3. Define the Reducer

**`src/store/reducer.ts`**

The state consists of two parts: `todos` (the list) and `filter` (the filter condition):

```ts
import { Todo } from '../types/todo';
import { TodoActionTypes, TodoFilter, ADD_TODO, TOGGLE_TODO, DELETE_TODO, SET_FILTER } from './actions';

export interface TodoState {
  todos: Todo[];
  filter: TodoFilter;
}

const initialState: TodoState = {
  todos: [],
  filter: 'all',
};

export const todoReducer = (state = initialState, action: TodoActionTypes | SetFilterAction): TodoState => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload.text,
            completed: false,
          },
        ],
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload.filter,
      };
    default:
      return state;
  }
};
```

#### 2.4. Create the Redux Store

**`src/store/store.ts`**

```ts
import { legacy_createStore as createStore } from 'redux';
import { todoReducer } from './reducer';

export const store = createStore(todoReducer);

// The global state type, used by useSelector and similar places
export type RootState = ReturnType<typeof store.getState>;
```

### 3. Connect Redux to React

#### 3.1. Provide the Redux Store

In the `index.tsx` file, pass the Redux Store to the app using `Provider`.

**`src/index.tsx`**

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

#### 3.2. Use Redux state and dispatch Actions

**`src/components/TodoList.tsx`**

```tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TodoItem from './TodoItem';
import { RootState } from '../store/store';
import { toggleTodo, deleteTodo } from '../store/actions';

const TodoList: React.FC = () => {
  // RootState is exported from store.ts (ReturnType<typeof store.getState>)
  const todos = useSelector((state: RootState) => {
    if (state.filter === 'completed') return state.todos.filter(t => t.completed);
    if (state.filter === 'active') return state.todos.filter(t => !t.completed);
    return state.todos;
  });
  const dispatch = useDispatch();

  const handleToggle = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
```

**`src/components/TodoForm.tsx`**

```tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/actions';

const TodoForm: React.FC = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
```

**`src/components/Filters.tsx`**

```tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { TodoFilter, setFilter } from '../store/actions';

const Filters: React.FC = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (filter: TodoFilter) => {
    dispatch(setFilter(filter));
  };

  return (
    <div>
      <button onClick={() => handleFilterChange('all')}>All</button>
      <button onClick={() => handleFilterChange('completed')}>Completed</button>
      <button onClick={() => handleFilterChange('active')}>Active</button>
    </div>
  );
};

export default Filters;
```

### 4. Run and test the app

Once all files are configured correctly, run the application to test it.

```bash
npm start
```

This implementation centralizes the Todo state in the Redux store, with the reducer handling updates.

## References

- [Redux Official Documentation](https://redux.js.org/introduction/getting-started)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [knowledge](/knowledge.md))
- [README](README.md)