### Core Principles and Usage of Redux

Redux is a predictable state container for managing global state in JavaScript applications, widely used in React projects. It provides a unified way to manage app state, making the data flow more controllable and predictable. Redux is based on three core principles: **single source of truth**, **state is read-only**, and **changes are made with pure functions**. Here I record Redux's basic principles, data flow, and common usage.

#### 1. Core Principles of Redux

1. **Single source of truth**:
   - The state of the entire app is stored in an object tree (also called `state`), kept in a single `store`.
   - This single-source approach ensures data consistency across every part of the app, making it easy to debug and track state changes.

2. **State is read-only**:
   - State in Redux is read-only. The only way to change state is to dispatch an `action`, an object describing what happened.
   - This design avoids the complexity and unpredictability that come from mutating state directly.

3. **Changes are made with pure functions**:
   - To describe how an `action` transforms the state tree, you write **pure functions**, called `reducer`s.
   - A `reducer` takes `state` and `action`, and returns the new `state`.

#### 2. Core Concepts of Redux

1. **Store**:
   - The `Store` is an object tree holding all of the app's state.
   - You create a `store` with the `createStore` function. The store provides `getState()` to get the current state, `dispatch(action)` to trigger a state change, and `subscribe(listener)` to subscribe to state changes.

2. **Action**:
   - An `Action` is a plain JavaScript object describing what happened. Every `action` must have a `type` property indicating the type of action to perform. The `action` object can carry other custom fields to pass data.

   ```javascript
   const incrementAction = {
     type: 'INCREMENT',
     payload: 1
   };
   ```

3. **Reducer**:
   - A `Reducer` is a pure function that takes the current `state` and `action`, and returns a new `state`.
   - A `Reducer` uses a `switch` statement or conditional logic to handle different types of `action`s and returns new state based on the `action`'s type.

   ```javascript
   function counterReducer(state = { count: 0 }, action) {
     switch (action.type) {
       case 'INCREMENT':
         return { count: state.count + action.payload };
       case 'DECREMENT':
         return { count: state.count - action.payload };
       default:
         return state;
     }
   }
   ```

4. **Dispatch**:
   - `dispatch` is the method in Redux that triggers an `action`. `dispatch(action)` sends the `action` to the `store`, which then calls the corresponding `reducer` to process the `action` and return the new state.

   ```javascript
   store.dispatch({ type: 'INCREMENT', payload: 1 });
   ```

#### 3. Redux Usage Flow

1. **Install Redux**:
   - First install Redux and React-Redux (the library binding Redux to React).
  
   ```bash
   npm install redux react-redux
   ```

2. **Create the Redux Store**:
   - Use the `createStore` method to create the Redux `store`, passing in the `reducer` function.

   ```javascript
   import { createStore } from 'redux';

   const store = createStore(counterReducer);
   ```

3. **Define Actions and Reducers**:
   - Define your `action`s and `reducer` as shown above.

4. **Use React-Redux's Provider component**:
   - Use the `Provider` component to inject the Redux `store` into the React component tree.

   ```jsx
   import React from 'react';
   import ReactDOM from 'react-dom';
   import { Provider } from 'react-redux';
   import App from './App';
   import { createStore } from 'redux';
   import counterReducer from './reducers';

   const store = createStore(counterReducer);

   ReactDOM.render(
     <Provider store={store}>
       <App />
     </Provider>,
     document.getElementById('root')
   );
   ```

5. **Connect React components to Redux**:
   - Use the `connect` higher-order component or the `useSelector` and `useDispatch` hooks to connect React components to the Redux `store`.

   ```jsx
   import React from 'react';
   import { useSelector, useDispatch } from 'react-redux';

   function Counter() {
     const count = useSelector((state) => state.count);
     const dispatch = useDispatch();

     return (
       <div>
         <p>Count: {count}</p>
         <button onClick={() => dispatch({ type: 'INCREMENT', payload: 1 })}>
           Increment
         </button>
         <button onClick={() => dispatch({ type: 'DECREMENT', payload: 1 })}>
           Decrement
         </button>
       </div>
     );
   }

   export default Counter;
   ```

#### 4. Redux Middleware and Async Operations

1. **Redux middleware**:
   - Middleware lets you inject custom logic after an `action` is dispatched but before it reaches the `reducer`. Common Redux middleware includes `redux-thunk` and `redux-saga`, used to handle async operations.

   ```bash
   npm install redux-thunk
   ```

   ```javascript
   import { createStore, applyMiddleware } from 'redux';
   import thunk from 'redux-thunk';
   import rootReducer from './reducers';

   const store = createStore(rootReducer, applyMiddleware(thunk));
   ```

2. **Async operations**:
   - Redux itself is synchronous. For async operations, the usual approach is the `redux-thunk` middleware, which allows an `action` to return a function instead of a plain object; the function body can contain async logic.

   ```javascript
   function fetchData() {
     return (dispatch) => {
       dispatch({ type: 'FETCH_DATA_REQUEST' });
       fetch('/api/data')
         .then((response) => response.json())
         .then((data) => dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data }))
         .catch((error) => dispatch({ type: 'FETCH_DATA_FAILURE', error }));
     };
   }
   ```

#### 5. Pros and Cons of Redux

**Pros**:
- **Predictability**: The single source of truth and pure-function state updates make app state management very predictable and easy to debug.
- **Debugging tools**: Redux DevTools provides powerful debugging, including time travel, recording, and replaying actions.
- **Ecosystem**: Rich middleware and tooling support, suited for state management in complex applications.

**Cons**:
- **Learning curve**: Redux's concepts and structure can be somewhat difficult for beginners.
- **Boilerplate**: Redux's structured approach requires writing a fair amount of boilerplate code.

**Summary**: Redux provides a powerful state management solution for complex React applications. By strictly following Redux's core principles and usage flow, app state management becomes more controllable and efficient.

## References

- [Redux Official Docs](https://redux.js.org/introduction/getting-started)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
