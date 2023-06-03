import { Inter } from 'next/font/google';
import Layout from '../../../../components/Layout/Layout';
import styles from './EditTask.module.scss';
import React, { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

interface TaskEditPageProps {
}

interface FormData {
  id: number
  title: string,
  executionTime: string,
  customer: string,
  price: string
}

const TaskEditPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    id: 0,
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/db/update/${data.id}`, {
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

    } catch(e) {
      console.error('Error during sending data:', e);
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
    <Layout pageTitle='Edit Task'>
      <div className={styles.container}>
        <div className={styles.form}>
          <h1>Edit task</h1>
          
          {submitStatus === 'success' && <p className={styles.success}>{message}</p>}
          {submitStatus === 'error' && <p className={styles.error}>{message}</p>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.fieldWLabel}>
              <label htmlFor="title" className={styles.formLabel}>Id:</label>
              <br/>
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className={styles.inputField}
                placeholder='Enter task&apos;s id'
              />
            </div>
            <br/>
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
              <label htmlFor="customer" className={styles.formLabel}>Customer:</label>
              <br/>
              <input
                type="text"
                id="customer"
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                className={styles.inputField}
                placeholder='Enter customer'
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
};

export default TaskEditPage;