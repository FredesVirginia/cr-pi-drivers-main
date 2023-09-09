import axios from "axios";

    export function getAllDrivers(){
        return async function (dispatch){
            try{
                const allDrivers = await axios.get("http://localhost:3001/drivers/");
                return dispatch ({
                    type: "GET_ALL_DRIVERS",
                    payload: allDrivers.data
                })
                
            }catch(error){
                console.log("Error desde action ", error);
            }
        }
    }

    export function getForNameDrivers(nombre){
        return async function (dispatch){
            try{
                console.log("El nombre desde action name es " , nombre);
                const allDrivers = await axios.get(`http://localhost:3001/drivers/nombre/?nombre=${nombre}` );
                return dispatch ({
                    type: "GET_FOR_NAME_DRIVERS",
                    payload: allDrivers.data
                })
                
            }catch(error){
                console.log("Error desde action NAME", error);
            }
        }
    }

    export function createDriver(driver){
        return async function (dispatch){
            try{
                console.log("El nombre desde action name es " , driver);
                const allDrivers = await axios.post(`http://localhost:3001/drivers/crear` , driver );
               console.log("La respuesta desde l back fue" , allDrivers.data);
                return dispatch ({
                    type: "CREATE_DRIVER",
                   
                })
                
            }catch(error){
                console.log("Error desde action NAME", error);
            }
        }
    }

    export function getDriverForID(id){
        return async function (dispatch){
            try{
                const response = await axios.get(`http://localhost:3001/drivers/${id}`);
                console.log("La respueta desde action ID es " , response.data);
                 dispatch({
                        type: "GET_DRIVER_FOR_ID",
                        payload : response.data
                })
            }catch(error){
                console.log("Eoor desde action id", error);
            }
        }
    }

    export function updateDriver (id , driver){
        return async function (dispatch){
            try{
                console.log("EL driver dese action put es ", driver)
                const reqs = await axios.put(`http://localhost:3001/drivers/editar/${id}`,driver);
                console.log("EL driver ACTUALIZADO" , reqs)
                return dispatch ({
                    type : "UPDATE_DRIVER"
                })
            }catch(error){
                console.log("Error de sde action put", error);
                return error;
            }
        }
    }


   

    export function getAllTeams(){
        return async function (dispatch){
            try{
                const allTeams = await axios.get("http://localhost:3001/teams/");
                return dispatch ({
                    type:  "GET_ALL_TEAMS" ,
                    payload: allTeams.data
                })
                
            }catch(error){
                console.log("Error desde action teams ", error);
            }
        }
    }

    export function changePage(page){
        return {
            type: "CHANGE_PAGE",
            payload : page
        }
    }

    export function getDriverforTeams(team){
        return async function (dispatch){
           try{
            const response = await axios.get("http://localhost:3001/drivers/");
            const responseTeams = response.data.filter((driver) =>{
                //aqui en el split, no se por que pero es necesario poner la coma come esta ahi
                return driver.teams && driver.teams.split(", ").includes(team);
            })

             return dispatch({
                type : "GET_DRIVER_FOR_TEAMS",
                payload : responseTeams
             })
           }catch(error){
            console.log("Onfroma de errores desde action getGameforGenres" , error);
           }

        }
    }

    export function menorEdad( ){
        return function (dispatch){
           
              
            return dispatch( {
                type:  "MENOR_EDAD",
              
            })
        }
    }

    export function mayorEdad(){
        return function (dispatch){
            return dispatch( {
                type: "MAYOR_EDAD"
            })
        }
    }
