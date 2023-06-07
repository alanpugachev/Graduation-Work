import React, { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from '../Navbar/Navbar';

import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
  pageTitle: string;
}

const Layout: React.FC<LayoutProps> = ({ children, pageTitle }) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className={styles.bodyContainer}>
        {children}
      </main>
      <footer className={styles.footerContainer}>
        <p>HourlyHub © Amin Astezhev 2023</p>
      </footer>
    </>
  );
};

export default Layout;
