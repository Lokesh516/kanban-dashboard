import React, { useState } from "react";
import "./TaskModal.css";

function TaskModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return alert("Title is required");

    onSubmit({ title, description, status });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
          <div className="modal-buttons">
            <button type="submit">Add Task</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
