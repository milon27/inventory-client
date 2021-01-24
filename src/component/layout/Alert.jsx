
import { useContext } from 'react';
import { DispatchContext, StateContext } from './../../utils/context/AppContext';
import AppAction from './../../utils/actions/AppAction';


const Alert = () => {
    const { app } = useContext(StateContext);
    const { appDispatch } = useContext(DispatchContext);

    const removeResponse = () => {
        AppAction.getInstance(appDispatch).REMOVE_RESPONSE();
    }

    let tp = "alert alert-" + app.response.type;
    //let dtn = "my-2 btn btn-outline-" + app.response.type;
    let dtn = "my-2 btn btn-light";
    return (
        <>
            {
                app.response.type ?
                    <div className={tp} role="alert">
                        <h4 className="alert-heading">{app.response.title}</h4>
                        <p className="mb-0">{app.response.desc}</p>
                        {app.response.type && true ? <button className={dtn} onClick={removeResponse} >X</button> : ""}
                    </div>
                    : <></>
            }

        </>
    );
};



export default Alert;