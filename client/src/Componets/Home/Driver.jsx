import React from 'react';
import styles from "./Driver.module.css";
import {Link} from 'react-router-dom';
const Driver = (props) => {
    const { id, nombre , teams , imagen , apellido} = props;
    return (
        <div className= {styles.container}>
            
             <div className={styles.divH}>
                <h2 className={styles.nombre} > {nombre} {apellido}</h2>
             </div>
            <img alt="Hola" className={styles.imgGame} src={imagen}/> 
            <h2 className={styles.teams}>Teams</h2>
            <h2  className={styles.teams}> {teams}</h2>
             <Link to={`/drivers/${id}`}  className={styles.teams} >Ver Mas</Link>
        </div>
    );
}

export default Driver;
