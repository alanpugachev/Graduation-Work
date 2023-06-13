import { Inter } from 'next/font/google';
import Layout from '../../../components/Layout/Layout';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Admin.module.scss';

interface AdminPageProps {
}

const AdminPage: React.FC<AdminPageProps> = ({}) => {
  const [tasks, setTasks] = useState<any>();
  const [users, setUsers] = useState<any>();
  
  const router = useRouter(); 

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

  async function handleTaskEdit() {
    router.push('/admin/edit-task');
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

  async function handleUserEdit() {
    router.push('/admin/edit-user')
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
      <div className={styles.textBlock}>
        <h1>Admin's Page</h1>
        <p>Here You can edit users and their tasks.</p>
        <br />
      </div>

      <h3 className={styles.names}>Tasks: </h3>
      <div className={styles.tasksContainer}>
      {tasks?.map((item: { 
          id: number;
          title: string | null | undefined;
          projectCategory: string | null | undefined;
          projectClass: string | null | undefined; 
          price: string | null | undefined;
          executionTime: string | null | undefined;
          customer: string | null | undefined;
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
            <div className={styles.buttons}>
              <button type='button' className={styles.editButton} onClick={() => handleTaskEdit()}>
                Edit
              </button>
              <br />
              <button type='button' className={styles.deleteButton} onClick={() => handleTaskRemove(item.id)}>
                Delete
              </button>
            </div>
          </div>
          )}
      </div>

      <br />

      <h3 className={styles.names}>Users: </h3>
      <div className={styles.tasksContainer}>
      {users?.map((item: { 
          id: number;
          firstName: string | null | undefined; 
          secondName: string | null | undefined;
          email: string | null | undefined;
          role: string | null | undefined;
          }) => 
          <div className={styles.usersBlock}>
            <div className={styles.itemsList}>
              <ul>
                <p>id: {item.id}. Email: {item.email}</p>
                <p>Name: {item.firstName} {item.secondName}</p>
                <p>Role: {item.role}</p>
              </ul>
            </div>
            <div className={styles.buttons}>
              <button type='button' className={styles.editButton} onClick={() => handleUserEdit()}>
                Edit
              </button>
              <br />
              <button type='button' className={styles.deleteButton} onClick={() => handleUserRemove(item.id)}>
                Delete
              </button>
            </div>
          </div>
          )}
      </div>
    </Layout>
  );
};

export default AdminPage;