import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo, editTodo } from '../store/todoSlice';
import Swal from 'sweetalert2';

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
      Swal.fire({
        title: 'To-Do Updated',
        text: 'Your to-do has been updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } else {
      dispatch(addTodo({
        id: Date.now(),
        title,
        desc,
      }));
      Swal.fire({
        title: 'To-Do Added',
        text: 'Your to-do has been added successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }
    onClose();
  };

  return (
    <div className="modal fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="modal-content bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Edit To-Do' : 'Add To-Do'}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          required
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError('');
          }}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <textarea
          required
          placeholder="Description"
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
            setError('');
          }}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <div className="flex justify-end">
          <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2">{isEditMode ? 'Update' : 'Add'}</button>
          <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">{isEditMode ? 'Cancel' : 'Close'}</button>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;

