import React, { useState } from 'react';
import './Tasks.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    startDate: '',
    completed: false,
  });

  const [completedTasks, setCompletedTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleAddTask = () => {
    if (newTask.title.trim() !== '' && newTask.description.trim() !== '' && newTask.startDate.trim() !== '') {
      if (editingTaskId !== null) {

        setTasks(tasks.map((task) => (task.id === editingTaskId ? { ...task, ...newTask } : task)));
        setEditingTaskId(null);
      } else {

        setTasks([...tasks, { ...newTask, id: Date.now() }]);
      }


      setNewTask({
        title: '',
        description: '',
        startDate: '',
        completed: false,
      });
    }
  };

  const handleEditTask = (taskId, taskData) => {
    setNewTask(taskData);
    setEditingTaskId(taskId);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleCompleteTask = (taskId) => {
    const completedTask = tasks.find((task) => task.id === taskId);
    setTasks(tasks.filter((task) => task.id !== taskId));
    setCompletedTasks([...completedTasks, completedTask]);
  };

  const handleIncompleteTask = (taskId) => {
    const incompleteTask = completedTasks.find((task) => task.id === taskId);
    setCompletedTasks(completedTasks.filter((task) => task.id !== taskId));
    setTasks([...tasks, incompleteTask]);
  };

  return (
    <div className="app">
      <h1>ToDo App</h1>
      <div>
        <label>Task Title

          <input
            type="text"
            placeholder="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
        </label>
        <label>Task Description

          <input
            type="text"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
        </label>
        <label>Select the Start Date of Task

          <input
            type="date"
            value={newTask.startDate}
            onChange={(e) => setNewTask({ ...newTask, startDate: e.target.value })}
          />
        </label>
        <button onClick={handleAddTask}>{editingTaskId !== null ? 'Update Task' : 'Add Task'}</button>
      </div>
      <div>
        <h2>Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks to display.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.startDate}</td>
                  <td style={{ display: "flex", gap: "20px" }}>
                    <button style={{ backgroundColor: "blue" }} onClick={() => handleEditTask(task.id, task)}>Edit</button>
                    <button style={{ backgroundColor: "red" }} onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    <button onClick={() => handleCompleteTask(task.id)}>Mark as Completed</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="completed-tasks">
        <h2>Completed Tasks</h2>
        {completedTasks.length === 0 ? (
          <p>No completed tasks to display.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.startDate}</td>
                  <td style={{ display: "flex", gap: "20px" }}>
                    <button style={{ backgroundColor: "blue" }} onClick={() => handleEditTask(task.id, task)}>Edit</button>
                    <button style={{ backgroundColor: "red" }} onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    <button onClick={() => handleIncompleteTask(task.id)}>Mark as Incomplete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Tasks;
