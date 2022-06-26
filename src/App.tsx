import { ChangeEvent, FormEvent, InvalidEvent, useMemo, useState } from 'react';
import { FiPlusCircle } from "react-icons/fi";
import { v4 as uuidV4 } from "uuid";

import styles from "./app.module.css";

import clipboardSVG from "./assets/clipboard.svg";

import { Header } from './components/Header';
import { Task } from './components/Task';

interface TaskData {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<TaskData[]>([]);

  function handleChangeNewTask(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");

    setNewTask(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setTasks(oldTasks => {
      return [
        ...oldTasks,
        {
          id: uuidV4(),
          title: newTask,
          isCompleted: false
        }
      ]
    });

    setNewTask("");
  }

  function onInvalidInputTask(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("O campo deve ser preenchido.");
  }

  function handleCompleteTask(taskId: string) {
    const taskIndex = tasks
        .findIndex(task => task.id === taskId);


    tasks[taskIndex].isCompleted = !tasks[taskIndex].isCompleted;

    setTasks([...tasks]);
  }

  function handleDeleteTask(taskId: string) {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasks(newTasks);
  }

  const tasksCountCompleted = useMemo(() => {
    return tasks.filter(task => task.isCompleted === true).length;
  }, [tasks]);

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            className={styles.inputTask} 
            placeholder="Adicione uma nova tarefa"
            value={newTask}
            onChange={handleChangeNewTask}
            onInvalid={onInvalidInputTask}
            required
          />

          <button type="submit">
            Criar
            <FiPlusCircle size={16} />
          </button>
        </form>

        <div className={styles.taskInfos}>
          <div className={styles.createdTaskInfo}>
            <span>Tarefas criadas</span>
            <p>{tasks.length}</p>
          </div>

          <div className={styles.doneTaskInfo}>
            <span>Concluídas</span>
            <p>
              {
                tasks.length < 1
                ? "0"
                : `${tasksCountCompleted} de ${tasks.length}`
              }
            </p>
          </div>
        </div>

        {tasks.length === 0 ? (
          <div className={styles.emptyTasks}>
            <img 
              src={clipboardSVG} 
              alt="Image de uma prancheta indicando conteúdo vazio." 
            />

            <strong>Você ainda não tem tarefas cadastradas</strong>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </div>
        ) : (
          <div className={styles.tasks}>
            {tasks.map((task) => (
              <Task 
                key={task.id} 
                title={task.title}
                isCompleted={task.isCompleted}
                onCompleteTask={() => handleCompleteTask(task.id)}
                onDeleteTask={() => handleDeleteTask(task.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
