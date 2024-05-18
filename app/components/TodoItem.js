'use client';

import { useDispatch } from 'react-redux';
import { deleteTodo } from '../store/todoSlice';
import Swal from 'sweetalert2';

const TodoItem = ({ todo, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this to-do item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTodo(todo.id));
        Swal.fire(
          'Deleted!',
          'Your to-do item has been deleted.',
          'success'
        );
      }
    });
  };

  return (
    <div className="todo-item">
      <h3 className="text-2xl font-bold" >{todo.title}</h3>
      <p className="text-lg">{todo.desc}</p>
      <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2" onClick={() => onEdit(todo)}>Edit</button>
      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TodoItem;

