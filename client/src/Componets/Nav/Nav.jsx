import React  , {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { getAllTeams , getDriverforTeams , getAllDrivers , getForNameDrivers} from "../../Redux/actions";

import styles from "./Nav.module.css";
import {Link} from "react-router-dom";

const Nav = () => {
 const dispatch = useDispatch();
 const allTeams = useSelector( state => state.teams);
 const [teams , setTeams] = useState(" ");
 const [cambio , setCambio] = useState(" ");
 const [nombre , setNombre] = useState("");
 console.log("Los teams son " , allTeams.length);
  
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
            <Link  className={styles.breed}  to="/createVideogame"> Crear corredor</Link>
            <label> Ordenar por </label>
            <select  className={styles.order}  >
              <option value="inicio">--Seleccione--</option>
              <option value = "asc"  >A-Z</option>
              <option value = "dess" >Z-A</option>
              <option value = "gameApi" >Corredores Api</option>
              <option value = "gameBBDD" >Corredores BBDD</option>
             
             
            </select>
            </div>
          
         </div>
    );
}

export default Nav;
