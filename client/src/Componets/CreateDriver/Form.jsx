import React from 'react';
import styles from "./Form.module.css"
import { useState , useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {getAllTeams  , createDriver} from "../../Redux/actions";
import {  Link } from 'react-router-dom';
import Swal from 'sweetalert2';


const Form = () => {
    const allTeams = useSelector(state =>state.teams);
    console.log("Los teams en for son " , allTeams.length);
    const dispatch = useDispatch();
    const [error , setError] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
    const [dataForm , setDataForm]= useState({
            nombre : "",
            apellido : "",
            fechaNacimiento : "",
            nacionalidad : "",
            descripcion : "",
            teams: "",
    });

    useEffect(() => {
       dispatch(getAllTeams());
    },[dispatch]);

    const setDataHandler = (e) => {
      const { id, value } = e.target;
      // Copia el estado actual y actualiza el valor del campo correspondiente
      setDataForm((prevState) => ({
        ...prevState,
        [id]: value,
      }));


      setError((prevError) => ({
        ...prevError,
        [id]: "",
      }));
    };
    

          const handleSelectChange1 = (event) => {
            const options = Array.from(event.target.selectedOptions).map((option) => option.value);
            options.forEach((option) => {
              if (!selectedOptions.find((o) => o.name === option)) {
                setSelectedOptions([...selectedOptions, { name: option, isChecked: true }]);
                  }
                });

            setError({
              ...error,
              genero: ""
            });
              };

          const handleCheckboxChange1 = (event, option) => {
            const isChecked = event.target.checked;
            setSelectedOptions(
              selectedOptions.map((o) => (o.name === option ? { ...o, isChecked } : o))
                );
              };

              const handleSaveClick = (e) => {
                const selectedGenres = selectedOptions
                  .filter((option) => option.isChecked)
                  .map((option) => option.name);
                  const spacedGenres = selectedGenres.map((genre) => ` ${genre}`);

                  const genresString = spacedGenres.join(",");
               
                  setDataForm({
                      ...dataForm,
                      teams: genresString,
                     
                     });
    
                     setError({
                      ...error,
                      [e.target.name] : ""
                  })
                };

                const submitForm = (e)=>{
                  e.preventDefault();
                  let estadoForm = false;
                  if (dataForm.nombre.length === 0) {
                    setError((prevError) => ({
                      ...prevError,
                      nombre: "Campo requerido",
                    }));
                    estadoForm = false;
                  } 
                   if (dataForm.apellido.length === 0) {
                    setError((prevError) => ({
                      ...prevError,
                      apellido: "Campo requerido",
                    }));
                  }
                
                   if(dataForm.nacionalidad.length === 0 ){
                    setError((prevError) => ({
                      ...prevError,
                      nacionalidad: "Campo requerido",
                    }));
                    estadoForm= false
                  }  if ((dataForm.fechaNacimiento.length === 0) ){
                    setError((prevError) => ({
                      ...prevError,
                      fechaNacimiento: "Campo requerido",
                    }));
                    estadoForm = false
                  }  if(dataForm.teams.length === 0){
                     setError((prevError) => ({
                      ...prevError,
                      teams: "Campo requerido",
                    }));
                    estadoForm = false
                  } 
                   if(dataForm.descripcion.length === 0){
                    setError((prevError) => ({
                      ...prevError,
                      descripcion: "Campo requerido",
                    }));
                    estadoForm = false
                  }
                  
                  else {
                    estadoForm = true
                  }
      
                  
                  
                   if(estadoForm){
                    console.log("Losteams desde el FORMULARION SON" , dataForm.teams);
                    dispatch(createDriver(dataForm));
                    setDataForm({
                      nombre: "",
                      apellido: "",
                      nacionalidad : "",
                      fechaNacimiento :  "",
                      descripcion : "",
                     
                      teams : "",
                      
                    });
                    setSelectedOptions([]);
                    
                    Swal.fire({
                      title: 'Se creó exitosamente', // Aquí puedes usar HTML personalizado
                      icon: 'success',
                      confirmButtonColor: "#34a57f"  
                    }
                  ) 
                   }else{
                    Swal.fire({
                      title : 'Error en los datos ',
                     
                      confirmButtonColor: "#ff5733"
                    }); 
                   }
                 
                }
    return (
        <div  className={styles.containerForm} >
         <nav> 
         <Link  className={styles.liik} to="/drivers"> Volver a Inicio </Link>
         </nav>
           <form  className={styles.form} action="" onSubmit={(e) => submitForm(e)}>
            <h1>Creacion de Driver</h1>
              <div className={styles.div1}>
                <div className={styles.inputGroup}>
                <input
                       onChange={setDataHandler}
                       value={dataForm.nombre}
                      type='text'
                      id="nombre"
                      className={styles.inputGroupInput}/>
                <label htmlFor="nombre" className={styles.inputGroupLabel}>Nombre</label>
                {error.nombre && (<p  className={styles.error} > {error.nombre}</p>)}
             </div>
             <div className={styles.inputGroup}>
                <input 
                        onChange={setDataHandler}
                        value={dataForm.apellido}
                        type='text'
                        id="apellido"
                        className={styles.inputGroupInput}/>
                <label htmlFor="apellido" className={styles.inputGroupLabel}>Apellido</label>
                {error.apellido && (<p  className={styles.error} > {error.apellido}</p>)}
             </div>
              </div>
              <div className={styles.div1}>
                <div className={styles.inputGroup} >
                <input 
                        onChange={setDataHandler}
                       value={dataForm.nacionalidad}
                        type='text'
                        id="nacionalidad"
                        className={styles.inputGroupInput}/>
                <label  htmlFor="nacionalidad" className={styles.inputGroupLabel}> Nacionalidad</label>
                {error.nacionalidad && (<p  className={styles.error} > {error.nacionalidad}</p>)}
             </div>
             <div  className={styles.inputGroup}>
                <input 
                        type='text'
                        id="fechaNacimiento"
                        onChange={setDataHandler}
                       value={dataForm.fechaNacimiento}
                        className={styles.inputGroupInput}/>
                <label  htmlFor="fechaNacimiento" className={styles.inputGroupLabel} >Fecha de Nacimiento</label>
                {error.fechaNacimiento && (<p  className={styles.error} > {error.fechaNacimiento}</p>)}
             </div>

              </div>
              <div className={styles.div}>
                <label className={styles.label} >Descripcion</label>
                <textarea
                        id="descripcion" 
                        className={styles.inputGroupInputText} 
                       
                        onChange={setDataHandler}
                        value={dataForm.descripcion}
                        ></textarea>
                {error.descripcion && (<h6  className={styles.error} >{error.descripcion}</h6>)}
              </div>

              <div >
            <label className={styles.label} > TEAMS </label>
            <select id="my-select1"  onChange={handleSelectChange1}  className={styles.select} value={dataForm.teams} >
                           <option> Selecciona una Opcion</option>
                             {allTeams.length > 0 ? (
                              allTeams.map((t) => {
                           return <option key={t.id} value={t.nombre}> {t.nombre}  </option> 
                         })
                       ) : (
                         <option> No hay Equipos</option>
                       )}
              </select>

              {error.teams && (<h6  className={styles.error1} >{error.teams}</h6>)}
                      <div className={styles.labelContainer } >
                       
                    {selectedOptions.map((option) => (
                      <div  key={option.name}  name="genero" value = {dataForm.teams} >
                        <label className={styles.label} value={selectedOptions}>
                          <input
                            type="checkbox"
                            value={option.name}
                            checked={option.isChecked}
                            onChange={(e) => handleCheckboxChange1(e, option.name)}
                            
                          />
                          {option.name}
                        </label>
                       
                      </div>
                    ))}
                   
                     </div>

                     
            </div>
            
            
             <button onClick={handleSaveClick} className={styles.botonF}>Enviar</button>
           </form> 
        </div>
    );
}

export default Form;
