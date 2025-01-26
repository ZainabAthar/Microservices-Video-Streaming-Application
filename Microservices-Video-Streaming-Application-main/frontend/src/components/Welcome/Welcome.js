import React from 'react';
import styles from './Welcome.module.css';

const Welcome = () => {
    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                <img src='assetImages/test.png' alt="Home" className={styles.image} />
                <div className={styles.text}>
                    <h1>VIDEO GALLERIA</h1>
                </div>
            </div>
        </div>
        );
};

export default Welcome;
