import { Inter } from 'next/font/google';
import Layout from '../../../components/Layout/Layout';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

interface Data {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  role: string;
}

interface ResponseData {
  id: number;
  firstName: string;
  secondName: string;
  email: string;
  role: string;
}

const LoginPage: React.FC = () => {
  const [responseData, setResponseData] = useState<ResponseData | null>(null);

  
  async function sendPostRequest(): Promise<void> {
    const url = 'http://localhost:8080/register'
    const data: Data = {
      firstName: 'Kostick',
      secondName: 'Rogacheff',
      email: 'kostenrogacheff@gmail.com',
      password: '5566',
      role: 'admin'
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('HTTP error: ${response.status}');
      }

      const responseData: ResponseData = await response.json();
      setResponseData(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    sendPostRequest();
  }, []);

  return (
    <Layout pageTitle="HourlyHub">
      <h1>Logged in HourlyHub</h1>
      {responseData ? (
        <div>
          <p> First Name: {responseData.firstName}</p>
          <p> Second Name: {responseData.secondName}</p>
          <p> Email: {responseData.email}</p>
          <p> Role: {responseData.role}</p>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </Layout>
  );
}

export default LoginPage;
