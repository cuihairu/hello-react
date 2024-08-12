### 项目实战 - 多功能 Todo 应用

在这一章节中，我们将通过创建一个多功能的 Todo 应用来实践 React 和 TypeScript 的知识。这个应用将涵盖需求分析、设计、开发、状态管理、测试和部署等多个方面。下面是本章节的详细内容。

---

#### **需求分析与设计**

**需求分析：**
1. **基本功能：**
   - 添加、删除和编辑 Todo 项目。
   - 标记 Todo 项目的完成状态。
   - 显示所有 Todo 项目、已完成项目和未完成项目的筛选功能。

2. **高级功能：**
   - 使用 Redux 进行全局状态管理。
   - 添加用户认证功能（可选）。
   - 支持拖放排序（可选）。
   - 实现 Todo 项目的本地存储（使用浏览器的 localStorage 或 IndexedDB）。

**设计：**
- **页面结构：**
  - **主页**：显示 Todo 列表，添加和过滤 Todo 项目。
  - **详情页**（可选）：显示 Todo 项目的详细信息和编辑功能。

- **组件划分：**
  - **App**：应用的根组件。
  - **TodoList**：显示 Todo 项目的列表。
  - **TodoItem**：表示单个 Todo 项目。
  - **TodoForm**：用于添加和编辑 Todo 项目。
  - **Filters**：用于筛选 Todo 项目的组件。

---

#### **使用 React 与 TypeScript 开发应用**

1. **初始化项目：**

   使用 Create React App 和 TypeScript 创建项目：
   ```bash
   npx create-react-app todo-app --template typescript
   ```

2. **项目结构：**

   在项目中创建以下文件夹和文件结构：
   ```
   src/
   ├── components/
   │   ├── TodoList.tsx
   │   ├── TodoItem.tsx
   │   ├── TodoForm.tsx
   │   └── Filters.tsx
   ├── models/
   │   └── Todo.ts
   ├── reducers/
   │   └── todoReducer.ts
   ├── actions/
   │   └── todoActions.ts
   ├── App.tsx
   └── index.tsx
   ```

3. **定义数据模型：**

   在 `models/Todo.ts` 中定义 Todo 数据模型：
   ```typescript
   export interface Todo {
     id: number;
     text: string;
     completed: boolean;
   }
   ```

4. **编写组件：**

   - **TodoList.tsx**
     ```typescript
     import React from 'react';
     import { Todo } from '../models/Todo';
     import TodoItem from './TodoItem';

     interface Props {
       todos: Todo[];
       onToggle: (id: number) => void;
       onDelete: (id: number) => void;
     }

     const TodoList: React.FC<Props> = ({ todos, onToggle, onDelete }) => {
       return (
         <ul>
           {todos.map(todo => (
             <TodoItem
               key={todo.id}
               todo={todo}
               onToggle={() => onToggle(todo.id)}
               onDelete={() => onDelete(todo.id)}
             />
           ))}
         </ul>
       );
     };

     export default TodoList;
     ```

   - **TodoItem.tsx**
     ```typescript
     import React from 'react';
     import { Todo } from '../models/Todo';

     interface Props {
       todo: Todo;
       onToggle: () => void;
       onDelete: () => void;
     }

     const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete }) => {
       return (
         <li>
           <span
             style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
             onClick={onToggle}
           >
             {todo.text}
           </span>
           <button onClick={onDelete}>Delete</button>
         </li>
       );
     };

     export default TodoItem;
     ```

   - **TodoForm.tsx**
     ```typescript
     import React, { useState } from 'react';

     interface Props {
       onAdd: (text: string) => void;
     }

     const TodoForm: React.FC<Props> = ({ onAdd }) => {
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
             onChange={(e) => setText(e.target.value)}
           />
           <button type="submit">Add Todo</button>
         </form>
       );
     };

     export default TodoForm;
     ```

   - **Filters.tsx**
     ```typescript
     import React from 'react';

     interface Props {
       filter: string;
       onFilterChange: (filter: string) => void;
     }

     const Filters: React.FC<Props> = ({ filter, onFilterChange }) => {
       return (
         <div>
           <button onClick={() => onFilterChange('all')}>All</button>
           <button onClick={() => onFilterChange('completed')}>Completed</button>
           <button onClick={() => onFilterChange('active')}>Active</button>
         </div>
       );
     };

     export default Filters;
     ```

5. **状态管理与 Redux：**

   - **todoReducer.ts**
     ```typescript
     import { Todo } from '../models/Todo';

     type Action =
       | { type: 'ADD_TODO'; text: string }
       | { type: 'TOGGLE_TODO'; id: number }
       | { type: 'DELETE_TODO'; id: number }
       | { type: 'SET_FILTER'; filter: string };

     interface State {
       todos: Todo[];
       filter: string;
     }

     const initialState: State = {
       todos: [],
       filter: 'all',
     };

     const todoReducer = (state: State = initialState, action: Action): State => {
       switch (action.type) {
         case 'ADD_TODO':
           return {
             ...state,
             todos: [
               ...state.todos,
               { id: Date.now(), text: action.text, completed: false },
             ],
           };
         case 'TOGGLE_TODO':
           return {
             ...state,
             todos: state.todos.map(todo =>
               todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
             ),
           };
         case 'DELETE_TODO':
           return {
             ...state,
             todos: state.todos.filter(todo => todo.id !== action.id),
           };
         case 'SET_FILTER':
           return {
             ...state,
             filter: action.filter,
           };
         default:
           return state;
       }
     };

     export default todoReducer;
     ```

   - **todoActions.ts**
     ```typescript
     export const addTodo = (text: string) => ({
       type: 'ADD_TODO',
       text,
     });

     export const toggleTodo = (id: number) => ({
       type: 'TOGGLE_TODO',
       id,
     });

     export const deleteTodo = (id: number) => ({
       type: 'DELETE_TODO',
       id,
     });

     export const setFilter = (filter: string) => ({
       type: 'SET_FILTER',
       filter,
     });
     ```

6. **主应用程序（App.tsx）：**

   ```typescript
   import React, { useReducer } from 'react';
   import TodoList from './components/TodoList';
   import TodoForm from './components/TodoForm';
   import Filters from './components/Filters';
   import todoReducer from './reducers/todoReducer';
   import { addTodo, toggleTodo, deleteTodo, setFilter } from './actions/todoActions';
   import { Todo } from './models/Todo';

   const App: React.FC = () => {
     const [state, dispatch] = useReducer(todoReducer, {
       todos: [],
       filter: 'all',
     });

     const handleAddTodo = (text: string) => dispatch(addTodo(text));
     const handleToggleTodo = (id: number) => dispatch(toggleTodo(id));
     const handleDeleteTodo = (id: number) => dispatch(deleteTodo(id));
     const handleFilterChange = (filter: string) => dispatch(setFilter(filter));

     const filteredTodos = state.todos.filter(todo => {
       switch (state.filter) {
         case 'completed':
           return todo.completed;
         case 'active':
           return !todo.completed;
         default:
           return true;
       }
     });

     return (
       <div>
         <h1>Todo App</h1>
         <TodoForm onAdd={handleAddTodo} />
         <Filters filter={state.filter} onFilterChange={handleFilterChange} />
         <TodoList
           todos={filteredTodos}
           onToggle={handleToggleTodo}
           onDelete={handleDeleteTodo}
         />
       </div>
     );
   };

   export default App;
   ```

---

#### **集成 Redux（可选）**

对于大型应用，使用 Redux 进行全局状态管理可以帮助简化状态逻辑和数据流。如果选择使用 Redux，确保你已经安装了 `redux` 和 `react-redux` 并按照 Redux 的标准流程配置。

---

#### **测试与质量保证

**

1. **编写测试：**

   使用 Jest 和 React Testing Library 编写组件测试。测试 Todo 项目的添加、删除、筛选等功能。

   - **TodoList.test.tsx**
     ```typescript
     import React from 'react';
     import { render, fireEvent } from '@testing-library/react';
     import TodoList from './TodoList';
     import { Todo } from '../models/Todo';

     test('renders todos and handles toggle and delete', () => {
       const todos: Todo[] = [
         { id: 1, text: 'Learn React', completed: false },
         { id: 2, text: 'Learn TypeScript', completed: true },
       ];

       const onToggle = jest.fn();
       const onDelete = jest.fn();

       const { getByText } = render(
         <TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} />
       );

       fireEvent.click(getByText('Learn React'));
       fireEvent.click(getByText('Delete'));

       expect(onToggle).toHaveBeenCalledWith(1);
       expect(onDelete).toHaveBeenCalledWith(1);
     });
     ```

2. **持续集成：**

   配置持续集成（CI）工具，如 GitHub Actions、Travis CI 或 CircleCI，自动运行测试并构建应用。

---

#### **部署**

1. **构建应用：**

   使用 `npm run build` 构建生产版本。

2. **选择托管服务：**

   将构建后的应用部署到托管服务如 Vercel、Netlify、GitHub Pages 等。

---

### 总结

通过这个多功能的 Todo 应用项目，你可以学习到 React 和 TypeScript 的核心概念和实用技巧。项目涵盖了组件开发、状态管理、测试和部署等关键领域，为你提供了全面的实践经验。