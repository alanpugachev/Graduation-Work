import { Inter } from 'next/font/google';
import Layout from '../../../components/Layout/Layout';
import { useEffect, useState } from 'react';
import styles from './Tasks.module.scss';
import Link from 'next/link';

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
      <h3 className={styles.names}>Your tasks: </h3>
      <div className={styles.mainContainer}>
        <div className={styles.tasksContainer}>
          {task?.map((item: { 
            id: number;
            title: string | null | undefined; 
            price: string | null | undefined;
            executionTime: string | null | undefined;
            }) => 
            <div className={styles.tasksBlock}>
              <div className={styles.itemsList}>
                <ul>
                  <p>id {item.id}: {item.title}</p>
                  <p>Execution time: {item.executionTime}</p>
                  <p>Price: {item.price}</p>
                </ul>
              </div>
              {/* <button>Edit</button> */}
              <br />
              <div className={styles.buttons}>
                <button type='button' className={styles.deleteButton} onClick={() => handleRemove(item.id)}>
                  Delete
                </button>
              </div>
            </div>
            )}
        </div>

        <div className={styles.otherButtons}>
          <Link className={styles.addButton} href='/tasks/add-task'>Add Task</Link>
        </div>
      </div>
    </Layout>
  );
};

export default TasksPage;