import { Inter } from 'next/font/google';
import Layout from '../../../../components/Layout/Layout';
import styles from './EditUser.module.scss';
import React, { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

interface UserEditPageProps {
}

interface FormData {
  id: number
  firstName: string,
  secondName: string,
  role: string,
  email: string
}

const UserEditPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    id: 0,
    firstName: '',
    secondName: '',
    role: '',
    email: '',
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendData = async (data: FormData) => {
    setSubmitStatus('submitting');
    setMessage(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/edit-user/${data.id}`, {
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
    <Layout pageTitle='Edit User'>
      <div className={styles.container}>
        <div className={styles.form}>
          <h1>Edit user</h1>
          
          {submitStatus === 'success' && <p className={styles.success}>{message}</p>}
          {submitStatus === 'error' && <p className={styles.error}>{message}</p>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.fieldWLabel}>
              <label htmlFor="id" className={styles.formLabel}>Id:</label>
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
              <label htmlFor="firstName" className={styles.formLabel}>First Name:</label>
              <br/>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={styles.inputField}
                placeholder='Enter user&apos;s first name'
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
                placeholder='Enter second name'
              />
            </div>
            <br/>
            <div className={styles.fieldWLabel}>
              <label htmlFor="role" className={styles.formLabel}>Role:</label>
              <br/>
              <select 
                name="role" 
                id="role"
                value={formData.role}
                onChange={handleChange}
                className={styles.selectField}
                >
                <option value="admin">admin</option>
                <option value="user">user</option>
              </select>
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
                placeholder='Enter email'
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

export default UserEditPage;