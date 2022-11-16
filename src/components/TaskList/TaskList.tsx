import { PlusCircle, ClipboardText } from "phosphor-react";
import { ChangeEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Task } from "../Task/Task";

import styles from "./TaskList.module.css";

interface TaskProps {
  id: string;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const tasksQuantity = tasks.length;
  const tasksCompleted = tasks.filter((task) => task.isComplete).length;
  const isNewtaskEmpty = newTaskTitle.length === 0;

  function handleCreateNewTask() {
    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        title: newTaskTitle,
        isComplete: false,
      },
    ]);
    setNewTaskTitle("");
  }

  function onChangeTask(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskTitle(event.target.value);
  }

  function handleDeleteTask(idTask: string) {
    const removeTask = tasks.filter((task) => task.id !== idTask);
    setTasks(removeTask);
  }

  function handleTaskCompleted(taskId: string) {
    const tasksChecked = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isComplete: !task.isComplete,
        };
      }
      return task;
    });

    setTasks(tasksChecked);
  }

  return (
    <div className={styles.taskList}>
      <div className={styles.taskForm}>
        <input
          placeholder="Adicione uma nova tarefa"
          value={newTaskTitle}
          onChange={onChangeTask}
        />

        <button
          type="submit"
          onClick={handleCreateNewTask}
          disabled={isNewtaskEmpty}
        >
          Criar
          <PlusCircle size={20} />
        </button>
      </div>

      <section className={styles.tasks}>
        <header className={styles.header}>
          <div>
            <p>Tarefas Criadas</p>
            <span>{tasksQuantity}</span>
          </div>

          <div>
            <p className={styles.completed}>Concluídas</p>
            <span>
              {tasksCompleted} de {tasksQuantity}
            </span>
          </div>
        </header>

        <div className={tasks.length > 0 ? styles.list : styles.listEmpty}>
          {tasks.length <= 0 && (
            <div className={styles.empty}>
              <div>
                <ClipboardText size={56} opacity={0.3} />
                <p>Você ainda não tem tarefas cadastradas</p>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div>
            </div>
          )}

          {tasks.map((task) => (
            <Task
              id={task.id}
              key={task.id}
              title={task.title}
              isComplete={task.isComplete}
              deleteTask={handleDeleteTask}
              taskCompleted={handleTaskCompleted}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
