import React, { useState, useEffect } from 'react';
import './TaskTable.css';

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const saveTasks = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handlePriorityFilterChange = (e) => {
    setPriorityFilter(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm);
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
    const matchesStatus = 
      statusFilter === 'All' ||
      (statusFilter === 'Completed' && task.completed) ||
      (statusFilter === 'Pending' && !task.completed);
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const handleComplete = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    saveTasks(updatedTasks);
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    saveTasks(updatedTasks);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingTask({ ...editingTask, [name]: value });
  };

  const handleSave = () => {
    const updatedTasks = tasks.map(task =>
      task.id === editingTask.id ? editingTask : task
    );
    saveTasks(updatedTasks);
    setEditingTask(null);
  };

  return (
    <div className="task-table-container">
      <h2>All Tasks</h2>

      <div className="task-controls">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search"
        />
        <select onChange={handlePriorityFilterChange} className="search" value={priorityFilter}>
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select onChange={handleStatusFilterChange} value={statusFilter} className="search">
          <option value="All">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>
                {editingTask && editingTask.id === task.id ? (
                  <input
                    type="text"
                    name="title"
                    value={editingTask.title}
                    onChange={handleInputChange}
                  />
                ) : (
                  task.title
                )}
              </td>
              <td>
                {editingTask && editingTask.id === task.id ? (
                  <input
                    type="text"
                    name="description"
                    value={editingTask.description}
                    onChange={handleInputChange}
                  />
                ) : (
                  task.description
                )}
              </td>
              <td>
                {editingTask && editingTask.id === task.id ? (
                  <input
                    type="date"
                    name="dueDate"
                    value={editingTask.dueDate}
                    onChange={handleInputChange}
                  />
                ) : (
                  task.dueDate
                )}
              </td>
              <td>
                {editingTask && editingTask.id === task.id ? (
                  <select name="priority" value={editingTask.priority} onChange={handleInputChange}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                ) : (
                  task.priority
                )}
              </td>
              <td>{task.completed ? 'Completed' : 'Pending'}</td>
              <td>
                {editingTask && editingTask.id === task.id ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditingTask(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    {task.completed ? '' : <button onClick={() => handleComplete(task.id)}>Mark as Done</button>}
                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
