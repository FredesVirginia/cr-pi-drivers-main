import React from 'react';
import styles from "./UpdateDriver.module.css";
import { useState , useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {getAllTeams  , updateDriver, getDriverForID} from "../../Redux/actions";
import {  Link , useParams } from 'react-router-dom';
import Swal from 'sweetalert2';  
const UpdateDriver = () => {

    const {id} = useParams();

    const allTeams = useSelector(state =>state.teams);
    console.log("Los teams en for son " , allTeams.length);
    const dispatch = useDispatch();
    let driverDetail =   useSelector(state => state.driverId);
    const [error , setError] = useState({});
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [dataForm, setDataForm] = useState( {
      nombre: "",
      apellido: "",
      fechaNacimiento:  "",
      nacionalidad:  "",
      descripcion:  "",
      teams: "",
    } );
    
          useEffect(() => {
            dispatch(getDriverForID(id))
          }, [dispatch , id]);
          console.log("El id del driver es " , id);
        

          useEffect(() => {
            dispatch(getAllTeams());
          },[dispatch]);
        
          useEffect(() => {
          // Verifica si driverDetail tiene datos antes de actualizar dataForm
          if (driverDetail.nombre) {
            setDataForm({
              nombre: driverDetail.nombre,
              apellido: driverDetail.apellido,
              fechaNacimiento: driverDetail.fechaNacimiento,
              nacionalidad: driverDetail.nacionalidad,
              descripcion: driverDetail.descripcion,
              teams: driverDetail.teams, // Asegúrate de que esta propiedad coincida con la estructura de driverDetail
            });

            const selectedTeamsArray = driverDetail.teams.split(',').map(team => team.trim());
            setSelectedTeams(selectedTeamsArray);

          
          }
        }, [driverDetail]);

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
            options.forEach((option) =>    {
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

          const handleCheckboxChange = (teamName) => {
            // Copiar el array de equipos seleccionados
            const updatedTeams = [...selectedTeams];
        
            // Si el equipo ya está seleccionado, deselecciónalo; de lo contrario, selecciónalo.
            if (updatedTeams.includes(teamName)) {
              updatedTeams.splice(updatedTeams.indexOf(teamName), 1);
            } else {
              updatedTeams.push(teamName);
            }
        
            // Actualizar el estado con los equipos seleccionados actualizados
            setSelectedTeams(updatedTeams);
          };
                

          const handleSaveClick = (e) => {

            const selectedTeamsArray = [...selectedTeams, ...selectedOptions
              .filter(option => option.isChecked)
              .map(option => option.name)
              ];

              // Convertir el array de equipos seleccionados en una cadena separada por comas
              const selectedTeamsString = selectedTeamsArray.join(', ');

              // Actualizar el estado de dataForm.teams con los equipos seleccionados
              setDataForm(prevDataForm => ({
              ...prevDataForm,
              teams: selectedTeamsString
              }));

                  console.log("Los temas seleciondado TOTALE S SON " , dataForm.teams);
              
                      setError({
                      ...error,
                      [e.target.name] : ""
                  })
            };

          const submitForm = (e)=>{
            e.preventDefault();
           
            
            
             
              console.log("Los teams desde el FORMULARION SON en SUBMIT" , dataForm);
              dispatch(updateDriver(id, dataForm));
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
              })}
           

        console.log("EL driver    detal en updateFrom es ", driverDetail);


    return (
        <div  className={styles.containerForm} >
        <nav> 
        <Link  className={styles.liik} to="/drivers"> Volver a Inicio </Link>
        </nav>
          {driverDetail.nombre ? ( 
          <form  className={styles.form} action="" onSubmit={(e) => submitForm(e)}>
            <h1  className = {styles.shine}>Actualizar Driver</h1>
            <div className={styles.div1}>
               <div className={styles.inputGroup}>
               <input
                      onChange={setDataHandler}
                      value={dataForm.nombre}
                     type='text'
                     id="nombre"
                     className={styles.inputGroupInput}/>
               <label htmlFor="nombre" className={styles.inputGroupLabel}>Nombre</label>
             </div>
            <div className={styles.inputGroup}>
               <input 
                       onChange={setDataHandler}
                       value={dataForm.apellido}
                       type='text'
                       id="apellido"
                       className={styles.inputGroupInput}/>
               <label htmlFor="apellido" className={styles.inputGroupLabel}>Apellido</label>
               
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

              <div>
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
      
                      <div className={styles.labelContainer }>
                        <label className={styles.label}>Seleccion equipos:</label >
                        {dataForm.teams.split(',').map((team, index) => (
                                <label key={index} className={styles.label}>
                                  <input
                                    type="checkbox"
                                    checked={selectedTeams.includes(team.trim())}
                                    onChange={() => handleCheckboxChange(team.trim())}
                                  />
                                  {team.trim()}
                                </label>
                              ))}
                      </div>
       
              </div>
           
           
            <button onClick={handleSaveClick} className={styles.botonF}>Enviar</button>
          </form> ) : (<h1> Cargando</h1>)}
       </div>
    );
}

export default UpdateDriver;
