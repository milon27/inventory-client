import Modal from './Modal';
import { useState, useContext } from 'react';
import Define from '../../../utils/Define';
import AppAction from './../../../utils/actions/AppAction';
import { DispatchContext } from '../../../utils/context/AppContext';
import Response from './../../../utils/Response';
import AuthAction from './../../../utils/actions/AuthAction';

export default function ModalAddUser(props) {
    const { appDispatch, authDispatch, userlistDispatch } = useContext(DispatchContext)

    //local state
    const initState = {
        email: "",
        role: "ADMIN",
        pass: ""
    };
    const [input, setInput] = useState(initState);

    //local method
    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    //validation
    const isValidField = () => {
        if (input.email === "") {
            return false;
        } else if (input.pass === "") {
            return false;
        } else {
            return true;
        }
    }

    //submit
    const onSubmit = (e) => {
        e.preventDefault();


        if (!isValidField()) {
            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, "Empty Field Found", "Enter all feild value and try again", "danger"));
        } else {
            AppAction.getInstance(appDispatch).START_LOADING();
            //add new info
            AuthAction.getInstance(authDispatch).SignUp(input.email, input.pass, input.role, userlistDispatch).then(res => {
                AppAction.getInstance(appDispatch).STOP_LOADING();
                AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `User Created Successfully `, "success"));
                AppAction.getInstance(appDispatch).RELOAD();
                setInput(initState);
            }).catch(e => {
                AppAction.getInstance(appDispatch).STOP_LOADING();
                AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, e.message, "Something Went Wrong! try again", "danger"));
            });
        }
    }

    return (
        <Modal
            id={props.id}
            title="Add New user"
            btnTitle="Create User Now"
            callback={onSubmit}
            resetInput={{ setInput, initState }}
        >
            <div className="row">
                <div className="col-md-12">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label htmlFor="">Enter Email Address:</label>
                                <input type="text"
                                    className="form-control"
                                    name="email"
                                    placeholder="User Email "
                                    value={input.email}
                                    onChange={onChange}
                                />
                                <label htmlFor="">Enter Password:</label>
                                <input type="text"
                                    className="form-control"
                                    name="pass"
                                    placeholder="User Password "
                                    value={input.pass}
                                    onChange={onChange}
                                />
                                <label htmlFor="">Select Role:</label>
                                <select className="form-control" name="role" value={input.role} onChange={onChange} >
                                    <option value="">Select Role</option>
                                    <option key={Define.ADMIN} value={Define.ADMIN}>Admin</option>
                                    <option key={Define.S_ADMIN} value={Define.S_ADMIN}>Super Admin</option>
                                </select>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </Modal>
    )
}
