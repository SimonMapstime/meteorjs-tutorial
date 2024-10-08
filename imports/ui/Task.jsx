import React from "react";

const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      />
      <span>{task.text}</span>
      <button style={{ marginLeft: "8px" }} onClick={() => onDeleteClick(task)}>&times;</button>
    </li>
  );
};

export default Task;