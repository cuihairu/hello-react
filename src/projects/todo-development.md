### 使用 React 与 TypeScript 开发应用

在使用 React 和 TypeScript 开发多功能 Todo 应用时，你将受益于 TypeScript 的类型安全性和 React 的组件化特性。以下是使用 React 和 TypeScript 开发应用的步骤和示例代码。

---

#### **1. 项目初始化**

首先，使用 `create-react-app` 初始化一个 TypeScript 项目。

```bash
npx create-react-app todo-app --template typescript
cd todo-app
```

#### **2. 安装所需依赖**

如果需要使用其他库，比如状态管理工具（如 Redux 或 MobX），可以安装相应的依赖。

```bash
npm install redux react-redux @types/react-redux
# 或
npm install mobx mobx-react-lite
```

#### **3. 结构规划**

根据之前的设计，项目目录结构可以如下：

```
todo-app/
│
├── src/
│   ├── components/
│   │   ├── TodoList.tsx
│   │   ├── TodoItem.tsx
│   │   ├── TodoForm.tsx
│   │   └── Filters.tsx
│   ├── hooks/
│   │   └── useTodos.ts
│   ├── App.tsx
│   ├── index.tsx
│   ├── types/
│   │   └── todo.d.ts
│   └── utils/
│       └── localStorage.ts
└── package.json
```

#### **4. 组件开发**

**4.1. `TodoItem.tsx`**

```tsx
import React from 'react';

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, onToggle, onDelete }) => {
  return (
    <div>
      <input 
        type="checkbox" 
        checked={completed} 
        onChange={() => onToggle(id)} 
      />
      <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>{text}</span>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};

export default TodoItem;
```

**4.2. `TodoList.tsx`**

```tsx
import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
```

**4.3. `TodoForm.tsx`**

```tsx
import React, { useState } from 'react';

interface TodoFormProps {
  onAdd: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (text.trim()) {
      onAdd(text);
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

**4.4. `Filters.tsx`**

```tsx
import React from 'react';

interface FiltersProps {
  filter: 'all' | 'completed' | 'active';
  onFilterChange: (filter: 'all' | 'completed' | 'active') => void;
}

const Filters: React.FC<FiltersProps> = ({ filter, onFilterChange }) => {
  return (
    <div>
      <button onClick={() => onFilterChange('all')} disabled={filter === 'all'}>All</button>
      <button onClick={() => onFilterChange('completed')} disabled={filter === 'completed'}>Completed</button>
      <button onClick={() => onFilterChange('active')} disabled={filter === 'active'}>Active</button>
    </div>
  );
};

export default Filters;
```

**4.5. `App.tsx`**

```tsx
import React, { useReducer } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Filters from './components/Filters';
import { Todo } from './types/todo';
import { todoReducer, TodoAction } from './hooks/useTodos';

const App: React.FC = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [filter, setFilter] = React.useState<'all' | 'completed' | 'active'>('all');

  const handleAdd = (text: string) => {
    dispatch({ type: 'ADD_TODO', payload: { text } });
  };

  const handleToggle = (id: number) => {
    dispatch({ type: 'TOGGLE_TODO', payload: { id } });
  };

  const handleDelete = (id: number) => {
    dispatch({ type: 'DELETE_TODO', payload: { id } });
  };

  const handleFilterChange = (filter: 'all' | 'completed' | 'active') => {
    setFilter(filter);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm onAdd={handleAdd} />
      <Filters filter={filter} onFilterChange={handleFilterChange} />
      <TodoList todos={filteredTodos} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
};

export default App;
```

**4.6. `types/todo.d.ts`**

```ts
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
```

**4.7. `hooks/useTodos.ts`**

```ts
import { Todo } from '../types/todo';

type TodoAction =
  | { type: 'ADD_TODO'; payload: { text: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: number } }
  | { type: 'DELETE_TODO'; payload: { id: number } };

export const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload.text,
          completed: false,
        },
      ];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload.id);
    default:
      return state;
  }
};
```

#### **5. 配置与运行**

在 `package.json` 中配置 TypeScript 和 ESLint，以确保代码质量。

**5.1. TypeScript 配置 (`tsconfig.json`)**

```json
{
  "compilerOptions": {
    "target": "ES5",
    "lib": ["DOM", "ES6"],
    "allowJs": true,
    "jsx": "react",
    "module": "commonjs",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"]
    }
  },
  "include": ["src"]
}
```

**5.2. ESLint 配置 (`.eslintrc.json`)**

```json
{
  "extends": ["react-app", "react-app/jest", "plugin:@typescript-eslint/recommended"],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": ["warn"],
    "react/prop-types": "off"
  }
}
```

#### **6. 运行应用**

运行以下命令启动开发服务器：

```bash
npm start
```

通过这些步骤，你将能够使用 React 和 TypeScript 开发一个功能完善的 Todo 应用。这不仅提供了良好的用户体验，还利用 TypeScript 的类型安全性提高了代码的可靠性和维护性。