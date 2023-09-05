const initialState = {
    drivers: [],
    teams : [], 
    
}

export default function reducer( state = initialState, action){
        switch(action.type){
            case "GET_ALL_DRIVERS" : {
                return {
                    ...state,
                  
                    drivers: action.payload
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


          

            default : 
                return {
                    ...state
                }
            
        }
}