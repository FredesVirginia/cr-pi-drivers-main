import React from 'react';
import Nav from "../Nav/Nav";
import Driver from "./Driver";
import { getAllDrivers } from '../../Redux/actions';
import  {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from "./DriverContainer.module.css";




const DriverContainer = () => {

    const allDriver = useSelector(state =>state.drivers);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getAllDrivers());
        };
    
        fetchData();
    }, [dispatch]);
    

    console.log("Los driver son ", allDriver.length);
    return (
        <div className={styles.main} >
            <Nav/>
           
            <div className={styles.containerDriver} >
            {allDriver.length > 0 ?allDriver.map((driver , indes)=>{
                return (
                            <Driver
                    key = {driver.id}
                    id= {driver.id}
                    nombre = {driver.nombre}
                    apellido = {driver.apellido}
                    imagen ={driver.imagen}
                    teams = {driver.teams}

                            />
                )
            }) : (<div>Cargando</div>)}
            </div>
        </div>
    );
}

export default DriverContainer;
