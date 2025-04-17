import React, { useState, useEffect } from "react";
import "./EditTaskModal.css";

// Modal component for editing an existing task
function EditTaskModal({ task, onClose, onSubmit }) {
  // Local state for form fields
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState(task.status);

  // Update local state if a different task is passed as prop
  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description || "");
    setStatus(task.status);
  }, [task]);

  // Handle form submission and pass updated task back to parent
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = { ...task, title, description, status };
    onSubmit(updatedTask); // Callback to update task in the main list
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description Input */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Status Dropdown */}
          <div className="form-group">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="modal-actions">
            <button type="submit">Update Task</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskModal;
