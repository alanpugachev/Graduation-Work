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
      <div className={styles.form}>
        <form onSubmit={submit}>
          <h1>Login on HourlyHub</h1>

          <input type='email' className={styles.input} placeholder='Email' required
            onChange={e => setEmail(e.target.value)}
          />

          <input type='password' className={styles.input} placeholder='Password' required
            onChange={e => setPassword(e.target.value)}
          />

          <button className={styles.loginButton} type='submit'>Log In</button>
        </form>
      </div>
    </Layout>
  );
};

export default LoginPage;