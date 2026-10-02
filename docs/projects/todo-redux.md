集成 Redux 进行状态管理可以使应用的状态管理更加集中和可预测。以下是将 Redux 集成到 React 和 TypeScript 项目中的步骤：

### 1. 安装 Redux 和相关库

首先，安装 Redux、React-Redux 和 TypeScript 的类型定义。

```bash
npm install redux react-redux
npm install @types/react-redux
```

### 2. 配置 Redux

#### 2.1. 创建 Redux 相关的文件

在 `src` 目录下，创建以下文件夹和文件结构：

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

#### 2.2. 定义 Action 类型和 Action Creators

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
```

#### 2.3. 定义 Reducer

**`src/store/reducer.ts`**

```ts
import { Todo } from '../types/todo';
import { TodoActionTypes, ADD_TODO, TOGGLE_TODO, DELETE_TODO } from './actions';

const initialState: Todo[] = [];

export const todoReducer = (state = initialState, action: TodoActionTypes): Todo[] => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload.text,
          completed: false,
        },
      ];
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.payload.id);
    default:
      return state;
  }
};
```

#### 2.4. 创建 Redux Store

**`src/store/store.ts`**

```ts
import { createStore } from 'redux';
import { todoReducer } from './reducer';

export const store = createStore(todoReducer);
```

### 3. 连接 Redux 与 React

#### 3.1. 提供 Redux Store

在 `index.tsx` 文件中，使用 `Provider` 将 Redux Store 传递给应用。

**`src/index.tsx`**

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

#### 3.2. 使用 Redux 状态和派发 Actions

**`src/components/TodoList.tsx`**

```tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TodoItem from './TodoItem';
import { Todo } from '../types/todo';
import { RootState } from '../types/store';
import { toggleTodo, deleteTodo } from '../store/actions';

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state);
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
import { TodoFilter } from '../types/store';
import { setFilter } from '../store/actions';

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

### 4. 运行和测试应用

确保所有文件正确配置后，运行应用程序进行测试。

```bash
npm start
```

通过这些步骤，你可以成功地将 Redux 集成到 React 和 TypeScript 项目中，实现了更高效和集中化的状态管理。