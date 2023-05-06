import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.scss';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.links}>
        <Link href="/" className={styles.item}>
          Home
        </Link>
        <Link href="/register" className={styles.item}>
          Log In
        </Link>
        <Link href="/admin" className={styles.item}>
          For Admins
        </Link>
      </div>
      <div className={styles.iconContainer}>
        <span className={styles.hhub}>HHUB</span>
      </div>
    </nav>
  );
};

export default Navbar;
