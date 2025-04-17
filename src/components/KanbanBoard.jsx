import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskColumn from "./TaskColumn";
import TaskModal from "./TaskModal";
import EditTaskModal from "./EditTaskModal"; 
import "./KanbanBoard.css";

function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null); 

  const statuses = ["To Do", "In Progress", "Done"];

  useEffect(() => {
    axios.get("http://localhost:5000/tasks").then((response) => {
      setTasks(response.data);
    });
  }, []);

  const handleAddTask = (newTask) => {
    axios
      .post("http://localhost:5000/tasks", newTask)
      .then((response) => {
        setTasks([...tasks, response.data]);
        setShowModal(false);
      })
      .catch((err) => console.error("Error adding task:", err));
  };

  const handleTaskMove = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );

    axios
      .put(`http://localhost:5000/tasks/${taskId}`, {
        ...updatedTasks.find((task) => task.id === taskId),
      })
      .then(() => {
        setTasks(updatedTasks);
      })
      .catch((err) => console.error("Error updating task:", err));
  };

  const handleEditTask = (task) => {
    setEditingTask(task); 
  };

  const handleUpdateTask = (updatedTask) => {
    axios
      .put(`http://localhost:5000/tasks/${updatedTask.id}`, updatedTask)
      .then((response) => {
        
        const updatedTasks = tasks.map((task) =>
          task.id === updatedTask.id ? response.data : task
        );
        setTasks(updatedTasks);
        
        setEditingTask(null); 
      })
      .catch((err) => console.error("Error updating task:", err));
  };

  const handleDeleteTask = (taskId) => {
    axios
      .delete(`http://localhost:5000/tasks/${taskId}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== taskId));
      })
      .catch((err) => console.error("Error deleting task:", err));
  };

  return (
    <div>
      <button className="add-task-btn" onClick={() => setShowModal(true)}>
        + Add New Task
      </button>

      {showModal && (
        <TaskModal onClose={() => setShowModal(false)} onSubmit={handleAddTask} />
      )}

      {/* Display Edit Task Modal */}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSubmit={handleUpdateTask}
        />
      )}

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
