import { Inter } from 'next/font/google';
import Layout from '../../../../components/Layout/Layout';
import styles from './AddTask.module.scss';
import React, { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

interface TasksPageProps {
}

interface FormData {
  title: string,
  executionTime: string,
  customer: string,
  price: string
}

const TaskCreatingPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    executionTime: '',
    customer: '',
    price: '',
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
      const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
      });
    
      const userContent = await userResponse.json();
      data.customer = userContent.secondName;

      const response = await fetch('http://localhost:8080/db/create', {
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
    <Layout pageTitle="New Tasks">
      <div className={styles.container}>
        <div className={styles.form}>
          <h1>Add new tasks</h1>
          
          {submitStatus === 'success' && <p className={styles.success}>{message}</p>}
          {submitStatus === 'error' && <p className={styles.error}>{message}</p>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.fieldWLabel}>
              <label htmlFor="title" className={styles.formLabel}>Title:</label>
              <br/>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={styles.inputField}
                placeholder='Enter task&apos;s title'
              />
            </div>
            <br/>
            <div className={styles.fieldWLabel}>
              <label htmlFor="executionTime" className={styles.formLabel}>Execution time:</label>
              <br/>
              <input
                type="text"
                id="executionTime"
                name="executionTime"
                value={formData.executionTime}
                onChange={handleChange}
                className={styles.inputField}
                placeholder='Enter execution'
              />
            </div>
            <br/>
            <div className={styles.fieldWLabel}>
              <label htmlFor="price" className={styles.formLabel}>Price:</label>
              <br/>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={styles.inputField}
                placeholder='Enter price'
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

export default TaskCreatingPage;