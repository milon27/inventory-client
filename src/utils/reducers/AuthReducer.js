import Types from "../actions/Types";
import Define from "../Define";

// user{
//     id="",
//     email="",
//     password="",
//     role=""
// }
export let auth_init_state = {}
if (process.browser) {
    auth_init_state = localStorage.getItem(Define.USER_LOCAL) === null ?
        {} : JSON.parse(localStorage.getItem(Define.USER_LOCAL));
}


export default function AuthReducer(state, action) {
    if (action.type === Types.LOGIN) {
        return {
            ...state,//empty initally
            ...action.payload
        };
        //return action.payload;//return the user object(which store in local storage)
    } else if (action.type === Types.LOGOUT) {
        return {};
    } else {
        return state;
    }
}