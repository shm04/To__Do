import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleComplete, deleteCompletedTasks, editTask } from '../features/taskSlice';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  const handleToggleComplete = (task) => {
    dispatch(toggleComplete({ id: task._id, completed: !task.completed }));
  };

  const handleDeleteCompleted = () => {
    dispatch(deleteCompletedTasks());
  };

  const handleEdit = (task) => {
    setEditId(task._id);
    setNewTitle(task.title);
  };

  const handleSave = (id) => {
    if (newTitle.trim()) {
      dispatch(editTask({ id, title: newTitle }));
      setEditId(null);
    }
  };

  return (
    <div className="task-list">
      <h2>Tasks List</h2>
      <ul className="tasks-ul">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="task-li"
          >
            <div className="li-content">
              {/* Círculo de selección para marcar como completada */}
              <div
                onClick={() => handleToggleComplete(task)}
                className={`task-select ${
                  task.completed ? 'completed' : ''
                }`}
              />
              {editId === task._id ? (
                <>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <button
                    onClick={() => handleSave(task._id)}
                    className="save-button"
                  >
                    Guardar
                  </button>
                </>
              ) : (
                <span className={`task-text ${task.completed ? 'line-through' : 'normal'}`}>
                  {task.title}
                </span>
              )}
            </div>
            <div>
              <button
                onClick={() => handleEdit(task)}
              >
                Editar
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={handleDeleteCompleted}
        className="delete-completed"
      >
        Eliminar tareas completadas
      </button>
    </div>
  );
};

export default TaskList;
