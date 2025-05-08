import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTask, removeTask, toggleTask } from '../features/taskSlice'

export default function TaskList() {
  const [title, setTitle] = useState('')
  const tasks = useSelector((state) => state.tasks)
  const dispatch = useDispatch()

  const handleAddTask = () => {
    if (title.trim()) {
      dispatch(addTask({ id: Date.now(), title, completed: false }))
      setTitle('')
    }
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nueva tarea"
          className="border p-2 rounded"
        />
        <button
          onClick={handleAddTask}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Agregar
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex justify-between p-2 mb-2 rounded ${task.completed ? 'bg-green-200' : 'bg-gray-100'}`}
          >
            <span onClick={() => dispatch(toggleTask(task.id))} className="cursor-pointer">
              {task.completed ? '✅ ' : '📝 '}
              {task.title}
            </span>
            <button
              onClick={() => dispatch(removeTask(task.id))}
              className="text-red-500"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
