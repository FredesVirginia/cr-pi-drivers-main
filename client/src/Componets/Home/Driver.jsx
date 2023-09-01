import React from 'react';
import styles from "./Driver.module.css";
const Driver = (props) => {
    const { id, nombre , teams , imagen , apellido} = props;
    return (
        <div className= {styles.container}>
            
            <h2 className={styles.nombre} > {nombre} {apellido}</h2>
            <img alt="Hola" className={styles.imgGame} src={imagen}/> 
            <h2  className={styles.teams}>Los temas son : {teams}</h2>
        </div>
    );
}

export default Driver;
