import React from 'react';
import Nav from "../Nav/Nav";
import Driver from "./Driver";
import { getAllDrivers } from '../../Redux/actions';
import  {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../Loading/Loading';
import Paginator from '../Paginator/Paginator';
import styles from "./DriverContainer.module.css";




const DriverContainer = () => {
    const actualPage = useSelector(state=>state.actualPage);
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
        

        <div className={styles.divo} >
            <Nav/>
            <div className={styles.containerDriver} >
            {allDriver.length > 0 ? allDriver.map((driver, index) =>{
// Se crea un CardCountry por cada country en el state. Si es la pagina 1, solo muestra 9 countries
if(actualPage === 1 & index <9){
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
            }
else if(actualPage !== 1 && index >= ((actualPage-1)*9)-1 && (index < (actualPage*9)-1)){
  // Se crea un CardCountry por cada country en el state. Si no es la pagina 1, muestra 10 countries
  return ( <Driver
                    key = {driver.id}
                    id= {driver.id}
                    nombre = {driver.nombre}
                    apellido = {driver.apellido}
                    imagen ={driver.imagen}
                    teams = {driver.teams}

                            />)
              }
             }): <Loading />}
            </div>



             <div className={styles.divP}>
                    <Paginator driverLenght={allDriver.length}/>
             </div>
           
           
           
        </div>
    );
}

export default DriverContainer;
