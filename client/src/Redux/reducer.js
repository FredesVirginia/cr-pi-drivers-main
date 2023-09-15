import { edadMax ,  edadMin } from "../Order/order";


export { edadMin , edadMax} from "../Order/order";

const initialState = {
    drivers: [],
    teams : [], 
    driverId: {},
    driverNootFound : false , 
    actualPage: 1
    
}

export default function reducer( state = initialState, action){
        switch(action.type){

            case "CHANGE_PAGE":
                return {
                    ...state, 
                    actualPage: action.payload
                } 
            case "GET_ALL_DRIVERS" : {
                return {
                    ...state,
                    actualPage:1,
                    drivers: action.payload
                }
            }

            case "GET_ALL_DRIVERS_API": {
                return {
                    ...state,
                    
                    drivers: action.payload
                }
            }

             case "GET_ALL_DRIVERS_BBDD": {
                return {
                    ...state,
                    
                    drivers: action.payload
                }
            }



            case "GET_DRIVER_FOR_ID" : {
                return {
                    ...state,
                    actualPage:1,
                    driverId: action.payload
                }
            }

            case "DRIVER_NOT_FOUND" : {
                console.log("el redux de DRIVER NOT FOUND ES " , action.payload);
                return {
                    ...state,
                    driverNootFound: action.payload,
                    actualPage:1,
                }
            }

            case  "DRIVER_FOUND": {
                console.log("el redux de DRIVER NOT FOUND ES " , action.payload);
                return {
                    ...state,
                    driverNootFound: action.payload,
                    actualPage:1,
                }
            }
            

            case "GET_ALL_TEAMS" : {
                return {
                    ...state,
                    actualPage:1,
                    teams : action.payload
                }
            }

            case "GET_DRIVER_FOR_TEAMS" : {
                return {
                    ...state,
                  
                    drivers: action.payload
                }
            }

            case  "CREATE_DRIVER" : {
                return {
                    ...state,
                    actualPage:1,
                }
            }

            case "GET_FOR_NAME_DRIVERS" : {
                return {
                    ...state,
                    actualPage:1,
                    drivers: action.payload.data
                }
            }

            case "UPDATE_DRIVER": {
                return {
                    ...state,
                   
                }
            }

            case "DELETE_DRIVER_BBDD" : {
                return {
                    ...state,
                   
                    drivers: action.payload
                }
            }

             case "DELETE_DRIVER_API" : {
                const filterDrivers= state.drivers.filter((driver)=> driver.id !== action.payload);
                return {
                    ...state,
                  
                    drivers: filterDrivers
                }
            }

            case "MENOR_EDAD" : {
               
                return {
                    ...state ,
                   
                    drivers :state.drivers.slice().sort(edadMin)
                }
            
            }

            case "MAYOR_EDAD" : {
                return {
                    ...state,
                  
                    drivers: state.drivers.slice().sort(edadMax)
                }
            }


          

            default : 
                return {
                    ...state
                }
            
        }
}