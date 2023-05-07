import { Inter } from 'next/font/google';
import Layout from '../../../components/Layout/Layout';
import styles from './Register.module.scss';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

interface FormData {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  role: string;
}

{ /* interface ResponseData {
  id: number;
  firstName: string;
  secondName: string;
  email: string;
  role: string;
} */ }

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    secondName: '',
    email: '',
    password: '',
    role: '',
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendData = async (data: FormData) => {
    setSubmitStatus('submitting');
    setMessage(null);

    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Server response: ', responseData);
      setSubmitStatus('success');
      setMessage('Form submitted successfully');
    } catch (error) {
      console.error('Error during sending data:', error);
      setSubmitStatus('error');
      setMessage('An error occured while submitting the form');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    sendData(formData);
  };

  return (
    <Layout pageTitle="Register">
      <h1>Register in HourlyHub</h1>
      {submitStatus === 'success' && <p className={styles.success}>{message}</p>}
      {submitStatus === 'error' && <p className={styles.error}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <label htmlFor="secondName">Second Name:</label>
        <input
          type="text"
          id="secondName"
          name="secondName"
          value={formData.secondName}
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <label htmlFor="role">Role:</label>
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        />

        <button type="submit" disabled={submitStatus === 'submitting'}>
          {submitStatus === 'submitting' ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </Layout>
  );
}

export default RegisterPage;
