import { Inter } from 'next/font/google';
import Layout from '../../../components/Layout/Layout';
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from 'react';
import styles from './Tasks.module.scss';

interface TasksPageProps {
}

interface Task {
  id: number,
  title: string,
  executionTime: string,
  customer: string,
  price: string
}

const TasksPage: React.FC<TasksPageProps> = ({}) => {
  const [task, setTask] = useState<any>();

  async function handleRemove(id: number) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/db/delete/${id}`, {
        method: 'POST'
      });

      const newTasks = task.filter((item: {id: number}) => item.id !== id);

      setTask(newTasks);
    } catch(e) {
      console.log(`Error when deleting item: ${id}`)
    }
  }

  useEffect(() => {
    (
      async () => {
        try {
          const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
          });
        
          const userContent = await userResponse.json();
        
          const tasksResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/db/task/${userContent.secondName}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
          });

          const tasks = await tasksResponse.json();
          console.log(tasks);

          setTask(tasks);
        } catch(e) {
          console.log('Error')
        }
      }
    )();
  });

  return (
    <Layout pageTitle='My Tasks'>
      <div>
        {task?.map((item: { 
          id: number;
          title: string | null | undefined; 
          price: string | null | undefined;
          executionTime: string | null | undefined;
          }) => 
          <div>
            <ul>
              <h1>{item.title}</h1>
              <h2>{item.executionTime}</h2>
              <h3>{item.price}</h3>
            </ul>
            <button>Edit</button>
            <br />
            <button type='button' onClick={() => handleRemove(item.id)}>
              Delete
            </button>
          </div>
          )}
      </div>

      <div>
        <button type='button'>
          Add Task
        </button>
      </div>
    </Layout>
  );
};

export default TasksPage;