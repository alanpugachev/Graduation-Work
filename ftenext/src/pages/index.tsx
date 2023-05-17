import { Inter } from 'next/font/google';
import Layout from '../../components/Layout/Layout';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './home.module.scss';

const inter = Inter({ subsets: ['latin'] });

interface HomePageProps {
}

interface State {
  email: string;
  password: string;
}

const HomePage: React.FC<HomePageProps> = ({}) => {
  const router = useRouter();

  const [state, setState] = useState<State>({
    email: "",
    password: ""
  })

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  }
  
  async function handleSubmit() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      body: JSON.stringify(state),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (res.ok) {
      const json = await res.json()
      localStorage.setItem("token", json.token)
      router.push("/user")
    } else {
      alert("Bad credentials")
    }
  }

  return (
    <Layout pageTitle="HourlyHub">
      <h1>Welcome to HourlyHub</h1>

      <div className={styles.container}>
        <h1 className={styles.title}>Sign In</h1>
        <div className={styles.form}>
          <input className={styles.input} type="text" name="email" placeholder="email" value={state.email} onChange={handleChange} />
          <input className={styles.input} type="password" name="password" placeholder="password" value={state.password} onChange={handleChange} />
          <button className={styles.btn} onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
