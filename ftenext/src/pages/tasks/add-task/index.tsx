import { Inter } from 'next/font/google';
import Layout from '../../../../components/Layout/Layout';
import { equivalentsMap, getClassEquivalent, getTermEquivalent } from '../../../../components/WoSequivalents';
import styles from './AddTask.module.scss';
import React, { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

interface TasksPageProps {
}

interface FormData {
  title: string,
  projectCategory: string,
  projectClass: string,
  executionTime: string,
  customer: string,
  price: string
}

const TaskCreatingPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    projectCategory: '',
    projectClass: '',
    executionTime: '',
    customer: '',
    price: '',
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const [price, setPrice] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function calculatePrice() {
    const projectClassPrice = getClassEquivalent(formData.projectClass);
    const projectTermPrice = getTermEquivalent(formData.projectCategory);
    const projectHours = parseInt(formData.executionTime.replace(/\D/g, ""));

    if (projectClassPrice !== undefined && projectTermPrice !== undefined) {
      const price = Number((projectTermPrice * projectClassPrice * 0.3 * projectHours).toFixed(2));
      setPrice(price);
      formData.price = price.toString();
    }
    else {
      setPrice(0);
    }
  }

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
          <h1>Add new task</h1>
          
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
              <label htmlFor="projectCategory" className={styles.formLabel}>project category:</label>
              <br />
              <select 
                name="projectCategory" 
                id="projectCategory"
                value={formData.projectCategory}
                onChange={handleChange}
                className={styles.selectField}
                >
                <option value="longTerm">Long-term</option>
                <option value="shortTerm">Short-term</option>
              </select>
            </div>
            <br />
            <div className={styles.fieldWLabel}>
              <label htmlFor="projectClass" className={styles.formLabel}>project class:</label>
              <br />
              <select 
                name="projectClass" 
                id="projectClass"
                value={formData.projectClass}
                onChange={handleChange}
                className={styles.selectField}
                >
                <option value="QL">LOGIC (QL)</option>
                <option value="PO">MATHEMATICS, INTERDISCIPLINARY APPLICATIONS (PO)</option>
                <option value="PQ">MATHEMATICS (PQ)</option>
                <option value="UR">PHYSICS, MATHEMATICAL (UR)</option>
                <option value="PN">MATHEMATICS, APPLIED  (PN)</option>
                <option value="XY">STATISTICS & PROBABILITY (XN)</option>
                <option value="ET">COMPUTER SCIENCE, INFORMATION SYSTEMS (ET)</option>
                <option value="EP">COMPUTER SCIENCE, ARTIFICIAL INTELLIGENCE (EP)</option>
                <option value="ER">COMPUTER SCIENCE, CYBERNETICS (ER)</option>
                <option value="EV">COMPUTER SCIENCE, INTERDISCIPLINARY APPLICATIONS (EV)</option>
                <option value="EW">COMPUTER SCIENCE, SOFTWARE ENGINEERING (EW)</option>
                <option value="EX">COMPUTER SCIENCE, THEORY & METHODS (EX)</option>
                <option value="AA">ACOUSTICS (AA)</option>
                <option value="BU">ASTRONOMY & ASTROPHYSICS (BU)</option>
                <option value="UH">PHYSICS, ATOMIC, MOLECULAR & CHEMICAL (UH)</option>
                <option value="SY">OPTICS (SY)</option>
                <option value="UB">PHYSICS, APPLIED (UB)</option>
                <option value="UI">PHYSICS, MULTIDISCIPLINARY (UI)</option>
                <option value="UF">PHYSICS, FLUIDS & PLASMAS (UF)</option>
                <option value="UK">PHYSICS, CONDENSED MATTER (UK)</option>
                <option value="UP">PHYSICS, PARTICLES & FIELDS (UP)</option>
                <option value="UN">PHYSICS, NUCLEAR (UN)</option>
                <option value="EA">CHEMISTRY, ANALYTICAL (EA)</option>
                <option value="FI">CRYSTALLOGRAPHY (FI)</option>
                <option value="EC">CHEMISTRY, INORGANIC & NUCLEAR (EC)</option>
                <option value="EE">CHEMISTRY, ORGANIC (EE)</option>
                <option value="UY">POLYMER SCIENCE (UY)</option>
                <option value="DW">CHEMISTRY, APPLIED (DW)</option>
                <option value="EI">CHEMISTRY, PHYSICAL (EI)</option>
                <option value="DY">CHEMISTRY, MULTIDISCIPLINARY (DY)</option>
                <option value="HQ">ELECTROCHEMISTRY (HQ)</option>
              </select>
            </div>
            <br />
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
              <button type="button" onClick={calculatePrice}>calculate price</button>
              <label htmlFor="price" className={styles.formLabel}>Price: {price} CV</label>
              {/* <br/>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={styles.inputField}
                placeholder='Enter price'
              /> */}
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