import Define from "../Define"
import Types from "./Types"
import axios from 'axios'

axios.defaults.baseURL = `${Define.BASE_URL}`
//axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

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
    SignUp: (email, name, pass, role) => {
        //http://localhost:2727/api/auth/create-user

        const user = {
            email, name, pass, role
        }

        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`auth/create-user`, user)
                //console.log("res in authaction; ", res);
                if (!res.data.error) {
                    const user = res.data.response;
                    const message = res.data.message;
                    //user loggedin offline

                    //change global state userlist
                    AuthAction.dispatch({
                        type: Types.ADD_DATA,
                        payload: user//new object
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
    deleteUser: (url, uid) => {///http://localhost:2727/api/auth/delete-user/:uid
        return new Promise((resolve, reject) => {
            axios.delete(url).then((res) => {
                if (res.status === 200) {
                    //dispatch the global state
                    AuthAction.dispatch({
                        type: Types.DELETE_DATA,
                        payload: uid//send id
                    });
                    resolve({ message: res.data.message });
                } else {
                    reject({ message: res.data.message });
                }
            }).catch((e) => {
                console.error("erroe: ", e)
                reject(e);
            })
        });
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