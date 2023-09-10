import React  , {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { getAllTeams , getDriverforTeams , getAllDrivers , getForNameDrivers , menorEdad , mayorEdad} from "../../Redux/actions";

import styles from "./Nav.module.css";
import {Link} from "react-router-dom";

const Nav = () => {
 const dispatch = useDispatch();
 const allTeams = useSelector( state => state.teams);
 const allDrivers = useSelector (state => state.drivers);
 const [teams , setTeams] = useState(" ");
 const [cambio , setCambio] = useState(" ");
 const [nombre , setNombre] = useState("");
  const [order, setOrder] = useState(" ");

  
 useEffect(() => {
  const fetchData = async () => {
        if (teams !== " ") {
          await dispatch(getDriverforTeams(teams));
        }
        
        if(teams ==="inicio") {
         await dispatch(getAllDrivers());
          
          
        }
        // Aquí puedes enviar toda la información al componente
     };

      fetchData();
    }, [dispatch, teams]);

      useEffect(() => {
        
          // Aquí puedes enviar toda la información al componente
        dispatch(getAllTeams());
      
      }, [dispatch]);

      useEffect(() => {
        if (order === "inicio"){
          dispatch(getAllDrivers());
        }
        if(order ==="ascFechaNacimiento"){
            dispatch(mayorEdad())
        }
        if(order === "desFechaNacimiento"){
          dispatch(menorEdad(allDrivers))
        }

        
     }, [dispatch , order , allDrivers]);


        function handleChange(e){
              
              e.preventDefault();
                setNombre(e.target.value);
                dispatch(getForNameDrivers(e.target.value));
                setNombre ("");
            }

       



    return (
        <div className={styles.divSearch}>
        
            <div className={styles.divTemperaments}>
            <label> Filtrar por </label>
            <div className={styles.select} >
               

                
                <label className={styles.labelOrigen}>Equipos</label>
                  <select className={styles.divTemperamentsSelect2} onChange={(e) => setTeams(e.target.value) } >
                    
                    <option className={styles.divTemperamentsSelectOption} value="inicio">--Seleccione--</option>
                    <option className={styles.divTemperamentsSelectOption} value="inicio">--INICIO--</option>
                    {allTeams.length > 0 ? allTeams.map((t) => {
                            return <option  className={styles.divTemperamentsSelectOption} key ={t.id}value={t.nombre} onChange={() => setCambio("inicio") }>{t.nombre} </option>
                            })
                            : 
                    <option>---</option>
                    }
                  </select>
            </div>
            
            </div>
            
            <div className={styles.divBreed}>
            
            <Link to="/" className={styles.formLink} > Drivers </Link>
            <input className={styles.buscar}  type="text" onChange={ handleChange}  placeholder="Look For Driver " /> 
            
            </div>

            <div className={styles.divCreate}>
            <Link  className={styles.breed}  to="/createDriver"> Crear corredor</Link>
                <div className={styles.divOr} >
                 <h3>Ordenar</h3>
                      <select  className={styles.order} onChange={ (e) => setOrder(e.target.value) }  >
                        <option value="inicio">--Seleccione--</option>
                        <option  value="inicio">--INICIO--</option>
                        <option value = "desFechaNacimiento"  >Menor Edad</option>
                        <option value = "ascFechaNacimiento" >Mayor Edad</option>
                        <option value = "driverApi" >Corredores Api</option>
                        <option value = "driverBBDD" >Corredores BBDD</option>
                      
                      
                      </select>
                </div>
              

            </div>
          
         </div>
    );
}

export default Nav;
