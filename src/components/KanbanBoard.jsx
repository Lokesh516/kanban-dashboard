import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskColumn from "./TaskColumn";
import TaskModal from "./TaskModal";
import EditTaskModal from "./EditTaskModal";
import "./KanbanBoard.css";

// Main Kanban board component
function KanbanBoard() {
  // State for all tasks
  const [tasks, setTasks] = useState([]);

  // Modal visibility state for adding a new task
  const [showModal, setShowModal] = useState(false);

  // State to track which task is being edited
  const [editingTask, setEditingTask] = useState(null);

  // Task status categories (columns)
  const statuses = ["To Do", "In Progress", "Done"];
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    axios.get(`${API_URL}/tasks`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  }, [API_URL]);

  // Handle adding a new task
  const handleAddTask = (newTask) => {
    axios.post(`${API_URL}/tasks`, newTask)
      .then((response) => {
        setTasks([...tasks, response.data]);
        setShowModal(false);
      })
      .catch((err) => console.error("Error adding task:", err));
  };

  // Handle moving a task to a different column (status)
  const handleTaskMove = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );

    axios.put(`${API_URL}/tasks/${taskId}`, {
      ...updatedTasks.find((task) => task.id === taskId),
    })
    .then(() => {
      setTasks(updatedTasks);
    })
    .catch((err) => console.error("Error updating task:", err));
  };

  // Trigger the edit modal with the selected task data
  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  // Handle updating a task after editing
  const handleUpdateTask = (updatedTask) => {
    axios.put(`${API_URL}/tasks/${updatedTask.id}`, updatedTask)
      .then((response) => {
        const updatedTasks = tasks.map((task) =>
          task.id === updatedTask.id ? response.data : task
        );
        setTasks(updatedTasks);
        setEditingTask(null);
      })
      .catch((err) => console.error("Error updating task:", err));
  };

  // Handle deleting a task
  const handleDeleteTask = (taskId) => {
    axios.delete(`${API_URL}/tasks/${taskId}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== taskId));
      })
      .catch((err) => console.error("Error deleting task:", err));
  };

  return (
    <div>
      {/* Button to open add task modal */}
      <button className="add-task-btn" onClick={() => setShowModal(true)}>
        + Add New Task
      </button>

      {/* Add Task Modal */}
      {showModal && (
        <TaskModal onClose={() => setShowModal(false)} onSubmit={handleAddTask} />
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSubmit={handleUpdateTask}
        />
      )}

      {/* Render columns by task status */}
      <div className="kanban-board">
        {statuses.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks.filter((task) => task.status === status)}
            onTaskMove={handleTaskMove}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
