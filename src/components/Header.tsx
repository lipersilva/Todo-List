import todoLogo from '../assets/logo.png'
import styles from './Header.module.css'
import { PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, useState } from 'react';

interface Props {
  onAddTask: (taskTitle: string) => void;
}

export function Header({onAddTask}:Props) {
  const [taskTitle, setTaskTitle] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onAddTask(taskTitle);
    setTaskTitle("");
  }

  function onChangeTitle(event: ChangeEvent<HTMLInputElement>){
    setTaskTitle(event.target.value);
  }

  return (
      <header className={styles.header}>
        <img src={todoLogo} />
  
        <form className={styles.newTaskForm} onSubmit={handleSubmit}>
          <input
            placeholder="Adicione uma nova tarefa"
            type="text"
            onChange={onChangeTitle}
            value={taskTitle}
            required
          />
          <button>
            Criar
            <PlusCircle size={20} />
          </button>
        </form>
      </header>
    );
}