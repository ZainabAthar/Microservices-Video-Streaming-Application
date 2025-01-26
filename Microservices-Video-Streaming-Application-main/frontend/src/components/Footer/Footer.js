// Footer.js

import React from "react";
import styles from './Footer.module.css';
 
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div >
        <div className={styles.copyright}>
          Copyright &copy; 2024 <span>CLoud Project</span>
        </div>
      </div>
    </footer>
  );
}