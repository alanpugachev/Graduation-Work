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
  projectCategory: string,
  projectClass: string,
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
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <div className={styles.tasksContainer}>
            {task?.map((item: { 
              id: number;
              title: string | null | undefined;
              projectCategory: string | null | undefined;
              projectClass: string | null | undefined;
              price: string | null | undefined;
              executionTime: string | null | undefined;
              }) => 
              <div className={styles.tasksBlock}>
                <div className={styles.itemsList}>
                  <ul>
                    <p>id {item.id}: {item.title}</p>
                    <p>Execution time: {item.executionTime}</p>
                    <p>Project category: {item.projectCategory}</p>
                    <p>Project class: {item.projectClass}</p>
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

          <div>
            <Link href={'/tasks/add-task'}>
              <button className={styles.addButton}>Add task</button>
            </Link>
          </div>
        </div>


        <div className={styles.textContainer}>
          <div className={styles.rightTextBlock}>
            <div className={styles.block}>
              <p>
                Here You can add and watch all your tasks.
              </p>
              <p>
                The prices are formed according to the chosen task and it's complexity.
              </p>
              <p>
                Tasks can only be edited by administrators, but you can cancel (delete) them.
              </p>
              <p>
                If no tasks are displayed on the site, then you have not added them. If you have added a task but it is not displayed on the site, please contact support.
              </p>
            </div>
          </div>

          <Link href={''}>
            <button className={styles.contactButton}>Contact support</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default TasksPage;