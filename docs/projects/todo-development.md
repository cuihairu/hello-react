### Developing the App with React and TypeScript

When developing a multi-feature Todo app with React and TypeScript, you benefit from TypeScript's type safety and React's component-based nature. Here are the steps and sample code for developing the app with React and TypeScript.

---

#### 1. Project initialization

First, initialize a TypeScript project with `create-react-app`.

```bash
npx create-react-app todo-app --template typescript
cd todo-app
```

::: warning About create-react-app
CRA has been marked as no longer recommended (deprecated) by the React team and no longer receives new features. For new projects, use Vite (`npm create vite@latest todo-app -- --template react-ts`) or Next.js instead; the examples in this note still use CRA to keep the directory structure consistent, and the component code works unchanged with other scaffolds.
:::

#### 2. Install the required dependencies

If you need other libraries, such as state management tools (like Redux or MobX), install the corresponding dependencies.

```bash
npm install redux react-redux
# or
npm install mobx mobx-react-lite
```

> Since `react-redux` v8, TypeScript type definitions are built in, so there's no need to install `@types/react-redux` (that package only covers v7 and earlier).

#### 3. Structure planning

Based on the earlier design, the project directory structure can be as follows:

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

#### 4. Component development

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
import { todoReducer } from './hooks/useTodos';

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

export type TodoAction =
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

#### 5. Configuration and running

Configure TypeScript and ESLint in `package.json` to ensure code quality.

**5.1. TypeScript configuration (`tsconfig.json`)**

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

**5.2. ESLint configuration (`.eslintrc.json`)**

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

#### 6. Run the app

Run the following command to start the dev server:

```bash
npm start
```

Through these steps, you'll be able to develop a fully functional Todo app with React and TypeScript. It not only delivers a good user experience but also leverages TypeScript's type safety to improve code reliability and maintainability.

## References

- [React Official Documentation (external link)](https://react.dev/learn)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [knowledge](/knowledge.md))
- [README](README.md)