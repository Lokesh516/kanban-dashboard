import React from "react";
import "./TaskCard.css";

// TaskCard component for displaying individual task info in a simple card format
function TaskCard({ task }) {
  return (
    <div className="task-card">
      {/* Task title */}
      <h3>{task.title}</h3>
      
      {/* Task description */}
      <p>{task.description}</p>
    </div>
  );
}

export default TaskCard;
