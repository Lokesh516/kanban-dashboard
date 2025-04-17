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

  // Fetch all tasks from the server when the component mounts
  useEffect(() => {
    axios.get("http://localhost:5000/tasks").then((response) => {
      setTasks(response.data);
    });
  }, []);

  // Handle adding a new task
  const handleAddTask = (newTask) => {
    axios
      .post("http://localhost:5000/tasks", newTask)
      .then((response) => {
        setTasks([...tasks, response.data]); // Add new task to the list
        setShowModal(false); // Close the modal
      })
      .catch((err) => console.error("Error adding task:", err));
  };

  // Handle moving a task to a different column (status)
  const handleTaskMove = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );

    axios
      .put(`http://localhost:5000/tasks/${taskId}`, {
        ...updatedTasks.find((task) => task.id === taskId),
      })
      .then(() => {
        setTasks(updatedTasks); // Update local state with new status
      })
      .catch((err) => console.error("Error updating task:", err));
  };

  // Trigger the edit modal with the selected task data
  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  // Handle updating a task after editing
  const handleUpdateTask = (updatedTask) => {
    axios
      .put(`http://localhost:5000/tasks/${updatedTask.id}`, updatedTask)
      .then((response) => {
        const updatedTasks = tasks.map((task) =>
          task.id === updatedTask.id ? response.data : task
        );
        setTasks(updatedTasks); // Update the task list with edited task
        setEditingTask(null); // Close the edit modal
      })
      .catch((err) => console.error("Error updating task:", err));
  };

  // Handle deleting a task
  const handleDeleteTask = (taskId) => {
    axios
      .delete(`http://localhost:5000/tasks/${taskId}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== taskId)); // Remove from UI
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
