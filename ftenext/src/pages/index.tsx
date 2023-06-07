import { Inter } from 'next/font/google';
import Layout from '../../components/Layout/Layout';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './home.module.scss';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

interface HomePageProps {
}

/*interface State {
  email: string;
  password: string;
} */

const HomePage: React.FC<HomePageProps> = ({}) => {
  const [message, setMessage] = useState('');
  const [logged, setLogged] = useState(false);
  const router = useRouter();

  function logout() {
    localStorage.removeItem("token");
    router.push("/");
  }

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
  
          setMessage(`Hi ${content.firstName}!`)
        } catch(e) {
          setMessage('You are not logged in.')
        }
      }
    )();
  })

  return (
    <Layout pageTitle="HourlyHub">
      <div className={styles.mainText}>
        <h1>Welcome to HourlyHub.</h1>
        <h2>This is a service for automating the calculation of the cost of industrial work and accounting for customers. The service allows you to simplify the process of formalizing cooperation relationships and hiring employees for work of varying degrees of complexity.</h2>
        <h2>On our service you can order any work and specify any price. All your orders are displayed in my tasks section. All orders go through moderation by the admins and upon confirmation of the order or to clarify the details, the admins will contact you by mail.</h2>
      </div>
      <div className={styles.container}>
        <p>{message}</p>
        {!logged && 
          <> 
            <p>Now please</p>
            <div className={styles.auth}>
              <a href='/register' className={styles.authButton}>Register</a>
              <p>or</p>
              <a href='/login' className={styles.authButton}>Login</a>
            </div> 
          </>
        }
      </div>
      <br/>
      {/* <a href='/tasks'>My Tasks</a> */}
      {/* <p><button onClick={logout}>Log Out</button></p> */}
    </Layout>
  );
};

export default HomePage;
