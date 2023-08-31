import React  , {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import styles from "./Nav.module.css";
import {Link} from "react-router-dom";

const Nav = () => {

  

    return (
        <div className={styles.divSearch}>
        
            <div className={styles.divTemperaments}>
            <label> Filtrar por </label>
            <div className={styles.select} >
                <label>Plataforma</label>
                  <select className={styles.divTemperamentsSelect}   >
                    
                    <option className={styles.divTemperamentsSelectOption} value="inicio">--Seleccione--</option>
                    
                  </select>

                
                <label className={styles.labelOrigen}>Genero</label>
                  <select className={styles.divTemperamentsSelect2}  >
                    
                    <option className={styles.divTemperamentsSelectOption} value="inicio">--Seleccione--</option>
                    
                  </select>
            </div>
            
            </div>
            
            <div className={styles.divBreed}>
            
            <Link to="/" className={styles.formLink} > The Game Zone </Link>
            <input className={styles.buscar}  type="text"   placeholder="Look For Driver 🐶" /> 
            
            </div>

            <div className={styles.divCreate}>
            <Link  className={styles.breed}  to="/createVideogame"> Create Videogames </Link>
            <label> Ordenar por </label>
            <select  className={styles.order}  >
              <option value="inicio">--Seleccione--</option>
              <option value = "asc"  >A-Z</option>
              <option value = "dess" >Z-A</option>
              <option value = "gameApi" >Videogames Api</option>
              <option value = "gameBBDD" >Videogames BBDD</option>
              <option value = "ratingMin">  Rating Min</option>
              <option value = "ratingMax">  Rating Max</option>
             
            </select>
            </div>
          
         </div>
    );
}

export default Nav;
