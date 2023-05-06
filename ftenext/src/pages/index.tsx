import { Inter } from 'next/font/google';
import Layout from '../../components/Layout/Layout';

const inter = Inter({ subsets: ['latin'] });

interface HomePageProps {
}

const HomePage: React.FC<HomePageProps> = ({}) => {
  return (
    <Layout pageTitle="HourlyHub">
      <h1>Welcome to HourlyHub</h1>
      <p>If you are not authorized, please log in to your account</p>
    </Layout>
  );
};

export default HomePage;
