import React, { useState, useEffect } from 'react';
import './UpcomingTask.css';

const UpcomingTask = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const upcomingTasks = storedTasks.filter(task => new Date(task.dueDate) > new Date());
    setTasks(upcomingTasks);
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

    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setEditingTask(null);
  };

  return (
    <div className="upcoming-task-container">
      <h2>Upcoming Tasks</h2>
      {tasks.length === 0 ? (
        <p>No upcoming tasks.</p>
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
                  <textarea
                    name="description"
                    value={editingTask.description}
                    onChange={handleInputChange}
                    placeholder="Edit description"
                  ></textarea>
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
                  <button onClick={() => handleEditClick(task)}>Edit</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingTask;
