import { Inter } from 'next/font/google';
import Layout from '../../../components/Layout/Layout';
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from 'react';
import styles from './Tasks.module.scss';

interface TasksPageProps {
}

interface Task {
  id: number,
  title: string,
  execution_time: string,
  customer: string,
  price: string
}

interface TasksArray {
  tasksArr: Array<Task>
}

const TasksPage: React.FC<TasksPageProps> = ({}) => {
  const [task, setTask] = useState<any>();

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
      <h3>
        {task?.map((item: { title: string | null | undefined; }) => <div>{item.title}</div>)}
      </h3>
    </Layout>
  );
};

export default TasksPage;