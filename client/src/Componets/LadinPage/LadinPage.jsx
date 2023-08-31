import React from 'react';
import styles from './LadinPage.module.css';
import { Link } from 'react-router-dom';
const LadinPage = () => {
    return (
        <div className={styles.lading}>
            
         <div className={styles.container}>
          <h2>Speed Race Api</h2>
          <p>   Nuestra API te brinda acceso instantáneo a datos cruciales de las carreras de automóviles. 
          Explora información en tiempo real sobre  pilotos, equipos y circuitos.  </p>
        </div>
        <div className={styles.container2}>
          <Link  className={styles.link}  to= "/drivers/" > Comenzar ! </Link>
        </div>
        </div>
    );
}

export default LadinPage;
