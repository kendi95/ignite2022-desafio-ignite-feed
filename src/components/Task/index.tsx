import { ChangeEvent, FC } from "react";
import { FiTrash2 } from "react-icons/fi";

import styles from "./styles.module.css";

interface Props {
  title: string;
  isCompleted: boolean;
  onCompleteTask: () => void;
  onDeleteTask: () => void;
}

export const Task: FC<Props> = ({ 
  title, 
  isCompleted, 
  onDeleteTask,
  onCompleteTask
}) => {

  function handleCheckTask(event: ChangeEvent<HTMLInputElement>) {
    onCompleteTask();
  }

  return (
    <div 
      className={styles.task}
    >
      <div className={styles.content}>
        <input 
          type="checkbox"
          name="check"
          checked={isCompleted}
          onChange={handleCheckTask} 
        />

        <span 
          className={
            !isCompleted
            ? styles.contentNoChecked
            : styles.contentChecked
          }
        >
          {title}
        </span>
      </div>

      <button onClick={onDeleteTask}>
        <FiTrash2 size={24} />
      </button>
    </div>
  )

}