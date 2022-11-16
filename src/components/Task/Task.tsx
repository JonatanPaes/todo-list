import { Trash } from "phosphor-react";

import styles from "./Task.module.css";

interface TaskProps {
  id: string;
  title: string;
  isComplete: boolean;
  deleteTask: (idTask: string) => void;
  taskCompleted: (idTask: string) => void;
}

export function Task({
  title,
  isComplete,
  id,
  deleteTask,
  taskCompleted,
}: TaskProps) {
  return (
    <div className={styles.task}>
      <input
        type="checkbox"
        readOnly
        checked={isComplete}
        onClick={() => taskCompleted(id)}
      />

      <p className={isComplete ? styles.textCompleted : ""}>{title}</p>

      <button onClick={() => deleteTask(id)}>
        <Trash />
      </button>
    </div>
  );
}
