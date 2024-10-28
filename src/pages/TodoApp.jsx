// App.js
import { useState, useEffect } from 'react';

function TodoApp() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [filter, setFilter] = useState('all');

    // Load tasks from localStorage on initial render
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, []);

    // Save tasks to localStorage whenever tasks change
    useEffect(() => {
        if (tasks.length > 0) { // Check to prevent overwriting with empty array on first load
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    // Add new task
    const addTask = () => {
        if (taskInput.trim()) {
            const newTask = { text: taskInput.trim(), completed: false };
            setTasks([...tasks, newTask]);
            setTaskInput('');
        }
    };

    // Toggle task completion
    const toggleComplete = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    };

    // Edit task
    const editTask = (index) => {
        const newTaskText = prompt('Edit task:', tasks[index].text);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            const updatedTasks = [...tasks];
            updatedTasks[index].text = newTaskText.trim();
            setTasks(updatedTasks);
        }
    };

    // Delete task
    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    // Filter tasks
    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">To-Do List Application</h1>
            <div className="row">
                <div className="col-lg-8 mx-auto">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Add a new task..."
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                    />
                    <button onClick={addTask} className="btn btn-primary w-100 my-2">Add Task</button>

                    <div className="d-flex justify-content-center my-3">
                        <button onClick={() => setFilter('all')} className="btn btn-outline-secondary mx-1">All</button>
                        <button onClick={() => setFilter('active')} className="btn btn-outline-info mx-1">Active</button>
                        <button onClick={() => setFilter('completed')} className="btn btn-outline-success mx-1">Completed</button>
                    </div>

                    <ul className="list-group">
                        {filteredTasks.map((task, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <input
                                        type="checkbox"
                                        className="form-check-input me-2"
                                        checked={task.completed}
                                        onChange={() => toggleComplete(index)}
                                    />
                                    <span className={task.completed ? 'completed' : ''}>{task.text}</span>
                                </div>
                                <div>
                                    <i
                                        className="bi bi-pencil-square me-2 text-primary"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => editTask(index)}
                                    ></i>
                                    <i
                                        className="bi bi-trash text-danger"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => deleteTask(index)}
                                    ></i>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TodoApp;