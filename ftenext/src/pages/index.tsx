import { Inter } from 'next/font/google';
import Layout from '../../components/Layout/Layout';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

const inter = Inter({ subsets: ['latin'] });

const isUserLoggedIn = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  try {
    const decoded = jwt.verify(token, 'secret-key');
    return true;
  } catch (err) {
    console.error('Invalid token', err);
    return false;
  }
};

interface HomePageProps {
}

const HomePage: React.FC<HomePageProps> = ({}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
  }, []);

  if(!isLoggedIn) {
    <Layout pageTitle="HourlyHub">
      <h1>Welcome to HourlyHub. Please log in or register</h1>
    </Layout>
  }

  return (
    <Layout pageTitle="HourlyHub">
      <h1>Welcome to HourlyHub</h1>
    </Layout>
  );
};

export default HomePage;
