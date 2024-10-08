import React, { useState } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { TaskCollection } from "../api/TasksCollection";
import Task from "./Task";
import TaskForm from "./TaskForm";
import LoginForm from "./LoginForm";

export const App = () => {
  // Fetching user from
  const user = useTracker(() => Meteor.user());

  const logout = () => Meteor.logout();
  // Used to check if the server is loading the data
  const isLoading = useSubscribe("tasks");
  // Used to know if the filter should be used
  const [hideCompleted, setHideCompleted] = useState(false);
  // MongoDB Filter Object
  const hideCompletedFilter = { isChecked: { $ne: true } };
  // RPC call to server depending on the filter value
  const tasks = useTracker(() => {
    if (!user) return [];
    return TaskCollection.find(hideCompleted ? hideCompletedFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch();
  });
  // Used to show how many uncompleted tasks are still to do on the title of the page
  const pendingTaskCount = useTracker(() => {
    if (!user) return 0;
    return TaskCollection.find(hideCompletedFilter).count();
  });
  // Display value of our task count
  const pendingTaskTitle = `${
    pendingTaskCount ? ` (${pendingTaskCount})` : ""
  }`;
  // Handle Callback Function of the status of the task
  const handleToggleChecked = ({ _id, isChecked }) => {
    Meteor.callAsync("tasks.toggleChecked", { _id, isChecked });
  };
  // Handle Callback Function to delete a task
  const handleDelete = ({ _id }) => {
    Meteor.callAsync("tasks.delete", { _id });
  };
  // Alternative rendering if the data aren't loaded
  if (isLoading()) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            {" "}
            <h1>📜 ToDo List !{pendingTaskTitle}</h1>
          </div>
        </div>
      </header>
      <div className="main">
        {user ? (
          <>
          <div className="user" onClick={logout}>{user.username}</div>
            <TaskForm />
            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? "Show All" : "Hide Completed"}
              </button>
            </div>
            <ul className="tasks">
              {tasks.map((task) => (
                <Task
                  key={task._id}
                  task={task}
                  onCheckboxClick={handleToggleChecked}
                  onDeleteClick={handleDelete}
                />
              ))}
            </ul>
          </>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};
