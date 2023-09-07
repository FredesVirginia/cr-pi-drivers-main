import { edadMax } from "../Order/order";
import { edadMin } from "./reducer";

export { edadMin , edadMax} from "../Order/order";

const initialState = {
    drivers: [],
    teams : [], 
    driverId: {},
    
}

export default function reducer( state = initialState, action){
        switch(action.type){
            case "GET_ALL_DRIVERS" : {
                return {
                    ...state,
                  
                    drivers: action.payload
                }
            }

            case "GET_DRIVER_FOR_ID" : {
                return {
                    ...state,
                  
                    driverId: action.payload
                }
            }

            case "GET_ALL_TEAMS" : {
                return {
                    ...state,
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
                    ...state
                }
            }

            case "GET_FOR_NAME_DRIVERS" : {
                return {
                    ...state,
                    drivers: action.payload
                }
            }

            case "MENOR_EDAD" : {
               
                return {
                    ...state ,
                    drivers : action.payload
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