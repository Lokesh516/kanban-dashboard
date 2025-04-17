import React from "react";
import Task from "./Task";
import { useDrop } from "react-dnd";
import "./TaskColumn.css";

function TaskColumn({ status, tasks, onTaskMove }) {
  const [{ isOver }, drop] = useDrop({
    accept: "task",
    drop: (item) => onTaskMove(item.taskId, status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div className="task-column" ref={drop}>
      <h3>{status}</h3>
      <div className="task-list">
        {tasks.map((task) => (
          <Task key={task.id} task={task} status={status} />
        ))}
      </div>
    </div>
  );
}

export default TaskColumn;
