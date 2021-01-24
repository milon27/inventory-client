import Define from "../Define"
import Types from "./Types"
import axios from 'axios'

axios.defaults.baseURL = `${Define.BASE_URL}`
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const AuthAction = {
    dispatch: null,
    getInstance: (dispatch) => {
        AuthAction.dispatch = dispatch
        return AuthAction
    },

    //login action
    Login: (email, pass) => {
        const temp_user = {
            email,
            pass
        }
        //http://localhost:2727/api/auth/login-user
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`auth/login-user`, temp_user)
                //console.log("res in authaction; ", res);
                if (!res.data.error) {
                    const user = res.data.response;
                    const message = res.data.message;
                    //user loggedin offline
                    if (process.browser) {
                        localStorage.setItem(Define.USER_LOCAL, JSON.stringify(user));
                    }
                    //change global state
                    AuthAction.dispatch({
                        type: Types.LOGIN,
                        payload: user
                    });
                    //resolve the  promise
                    resolve({ message, user });
                } else {
                    reject({ message: res.data.message, user: null });
                }
            } catch (e) {
                reject(e);
            }
        })
    }, //end login
    SignUp: (email, pass, role, dispatch) => {
        //http://localhost:2727/api/auth/create-user
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`auth/create-user`, { email, pass, role })
                //console.log("res in authaction; ", res);
                if (!res.data.error) {
                    const user = res.data.response;
                    const message = res.data.message;
                    //user loggedin offline

                    //change global state
                    dispatch({
                        type: Types.ADD_DATA,
                        payload: user
                    });
                    //resolve the  promise
                    resolve({ message, user });
                } else {
                    reject({ message: res.data.message, user: null });
                }
            } catch (e) {
                reject(e);
            }
        })
    },

    Logout: () => {
        //local storage change
        if (process.browser) {
            localStorage.removeItem(Define.USER_LOCAL);
            //change global state
            AuthAction.dispatch({ type: Types.LOGOUT });
        }

    }

}

export default AuthAction;