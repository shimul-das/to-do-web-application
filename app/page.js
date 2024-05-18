
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
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      savedTodos.forEach(todo => {
        dispatch(addTodo(todo));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddClick = () => {
    setEditTodo(null);
    setShowModal(true);
  };

  const handleEditClick = (todo) => {
    setEditTodo(todo);
    setShowModal(true);
  };

  return (
    <div className="container">
      <Head>
        <title>To-Do Web Application</title>
        <meta name="description" content="A simple to-do web application" />
      </Head>
      <h1>To-Do Web Application</h1>
      <input type="text" placeholder="Search..." className="search-bar" />
      <button onClick={handleAddClick}>Add Note</button>
      <div className="todo-list">
        {todos.map(todo => (
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
