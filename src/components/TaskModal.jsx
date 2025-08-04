import React, { useState } from "react";
import "./TaskModal.css";

// TaskModal component is used to add a new task
function TaskModal({ onClose, onSubmit }) {
  // Local state for task fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Title is required
    if (!title) return alert("Title is required");

    // Pass new task data to parent component
    onSubmit({ title, description, status });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Task</h2>

        {/* Task creation form */}
        <form onSubmit={handleSubmit}>
          {/* Title input (required) */}
          <input
            type="text"
            placeholder="Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Optional description */}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          {/* Status dropdown */}
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          {/* Action buttons */}
          <div className="modal-buttons">
            <button type="submit">Add Task</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
