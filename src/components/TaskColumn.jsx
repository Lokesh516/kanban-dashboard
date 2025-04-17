import React from "react";
import Task from "./Task";
import { useDrop } from "react-dnd";
import "./TaskColumn.css";

// TaskColumn component represents each column (To Do, In Progress, Done) on the board
function TaskColumn({ status, tasks, onTaskMove, onEditTask, onDeleteTask }) {
  // useDrop hook to handle dropping tasks into this column
  const [{ isOver }, drop] = useDrop({
    accept: "task", // Accept only draggable items of type "task"
    drop: (item) => onTaskMove(item.taskId, status), // Trigger task move on drop
    collect: (monitor) => ({
      isOver: monitor.isOver(), // Monitor if a draggable item is over this column
    }),
  });

  return (
    <div
      className={`task-column ${isOver ? "hovered" : ""}`} // Add visual feedback when item is over
      ref={drop} // Connect the drop ref
    >
      {/* Column heading (status name) */}
      <h3>{status}</h3>

      {/* List of tasks for this column */}
      <div className="task-list">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onEdit={onEditTask}      // Handle edit action
            onDelete={onDeleteTask}  // Handle delete action
          />
        ))}
      </div>
    </div>
  );
}

export default TaskColumn;
