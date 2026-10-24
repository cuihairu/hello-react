### Project in Practice - A Multi-Feature Todo App

This Todo app records my process of handling requirements, design, development, state management, testing, and deployment with React and TypeScript.

---

#### Requirements Analysis and Design

**Requirements analysis:**
1. **Basic features:**
   - Add, delete, and edit Todo items.
   - Mark the completion status of Todo items.
   - Filtering to show all Todo items, completed items, and incomplete items.

2. **Advanced features:**
   - Use Redux for global state management.
   - Add user authentication (optional).
   - Support drag-and-drop reordering (optional).
   - Implement local storage of Todo items (using the browser's localStorage or IndexedDB).

**Design:**
- **Page structure:**
  - **Home page**: Shows the Todo list, adding and filtering Todo items.
  - **Detail page** (optional): Shows detailed information about a Todo item and editing functionality.

- **Component breakdown:**
  - **App**: The root component of the app.
  - **TodoList**: Displays the list of Todo items.
  - **TodoItem**: Represents a single Todo item.
  - **TodoForm**: For adding and editing Todo items.
  - **Filters**: A component for filtering Todo items.

---

#### Developing the App with React and TypeScript

1. **Initialize the project:**

   Create the project with Create React App and TypeScript:
   ```bash
   npx create-react-app todo-app --template typescript
   ```

2. **Project structure:**

   Create the following folder and file structure in the project:
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

3. **Define the data model:**

   Define the Todo data model in `models/Todo.ts`:
   ```typescript
   export interface Todo {
     id: number;
     text: string;
     completed: boolean;
   }
   ```

4. **Write the components:**

   - **TodoList.tsx**
     ```tsx
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
     ```tsx
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
     ```tsx
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
     ```tsx
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

5. **State management and Redux:**

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

6. **Main application (App.tsx):**

   ```tsx
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

#### Integrating Redux (Optional)

For large applications, using Redux for global state management helps simplify state logic and data flow. If you choose to use Redux, make sure you've installed `redux` and `react-redux` and configured it following the standard Redux workflow.

---

#### Testing and Quality Assurance

1. **Write tests:**

   Write component tests with Jest and React Testing Library. Test adding, deleting, and filtering Todo items.

   - **TodoList.test.tsx**
     ```tsx
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

       const { getByText, getAllByText } = render(
         <TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} />
       );

       fireEvent.click(getByText('Learn React'));
       // Both todos render a Delete button, so use getAllByText and take the first one
       fireEvent.click(getAllByText('Delete')[0]);

       expect(onToggle).toHaveBeenCalledWith(1);
       expect(onDelete).toHaveBeenCalledWith(1);
     });
     ```

2. **Continuous integration:**

   Configure a continuous integration (CI) tool such as GitHub Actions, Travis CI, or CircleCI to automatically run tests and build the app.

---

#### Deployment

1. **Build the app:**

   Use `npm run build` to build the production version.

2. **Choose a hosting service:**

   Deploy the built app to a hosting service such as Vercel, Netlify, or GitHub Pages.

---

### Summary

Through this multi-feature Todo app project, you can learn the core concepts and practical techniques of React and TypeScript. The project covers key areas such as component development, state management, testing, and deployment, giving you comprehensive hands-on experience.

## References

- [React Official Documentation (external link)](https://react.dev/learn)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [knowledge](/knowledge.md))