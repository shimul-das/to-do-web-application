'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo, editTodo } from '../store/todoSlice';

const TodoModal = ({ onClose, isEditMode, todo }) => {
  const [title, setTitle] = useState(todo ? todo.title : '');
  const [desc, setDesc] = useState(todo ? todo.desc : '');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!title.trim() || !desc.trim()) {
      setError('Title and description are required.');
      return;
    }

    if (isEditMode) {
      dispatch(editTodo({
        id: todo.id,
        title,
        desc
      }));
    } else {
      dispatch(addTodo({
        id: Date.now(),
        title,
        desc,
      }));
    }
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{isEditMode ? 'Edit To-Do' : 'Add To-Do'}</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          required
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError('');
          }}
        />
        <textarea
          required
          placeholder="Description"
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
            setError('');
          }}
        />
        <button onClick={handleSubmit}>{isEditMode ? 'Update' : 'Add'}</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default TodoModal;
