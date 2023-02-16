
export default function Reducer(state = {
    isLoggedin : localStorage.token ? true : false
},action){
    switch(action.type){
        case "LOGIN":
            state = {...state}
            state.isLoggedin = true
            return state
        default : 
            return state
    }
}