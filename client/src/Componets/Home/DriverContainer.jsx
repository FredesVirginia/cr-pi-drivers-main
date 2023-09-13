import React  , {useState}from 'react';
import Nav from "../Nav/Nav";
import Driver from "./Driver";
import { getAllDrivers  , driverFound} from '../../Redux/actions';
import  {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../Loading/Loading';
import Paginator from '../Paginator/Paginator';
import styles from "./DriverContainer.module.css";




const DriverContainer = () => {
    const actualPage = useSelector(state=>state.actualPage);
    const allDriver = useSelector(state =>state.drivers);
    const [showAlert, setShowAlert] = useState(false);
    const driverNotFound = useSelector((state) => state.driverNootFound);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getAllDrivers());
        };
    
        fetchData();
    }, [dispatch]);

    const handleClick = ()=>{
        dispatch(driverFound());
       
    }
    

  
    return (
        

        <div className={styles.divo}>
        <Nav />
        <div className={styles.containerDriver}>
          {driverNotFound === true? (
            <div>
                 <p>No se encontraron conductores con ese nombre.</p>
                <button onClick={handleClick}>Volver al Inicio</button>
            </div>
          ) : allDriver.length > 0 ? (
            allDriver.map((driver, index) => {
              if (actualPage === 1 && index < 9) {
                return (
                  <Driver
                    key={driver.id}
                    id={driver.id}
                    nombre={driver.nombre}
                    apellido={driver.apellido}
                    imagen={driver.imagen}
                    teams={driver.teams}
                  />
                );
              } else if (
                actualPage !== 1 &&
                index >= (actualPage - 1) * 9 - 1 &&
                index < actualPage * 9 - 1
              ) {
                return (
                  <Driver
                    key={driver.id}
                    id={driver.id}
                    nombre={driver.nombre}
                    apellido={driver.apellido}
                    imagen={driver.imagen}
                    teams={driver.teams}
                  />
                );
              }
            })
          ) : (
            <Loading />
          )}
        </div>
        <div className={styles.divP}>
          <Paginator driverLength={allDriver.length} />
        </div>
      </div>
    );
}

export default DriverContainer;
