import { Inter } from 'next/font/google';
import Layout from '../../../components/Layout/Layout';
import { useState } from 'react';
import styles from './Tasks.module.scss';

interface TasksPageProps {
}

const TasksPage: React.FC<TasksPageProps> = ({ tasks }) => {
  return (
    <Layout pageTitle='My Tasks'>
      
    </Layout>
  );
};

export const getStaticProps = async (context: any) => {
  const [message, setMessage] = useState('');

  async () => {
    try {
      const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
      });

      const userContent = await userResponse.json();
      //setMessage(`${userContent}`);
      console.log(userContent)

      const tasksResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/db/task/${userContent.secondName}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
      });

      const tasks = await tasksResponse.json();
      console.log(tasks);

      return {
        props: {
          tasks,
        },
      };
    } catch(e) {
      setMessage('There is no tasks to return')
    }
  }
}

export default TasksPage;