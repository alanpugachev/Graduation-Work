import Head from 'next/head'
import { Inter } from 'next/font/google'

import Layout from '../../components/Layout/Layout';

const inter = Inter({ subsets: ['latin'] })

const HomePage: React.FC = () => {
  return (
    <Layout pageTitle="HourlyHub">
      <h1>Welcome to HourlyHub</h1>
      <h2></h2>
    </Layout>
  );
};

export default HomePage;

