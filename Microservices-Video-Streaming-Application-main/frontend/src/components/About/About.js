import React from 'react';
import styles from './About.module.css'; // Import the CSS module
import { useNavigate } from "react-router-dom";


const About = () => {
    const navigate = useNavigate();



    return (

        <>

            <div className={styles.wrapper}>
            <h1
                style={{
                    margin: '.5rem 2rem',
                    padding: '.5rem 2rem',
                    color: 'white',
                    // fontSize: '4rem
                }}
            >Project Description</h1>
            <div className={styles['about-section']}>
                <div className={styles['about-content']}>
                    <p>
                      Video Streaming Platform deployed on GCP     </p>
                  
                </div>
                <div className={styles['about-image']}>
                    <img src="assetImages/about.jpeg" alt="About Us" style={{
                    }} />
                </div>
            </div>

            </div>
        </>
    );
};

export default About;
