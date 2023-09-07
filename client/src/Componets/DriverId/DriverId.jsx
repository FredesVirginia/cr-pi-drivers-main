import React from 'react';
import styles from "./DriverId.module.css";
import  {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useParams, Link } from 'react-router-dom';
import { getDriverForID } from '../../Redux/actions';
import Loading from "../Loading/Loading";
const DriverId = () => {
    let driverDetail = useSelector(state => state.driverId);
    const {id} = useParams();
    const dispatch = useDispatch(); 
    useEffect(() => {
     dispatch(getDriverForID(id))
    }, [dispatch , id]);
    console.log("El id del driver es " , id);
    

    
    return (
        <div className = {styles.containerD}>
           <nav> 
           <Link  className={styles.liik} to="/drivers"> Volver a Inicio </Link>
         </nav>
        {driverDetail.nombre ? (
            <div className={styles.id}>
                <div>
                    <img alt={driverDetail.nombre} src={driverDetail.imagen} className={styles.img} />
                </div>
                <div className= {styles.des}>
                    <h2>{driverDetail.nombre} {driverDetail.apellido}  </h2>
                    <p className= {styles.desPi}>Fecha de Nacimiento</p>
                    <p> {driverDetail.fechaNacimiento}</p>
                    <p className= {styles.desPi}> Nacionalidad</p>
                    <p> {driverDetail.nacionalidad}</p>
                    <p className= {styles.desPi}> Descripcion</p>
                    <p> {driverDetail.descripcion}</p>
                    <p className= {styles.desPi}> Equipos</p>
                    <p> {driverDetail.teams }</p>

                </div>
            </div>
        ) : (
            <div className={styles.dh1}>
               <h1 className={styles.waveAnimation} >Cargando 🚀...</h1>
               </div>
        )}
        </div>
    );
}

export default DriverId;
