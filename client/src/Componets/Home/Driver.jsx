import React from 'react';
import styles from "./Driver.module.css";
import {Link} from 'react-router-dom';
import {deleteDriver} from "../../Redux/actions";
import {useDispatch} from 'react-redux';
const Driver = (props) => {
    const { id, nombre , teams , imagen , apellido} = props;
    const dispatch = useDispatch();
    const handleDelete= ()=>{
        dispatch(deleteDriver(id));
    }
    return (
        <div className= {styles.container}>
                  <div className={styles.cerrar}> <button className={styles.button}  onClick={handleDelete} > ✖️</button> </div>
             <div className={styles.divH}>
                <h2 className={styles.nombre} > {nombre} {apellido}</h2>
             </div>
            <img alt="Hola" className={styles.imgGame} src={imagen}/> 
            <h2 className={styles.teams}>Teams</h2>
            <h2  className={styles.teams}> {teams}</h2>
             <Link to={`/drivers/${id}`}  className={styles.teams} > Ver Mas</Link>
             <Link to={`/drivers/editar/${id}`}  className={styles.teams} >Actualizar</Link>
        </div>
    );
}

export default Driver;
