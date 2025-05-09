import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../features/taskSlice';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(createTask({ title }));
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="New task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className=""
      />
      <button
        type="submit"
        className=""
      >
        Add
      </button>
    </form>
  );
};

export default TaskForm;
