import React, { useState, useEffect } from 'react';
import './CompletedTask.css';

const CompletedTask = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const completedTasks = storedTasks.filter(task => task.completed === true);
    setTasks(completedTasks);
  }, []);

  const handleEditClick = (task) => {
    setEditingTask(task);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingTask({ ...editingTask, [name]: value });
  };

  const handleSave = () => {
    const updatedTasks = tasks.map(task =>
      task.id === editingTask.id ? editingTask : task
    );

    const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedAllTasks = allTasks.map(task =>
      task.id === editingTask.id ? editingTask : task
    );

    localStorage.setItem('tasks', JSON.stringify(updatedAllTasks));
    setTasks(updatedTasks);
    setEditingTask(null); 
  };

  const handleMarkAsIncomplete = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId); 

    const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedAllTasks = allTasks.map(task =>
      task.id === taskId ? { ...task, completed: false } : task
    );

    localStorage.setItem('tasks', JSON.stringify(updatedAllTasks));
    setTasks(updatedTasks);
  };

  return (
    <div className="completed-task-container">
      <h2>Completed Tasks</h2>
      {tasks.length === 0 ? (
        <p>No completed tasks.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              {editingTask && editingTask.id === task.id ? (
                <div className="edit-task-form">
                  <input
                    type="text"
                    name="title"
                    value={editingTask.title}
                    onChange={handleInputChange}
                    placeholder="Edit title"
                  />
                  <input
                    type="text"
                    name="description"
                    value={editingTask.description}
                    onChange={handleInputChange}
                    placeholder="Edit description"
                  />
                  <input
                    type="date"
                    name="dueDate"
                    value={editingTask.dueDate}
                    onChange={handleInputChange}
                  />
                  <select
                    name="priority"
                    value={editingTask.priority}
                    onChange={handleInputChange}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={() => setEditingTask(null)}>Cancel</button>
                </div>
              ) : (
                <div className="task-details">
                  <p><strong>Title:</strong> {task.title}</p>
                  <p><strong>Description:</strong> {task.description}</p>
                  <p><strong>Due Date:</strong> {task.dueDate}</p>
                  <p><strong>Priority:</strong> {task.priority}</p>
                  <p><strong>Status:</strong> Completed</p>
                  <button onClick={() => handleEditClick(task)}>Edit</button>
                  <button onClick={() => handleMarkAsIncomplete(task.id)}>
                    Mark as Incomplete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompletedTask;
