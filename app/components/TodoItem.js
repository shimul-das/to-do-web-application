'use client';

import { useDispatch } from 'react-redux';
import { deleteTodo } from '../store/todoSlice';

const TodoItem = ({ todo, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  return (
    <div className="todo-item">
      <h3>{todo.title}</h3>
      <p>{todo.desc}</p>
      <button onClick={() => onEdit(todo)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TodoItem;

