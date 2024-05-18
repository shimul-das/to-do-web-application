// 'use client';

// import { createSlice } from '@reduxjs/toolkit';

// const loadState = () => {
//   try {
//     const serializedState = localStorage.getItem('todos');
//     if (serializedState === null) {
//       return [];
//     }
//     return JSON.parse(serializedState);
//   } catch (e) {
//     console.warn("Could not load state from localStorage", e);
//     return [];
//   }
// };

// const initialState = {
//   todos: loadState(),
// };

// const todoSlice = createSlice({
//   name: 'todos',
//   initialState,
//   reducers: {
//     addTodo: (state, action) => {
//       state.todos.push(action.payload);
//       localStorage.setItem('todos', JSON.stringify(state.todos));
//     },
//     editTodo: (state, action) => {
//       const index = state.todos.findIndex(todo => todo.id === action.payload.id);
//       if (index !== -1) {
//         state.todos[index] = action.payload;
//         localStorage.setItem('todos', JSON.stringify(state.todos));
//       }
//     },
//     deleteTodo: (state, action) => {
//       state.todos = state.todos.filter(todo => todo.id !== action.payload);
//       localStorage.setItem('todos', JSON.stringify(state.todos));
//     },
//   },
// });

// export const { addTodo, editTodo, deleteTodo } = todoSlice.actions;
// export default todoSlice.reducer;


'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [], // Start with an empty array
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    editTodo: (state, action) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const { addTodo, editTodo, deleteTodo, setTodos } = todoSlice.actions;
export default todoSlice.reducer;
