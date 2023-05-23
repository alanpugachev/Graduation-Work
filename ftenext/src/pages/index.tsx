import { Inter } from 'next/font/google';
import Layout from '../../components/Layout/Layout';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './home.module.scss';

const inter = Inter({ subsets: ['latin'] });

interface HomePageProps {
}

/*interface State {
  email: string;
  password: string;
} */

const HomePage: React.FC<HomePageProps> = ({}) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    (
      async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
          });
  
          const content = await response.json();
  
          setMessage(`Hi ${content.firstName}`)
        } catch(e) {
          setMessage('You are not logged in')
        }
      }
    )();
  })

  return (
    <Layout pageTitle="HourlyHub">
      <h1>Welcome to HourlyHub</h1>
      <h2>Now please</h2>
      <a href='/register'>Register</a>
      <p>or</p>
      <a href='/login'>Login</a>
      <div className={styles.container}>
      </div>
      {message}
    </Layout>
  );
};

export default HomePage;
