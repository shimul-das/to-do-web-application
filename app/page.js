'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from './store/todoSlice';
import TodoModal from './components/TodoModal';
import TodoItem from './components/TodoItem';
import Head from 'next/head';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    if (savedTodos.length > 0) {
      savedTodos.forEach(todo => {
        dispatch(addTodo({
          ...todo
        }));
      });
    }
    setIsLoaded(true);
  }, [dispatch]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('todos', JSON.stringify(todos));
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

  if (!isLoaded) {
    return null; 
  }

  return (
    <div className="container">
      <Head>
        <title>To-Do Web Application</title>
        <meta name="description" content="A simple to-do web application" />
      </Head>
      <h1>To-Do Web Application</h1>
      <input 
        type="text" 
        placeholder="Search..." 
        className="search-bar" 
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button onClick={handleAddClick}>Add Note</button>
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