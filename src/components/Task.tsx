import styles from './Task.module.css';
import {Trash, CheckCircle} from 'phosphor-react';
import { ITask } from '../App';

interface Props {
  task: ITask;
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}
export function Task({task, onDelete, onToggleComplete}:Props) {
  const isCompleted = true;
  
  return(
    <div className={styles.task}>
      <button className={styles.check} onClick={() => onToggleComplete(task.id)}>
        {task.isCompleted ? <CheckCircle/>  : <div/>}
      </button>
      <p className={task.isCompleted ? styles.textCompleted : ""}>
        {task.title}
      </p>
      <button className={styles.delete} onClick={()=> onDelete(task.id)}>
        <Trash size={20}/> 
      </button>
    </div>
  )
}