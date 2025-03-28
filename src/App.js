import { useState } from "react";
import "./App.scss";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const updateNewTask = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    const task = {
      value: newTask,
      isComplete: false,
      id: Date.now(),
      label: undefined,
    };
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    setNewTask("");
    console.log("tasks: ", newTasks);
  };

  const deleteTask = (taskId) => {
    const currentTasks = [...tasks];
    const updatedTasks = currentTasks.filter(({ id }) => id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleCompleted = (taskId) => {
    const currentTasks = [...tasks];
    const taskIndex = currentTasks.findIndex(({ id }) => id === taskId);
    const taskAtIndexCompleted = currentTasks[taskIndex].isComplete;
    currentTasks[taskIndex] = {
      ...currentTasks[taskIndex],
      isComplete: !taskAtIndexCompleted,
    };
    setTasks(currentTasks);
  };

  const addToList = (taskId, listLabel) => {
    const currentTasks = [...tasks];
    const taskIndex = currentTasks.findIndex(({ id }) => id === taskId);
    currentTasks[taskIndex] = {
      ...currentTasks[taskIndex],
      label: listLabel,
    };
    setTasks(currentTasks);
  };

  const incompleteTasks = tasks.filter(({ isComplete }) => !isComplete);
  const completedTasks = tasks.filter(({ isComplete }) => isComplete);
  const nonLabelledTasks = incompleteTasks.filter(({ label }) => !label);
  const homeworkTasks = incompleteTasks.filter(
    ({ label }) => label === "Homework"
  );
  const choreTasks = incompleteTasks.filter(({ label }) => label === "Chores");

  const CompleteButton = ({ taskId }) => {
    return (
      <button
        className="complete-button"
        onClick={() => toggleCompleted(taskId)}
      >
        &#x2713;
      </button>
    );
  };

  const IncompleteButton = ({ taskId }) => {
    return (
      <button
        className="incomplete-button"
        onClick={() => toggleCompleted(taskId)}
      >
        &#215;
      </button>
    );
  };

  const ListButton = ({ taskId, listName }) => {
    return (
      <button
        className={`list-button ${listName.toLowerCase()}`}
        onClick={() => addToList(taskId, listName)}
      >
        {listName}
      </button>
    );
  };

  const DeleteButton = ({ taskId }) => {
    return (
      <button className="delete-button" onClick={() => deleteTask(taskId)}>
        &#x1F5D1;
      </button>
    );
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <div className="input-container">
        <input
          className="task-input"
          type="text"
          placeholder="Enter a task"
          value={newTask}
          onChange={updateNewTask}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="tasks-container incomplete-tasks-container">
        <div className="task-header">Incomplete Tasks</div>
        <div className="task-items">
          {nonLabelledTasks.map(({ value, id }) => {
            return (
              <div className="task" key={id}>
                <span className="task-text">{value}</span>
                <div className="button-container">
                  <ListButton taskId={id} listName={"Homework"} />
                  <ListButton taskId={id} listName={"Chores"} />
                  <CompleteButton taskId={id} />
                  <DeleteButton taskId={id} />
                </div>
              </div>
            );
          })}
        </div>
        {!!homeworkTasks.length && (
          <div className="sub-list homework-list">
            <div>Homework Tasks</div>
            {homeworkTasks.map(({ value, id }) => {
              return (
                <div className="task" key={id}>
                  <span className="task-text">{value}</span>
                  <div className="button-container">
                    <CompleteButton taskId={id} />
                    <DeleteButton taskId={id} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {!!choreTasks.length && (
          <div className="sub-list chore-list">
            <div>Chore Tasks</div>
            {choreTasks.map(({ value, id }) => {
              return (
                <div className="task" key={id}>
                  <span className="task-text">{value}</span>
                  <div className="button-container">
                    <CompleteButton taskId={id} />
                    <DeleteButton taskId={id} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="tasks-container completed-tasks-container">
        <div className="task-header">Completed Tasks</div>
        {completedTasks.map(({ value, id }) => {
          return (
            <div className="task" key={id}>
              <span className="task-text">{value}</span>
              <div className="button-container">
                <IncompleteButton taskId={id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
