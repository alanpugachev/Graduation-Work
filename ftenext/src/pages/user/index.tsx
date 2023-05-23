import { Inter } from 'next/font/google';
import Layout from '../../../components/Layout/Layout';
import styles from './User.module.scss';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Profile {
  firstName: string;
  secondName: string;
  role: string;
}

interface UserHomePageProps {
  children: ReactNode;
}

const UserHomePage: React.FC<UserHomePageProps> = (props) => {
  const router = useRouter();

  async function getData() {
    const res = await fetch('http://localhost:8080/user');
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  }

  function logout() {
    localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <Layout pageTitle="User Home Page">
      <div className={styles.container}>
        <p><button onClick={logout}>Log Out</button></p>
      </div>
    </Layout>
  );
}

export default UserHomePage;