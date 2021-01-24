import React, { useContext } from 'react';
import { StateContext } from '../../utils/context/AppContext';


const Loading = (props) => {
    const { app } = useContext(StateContext);
    let colorClass = "";
    if (props.color) {
        colorClass = `spinner-border text-${props.color}`;
    } else {
        colorClass = `spinner-border text-light`;
    }
    return (
        <>
            {
                app.loading ?
                    // <div className="progress">
                    //     <div className="progress-bar progress-bar-info progress-bar-striped" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{ width: "100%" }}>
                    //     </div>
                    // </div>

                    <div className="text-center">
                        <h3 className="text-info">Loading...Please Wait</h3>
                        <div className={colorClass} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    : ''
            }
        </>

    );
};

export default Loading;