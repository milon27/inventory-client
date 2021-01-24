import { createContext, useReducer } from 'react'
import AuthReducer, { auth_init_state } from './../reducers/AuthReducer';
import AppReducer, { app_init_state } from './../reducers/AppReducer';
import ListReducer, { list_init_state } from '../reducers/ListReducer';
export const StateContext = createContext();
export const DispatchContext = createContext();



export default function AppContext({ children }) {

    const [auth, authDispatch] = useReducer(AuthReducer, auth_init_state)
    const [app, appDispatch] = useReducer(AppReducer, app_init_state)
    const [userlist, userlistDispatch] = useReducer(ListReducer, list_init_state)
    const [partlist, partlistDispatch] = useReducer(ListReducer, list_init_state)
    const [orders, ordersDispatch] = useReducer(ListReducer, list_init_state)


    const states = {
        auth, app, userlist, partlist, orders
    }
    const dispatch = {
        authDispatch, appDispatch, userlistDispatch, partlistDispatch, ordersDispatch
    }


    return (
        <StateContext.Provider value={states}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider >
    )
}
