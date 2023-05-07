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
      <div className={styles.container}>
        <div className={styles.form}>
          <h1>Register in HourlyHub</h1>
          
          {submitStatus === 'success' && <p className={styles.success}>{message}</p>}
          {submitStatus === 'error' && <p className={styles.error}>{message}</p>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.fieldWLabel}>
              <label htmlFor="firstName" className={styles.formLabel}>First Name:</label>
              <br/>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={styles.inputField}
                placeholder='Enter your fisrt name'
              />
            </div>
            <br/>
            <div className={styles.fieldWLabel}>
              <label htmlFor="secondName" className={styles.formLabel}>Second Name:</label>
              <br/>
              <input
                type="text"
                id="secondName"
                name="secondName"
                value={formData.secondName}
                onChange={handleChange}
                className={styles.inputField}
                placeholder='Enter your second name'
              />
            </div>
            <br/>
            <div className={styles.fieldWLabel}>
              <label htmlFor="email" className={styles.formLabel}>Email:</label>
              <br/>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.inputField}
                placeholder='Enter your email'
              />
            </div>
            <br/>
            <div className={styles.fieldWLabel}>
              <label htmlFor="password" className={styles.formLabel}>Password:</label>
              <br/>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.inputField}
                placeholder='Enter your password'
              />
            </div>
            <br/>
            <div className={styles.fieldWLabel}>
              <label htmlFor="role" className={styles.formLabel}>Role:</label>
              <br/>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={styles.inputField}
                placeholder='Enter your role'
              />
            </div>
            <br/>
            <div className={styles.buttonContainer}>
              <button className={styles.formButton} type="submit" disabled={submitStatus === 'submitting'}>
                {submitStatus === 'submitting' ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default RegisterPage;
