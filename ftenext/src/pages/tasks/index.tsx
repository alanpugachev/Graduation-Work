import { Inter } from 'next/font/google';
import Layout from '../../../components/Layout/Layout';
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from 'react';
import styles from './Tasks.module.scss';

interface TasksPageProps {
}

const TasksPage: React.FC<TasksPageProps> = ({}) => {
  const [message, setMessage] = useState('');

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
          //setMessage(`${userContent}`);
          console.log(userContent)

          const tasksResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/db/task/${userContent.secondName}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
          });

          const tasksContent = await tasksResponse.json();
          //setMessage(`Tasks: ${tasksContent[0].title}`);
          console.log(tasksContent);

          const listOfTasks = tasksContent.map(
            (element: { title: string; price: string; }) => {
              return (
                <ul>
                  {element.title}
                  {element.price}
                </ul>
              )
            }
          )

          setMessage(`${listOfTasks}`)
        } catch(e) {
          setMessage('There is no tasks to return')
        }
      }
    )();
  });

  return (
    <Layout pageTitle='My Tasks'>
      {message}
    </Layout>
  );
};

export default TasksPage;