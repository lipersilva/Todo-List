import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Tasks } from './components/Tasks'
import './global.css'

export interface ITask {
  id: string;
  title: string;
  isCompleted: boolean;
}

const LOCAL_STORAGE_KEY = 'todoListApp.tasks'

function App() {
  const [tasks, setTasks] = useState<ITask[]>([])

  // Carrega as tarefas do localStorage
  function setTasksAndSave(newTasks: ITask[]) {
    setTasks(newTasks) 
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks))
  }

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }

  useEffect(() => {
    loadSavedTasks()
  },[]);

  function addTask(taskTitle: string) {
    setTasksAndSave([
      ...tasks, 
      {
        id: crypto.randomUUID(),
        title: taskTitle,
        isCompleted: false,
      }
    ]);
  }

  function deleteTaskById(taskId: string) {
    const newTasksDelete = tasks.filter(task => task.id !== taskId);
    setTasksAndSave(newTasksDelete);
  }

  function toggleTaskComplete(taskId: string) {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        }
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  return (
    <>
      <Header onAddTask={addTask}/>
      <Tasks 
        tasks={tasks} 
        onDelete={deleteTaskById}
        onToggleComplete={toggleTaskComplete}  
      />
    </>
  )
}

export default App
