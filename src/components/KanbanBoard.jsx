import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskColumn from "./TaskColumn";
import TaskModal from "./TaskModal";
import "./KanbanBoard.css";

function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div>
      <button className="add-task-btn" onClick={() => setShowModal(true)}>
        + Add New Task
      </button>

      {showModal && (
        <TaskModal onClose={() => setShowModal(false)} onSubmit={handleAddTask} />
      )}

      <div className="kanban-board">
        {statuses.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks.filter((task) => task.status === status)}
            onTaskMove={handleTaskMove}
          />
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
