import Types from "./Types";

const AppAction = {
    Dispatch: null,
    getInstance: (appDispatch) => {
        AppAction.Dispatch = appDispatch;
        return AppAction;
    },
    START_LOADING: () => {
        AppAction.Dispatch({
            type: Types.START_LOADING,
        });
    },
    STOP_LOADING: () => {
        AppAction.Dispatch({
            type: Types.STOP_LOADING,
        });
    },
    SET_RESPONSE: (response) => {
        AppAction.Dispatch({
            type: Types.SET_RESPONSE,
            payload: response
        });
    },
    REMOVE_RESPONSE: () => {
        AppAction.Dispatch({
            type: Types.REMOVE_RESPONSE,
        });
    },
    RELOAD: () => {
        AppAction.Dispatch({
            type: Types.RELOAD,
        });
    },
}

export default AppAction;