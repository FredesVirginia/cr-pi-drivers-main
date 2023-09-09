import { edadMax ,  edadMin } from "../Order/order";


export { edadMin , edadMax} from "../Order/order";

const initialState = {
    drivers: [],
    teams : [], 
    driverId: {},
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

            case "GET_DRIVER_FOR_ID" : {
                return {
                    ...state,
                    actualPage:1,
                    driverId: action.payload
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
                    actualPage:1,
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
                    drivers: action.payload
                }
            }

            case "UPDATE_DRIVER": {
                return {
                    ...state,
                    actualPage:1,
                }
            }

            case "MENOR_EDAD" : {
               
                return {
                    ...state ,
                    actualPage:1,
                    drivers :state.drivers.slice().sort(edadMin)
                }
            
            }

            case "MAYOR_EDAD" : {
                return {
                    ...state,
                    actualPage:1,
                    drivers: state.drivers.slice().sort(edadMax)
                }
            }


          

            default : 
                return {
                    ...state
                }
            
        }
}