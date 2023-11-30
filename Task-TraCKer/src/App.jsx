import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [inputTask, setInputTask] = useState({
    addTask: ''
  });
  const [tasks, setTasks] = useState([]);
  const [isSaved, setIsSaved] = useState([]);

  useEffect(() => {
    let storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputTask({
      ...inputTask,
      [name]: value
    });
  };

  const handleClick = () => {
    if (inputTask.addTask === "") {
      alert("Add new task");
    } else {
      setTasks([...tasks, inputTask.addTask]);
      setIsSaved([...isSaved, false]);
    }
    setInputTask({ addTask: '' });
  };

  const editTask = (index) => {
    const editedTask = prompt('Edit task:', tasks[index]);
    if (editedTask !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[index] = editedTask;
      setTasks(updatedTasks);
    }
  };

  const saved = (index) => {
    if (!isSaved[index]) {
      const updatedIsSaved = [...isSaved];
      updatedIsSaved[index] = true;
      setIsSaved(updatedIsSaved);
    }
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const clear = () => {
    localStorage.clear();
    setTasks([]);
    setIsSaved([]);
  };

  const newTask = tasks.map((task, index) => (
    <div className='task--el' key={index}>
      <li className={`tasks ${isSaved[index] ? 'completed' : ''}`}>
        {task}
      </li><div>
        <span onClick={() => editTask(index)} className={`material-symbols-outlined task--edit ${isSaved[index] ? 'done' : ''}`}>edit
        </span>
        <button onClick={() => saved(index)} disabled={isSaved[index]} className={`task--save ${isSaved[index] ? 'saved' : ''}`}>
          <span className="material-symbols-outlined">done</span>
        </button>
      </div>
    </div>
  ));

  return (
    <div className='task--container'>
      <header>
        <h2>Task Tra<span className='bold'>CK</span>er</h2>
        <span title='Clear All' onClick={clear} className="task--clear clear-icon material-symbols-outlined">
          clear_all
        </span>
      </header>
      <input
        name="addTask"
        type="text"
        placeholder="Add new task"
        value={inputTask.addTask}
        onChange={handleChange}
        className='task--input'
      />
      <button className='task--btn' onClick={handleClick}>Add Task</button>
      <ul className='task--content'>
        {newTask}
      </ul>
    </div>
  );
};

export default App;
