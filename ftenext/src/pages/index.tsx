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
  /*const router = useRouter();

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
  } */

  return (
    <Layout pageTitle="HourlyHub">
      <h1>Welcome to HourlyHub</h1>
      <h2>Now please</h2>
      <a href='/register'>Register</a>
      <p>or</p>
      <a href='/login'>Login</a>
      <div className={styles.container}>
      </div>
    </Layout>
  );
};

export default HomePage;
