import React from 'react';
import styles from "./Loading.module.css";

const Loading = () => {
    return (
        
       <div className={styles.body}>
         <div className={styles.container} >
        <div className={styles.loop}>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
        </div>
    </div>
      <p className={styles.p}>Cargando ...</p>
       </div>
    );
}

export default Loading;
