
import { useContext, useEffect } from 'react';
import { DispatchContext, StateContext } from './../../../utils/context/AppContext';
import ListAction from './../../../utils/actions/ListAction';
import Define from '../../../utils/Define';
import AuthAction from '../../../utils/actions/AuthAction';
export default function TableUserList() {

    const { userlist } = useContext(StateContext)
    const { userlistDispatch } = useContext(DispatchContext)

    useEffect(() => {
        const source = ListAction.getSource();
        try {
            const fetch = async () => {
                await ListAction.getInstance(userlistDispatch).getAll(Define.user_collection)
            }
            fetch();

        } catch (e) {

        }

        //cleanup
        return () => {
            console.log(` clean up `);
            source.cancel();
        } // eslint-disable-next-line react-hooks/exhaustive-deps 

    }, [])

    const onClickHandle = async (e) => {
        e.preventDefault();
        if (e.target.nodeName.toLowerCase() !== 'i') {
            return;
        }
        //delete the user from user list.

        //ask for confirmation
        if (confirm("Are you sure,you want to delete?")) {
            //update
            //AppAction.getInstance(appDispatch).START_LOADING();
            await AuthAction.getInstance(userlistDispatch)
                .deleteUser(`auth/delete-user/${e.target.id}`, e.target.id)
            //AppAction.getInstance(appDispatch).START_LOADING();
        } else {
            console.log("cancel");
        }


    }


    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            {/* */}
                            <tbody onClick={onClickHandle} >
                                {
                                    userlist.map((item) => {
                                        return (<tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name ? item.name : item.email.split('@')[0]}</td>
                                            <td>{item.email}</td>
                                            <td>{item.role === Define.S_ADMIN ? "Super Admin" : "Admin"}</td>
                                            <td><i id={item.id} className="fa fa-trash" ></i></td>
                                        </tr>)
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        </div>
    )
}
