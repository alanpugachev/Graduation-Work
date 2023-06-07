import { Inter } from 'next/font/google';
import Layout from '../../../components/Layout/Layout';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import styles from './Login.module.scss';
import { SyntheticEvent, useState } from 'react';

interface LoginPageProps {
}

const LoginPage: React.FC<LoginPageProps> = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    await router.push('/');
  }

  return (
    <Layout pageTitle='Login'>
      <div className={styles.container}>
        <div className={styles.form}>
          <h1>Login on HourlyHub</h1>
          <form onSubmit={submit}>

            <div className={styles.fieldWLabel}>
              <label htmlFor="email" className={styles.formLabel}>Email:</label>
              <br />
              <input 
                type='email' 
                className={styles.inputField} 
                placeholder='Email' 
                required
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.fieldWLabel}>
              <label htmlFor="password" className={styles.formLabel}>Password:</label>
              <br />
              <input 
                type='password' 
                className={styles.inputField} 
                placeholder='Password' 
                required
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className={styles.buttonContainer}>
              <button className={styles.formButton} type='submit'>
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;