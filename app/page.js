// 'use client';

// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { addTodo } from './store/todoSlice';
// import TodoModal from './components/TodoModal';
// import TodoItem from './components/TodoItem';
// import Head from 'next/head';

// export default function Home() {
//   const [showModal, setShowModal] = useState(false);
//   const [editTodo, setEditTodo] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const todos = useSelector((state) => state.todos.todos);
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
//     if (savedTodos.length > 0) {
//       savedTodos.forEach(todo => {
//         dispatch(addTodo({
//           ...todo
//         }));
//       });
//     }
//     setIsLoaded(true);
//   }, [dispatch]);

//   useEffect(() => {
//     if (isLoaded) {
//       localStorage.setItem('todos', JSON.stringify(todos));
//     }
//   }, [todos, isLoaded]);

//   const handleAddClick = () => {
//     setEditTodo(null);
//     setShowModal(true);
//   };

//   const handleEditClick = (todo) => {
//     setEditTodo(todo);
//     setShowModal(true);
//   };
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const filteredTodos = todos.filter(todo => 
//     todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     todo.desc.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   if (!isLoaded) {
//     return null; 
//   }

//   return (
//     <div className="container">
//       <Head>
//         <title>To-Do Web Application</title>
//         <meta name="description" content="A simple to-do web application" />
//       </Head>
//       <h1 className='h1'>To-Do Web Application</h1>
//       <input 
//         type="text" 
//         placeholder="Search..." 
//         className="search-bar" 
//         value={searchQuery}
//         onChange={handleSearchChange}
//       />
//       <button onClick={handleAddClick}>Add Note</button>
//       <div className="todo-list">
//         {filteredTodos.map(todo => (
//           <TodoItem key={todo.id} todo={todo} onEdit={handleEditClick} />
//         ))}
//       </div>
//       {showModal && (
//         <TodoModal
//           onClose={() => setShowModal(false)}
//           isEditMode={!!editTodo}
//           todo={editTodo}
//         />
//       )}
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, setTodos } from './store/todoSlice';
import TodoModal from './components/TodoModal';
import TodoItem from './components/TodoItem';
import Head from 'next/head';

const LOCAL_STORAGE_KEY = 'todos';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  // Load todos from local storage once on the client-side after initial render
  useEffect(() => {
    if (typeof window !== 'undefined' && !isLoaded) {
      const savedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
      dispatch(setTodos(savedTodos));
      setIsLoaded(true);
    }
  }, [isLoaded, dispatch]);

  // Save todos to local storage whenever the todos state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  const handleAddClick = () => {
    setEditTodo(null);
    setShowModal(true);
  };

  const handleEditClick = (todo) => {
    setEditTodo(todo);
    setShowModal(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTodos = todos.filter(todo => 
    todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    todo.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title >To-Do Web Application</title>
        <meta name="description" content="A simple to-do web application" />
      </Head>
      <h1 className="text-3xl font-bold mb-4 text-white">To-Do Web Application</h1>
      <input 
        type="text" 
        placeholder="Search..." 
        className="search-bar px-4 py-2 mb-4 border border-gray-300 rounded w-full"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button 
        onClick={handleAddClick} 
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add Note
      </button>
      <div className="todo-list">
        {filteredTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} onEdit={handleEditClick} />
        ))}
      </div>
      {showModal && (
        <TodoModal
          onClose={() => setShowModal(false)}
          isEditMode={!!editTodo}
          todo={editTodo}
        />
      )}
    </div>
  );
}  