import { Inter } from 'next/font/google';
import Layout from '../../../components/Layout/Layout';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Admin.module.scss';

interface AdminPageProps {
}

interface Task {
  id: number,
  title: string,
  executionTime: string,
  customer: string,
  price: string
}

interface User {
  id: number,
  firstName: string,
  secondName: string,
  email: string,
  role: string
}

const AdminPage: React.FC<AdminPageProps> = ({}) => {
  const [tasks, setTasks] = useState<any>();
  const [users, setUsers] = useState<any>();

  async function handleTaskRemove(id: number) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/db/delete/${id}`, {
        method: 'POST'
      });

      const newTasks = tasks.filter((item: {id: number}) => item.id !== id);

      setTasks(newTasks);
    } catch(e) {
      console.log(`Error when deleting task: ${id}`)
    }
  }

  async function handleUserRemove(id: number) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/delete-user/${id}`, {
        method: 'POST'
      });

      const newUsers = users.filter((item: {id: number}) => item.id !== id);

      setUsers(newUsers);
    } catch(e) {
      console.log(`Error when deleting user: ${id}`)
    }
  }

  useEffect(() => {
    (
      async () => {
        try {
          const tasksResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/tasks`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
          });

          const tasksContent = await tasksResponse.json();
          console.log(tasksContent);
          setTasks(tasksContent);



          const usersResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include', 
          });

          const usersContent = await usersResponse.json();
          console.log(usersContent);
          setUsers(usersContent);
        } catch(e) {
          console.log('Error')
        }
      }
    )();
  });

  return (
    <Layout pageTitle='Admin'>
      <h1>Admin's Page</h1>
      <p>Here You can edit users and their tasks.</p>

      <br />

      <h3>Tasks: </h3>
      <div>
      {tasks?.map((item: { 
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
              <h6>{item.id}</h6>
            </ul>
            <button>Edit</button>
            <br />
            <button type='button' onClick={() => handleTaskRemove(item.id)}>
              Delete
            </button>
          </div>
          )}
      </div>

      <br />

      <h3>Users: </h3>
      <div>
      {users?.map((item: { 
          id: number;
          firstName: string | null | undefined; 
          secondName: string | null | undefined;
          email: string | null | undefined;
          role: string | null | undefined;
          }) => 
          <div>
            <ul>
              <h1>{item.email}</h1>
              <h2>{item.firstName} {item.secondName}</h2>
              <h3>{item.role}</h3>
              <h6>{item.id}</h6>
            </ul>
            <button>Edit</button>
            <br />
            <button type='button' onClick={() => handleUserRemove(item.id)}>
              Delete
            </button>
          </div>
          )}
      </div>
    </Layout>
  );
};

export default AdminPage;