import React from "react";
import { useDrag } from "react-dnd";
import "./Task.css";

// Task component represents an individual task card
function Task({ task, onEdit, onDelete }) {
  // Make the task draggable using react-dnd
  const [{ isDragging }, drag] = useDrag({
    type: "task", // Type of draggable item
    item: { taskId: task.id }, // Data sent on drag
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // Track dragging state for styling
    }),
  });

  return (
    <div
      ref={drag} // Connect the drag ref
      className="task"
      style={{ opacity: isDragging ? 0.5 : 1 }} // Reduce opacity while dragging
    >
      {/* Task Title */}
      <div className="task-title">{task.title}</div>

      {/* Task Description (if available) */}
      {task.description && <div className="task-desc">{task.description}</div>}

      {/* Edit button triggers edit modal */}
      <button className="edit-btn" onClick={() => onEdit(task)}>
        Edit
      </button>

      {/* Delete button removes the task */}
      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </div>
  );
}

export default Task;
