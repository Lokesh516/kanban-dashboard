import React from "react";
import { useDrag } from "react-dnd";
import "./Task.css";

function Task({ task, status }) {
  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: { taskId: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="task"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="task-title">{task.title}</div>
      {task.description && <div className="task-desc">{task.description}</div>}
    </div>
  );
}

export default Task;
