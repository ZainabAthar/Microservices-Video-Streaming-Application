import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import styles from './HomeCards.module.css'


export default function HomeCards() {
    return (
        <div style={{ margin: '2rem', padding: '1rem', color: '#fff' }}>

            <h1 className={styles.homeCardsTitle}>Developers</h1>
            
            <CardGroup>
                <Card className={styles.card}>
                    <Card.Img variant="top" src="assetImages/abc.jpg" className={styles.cardImages}/>
                    <Card.Body>
                        <Card.Title>Navaal Iqbal</Card.Title>
                        <Card.Text>
                           Senior Developer  </Card.Text>
                    </Card.Body>
                </Card >
                <Card className={styles.card}>
                    <Card.Img variant="top" src="assetImages/abc.jpg" className={styles.cardImages}/>
                    <Card.Body>
                        <Card.Title>Ayesha Siddiqa</Card.Title>
                        <Card.Text>
                       Cloud Champ </Card.Text>
                    </Card.Body>
                </Card>
                <Card className={styles.card}>
                    <Card.Img variant="top" src="assetImages/abc.jpg" className={styles.cardImages}/>
                    <Card.Body>
                        <Card.Title>Amna Ahmed</Card.Title>
                        <Card.Text>
                        Front end Dino</Card.Text>
                    </Card.Body>
                </Card>
                <Card className={styles.card}>
                    <Card.Img variant="top" src="assetImages/abc.jpg" className={styles.cardImages}/>
                    <Card.Body>
                        <Card.Title>Zainab Athar</Card.Title>
                        <Card.Text>
                        DevOps eng</Card.Text>
                    </Card.Body>
                </Card>
            </CardGroup>
        </div>
    );
}