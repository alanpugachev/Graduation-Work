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
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchProfile()
  }, []);

  async function fetchProfile() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
    if (res.ok) {
      const json = await res.json()
      setProfile(json)
    } else {
      router.push("/user")
    }
  }

  function logout() {
    localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <Layout pageTitle="User Home Page">
      <div className={styles.container}>
        <p>Signed in as: {profile && profile.firstName && profile.secondName && profile.role}</p>
        <p><button onClick={logout}>Log Out</button></p>
      </div>
    </Layout>
  );
}

export default UserHomePage;