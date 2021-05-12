import { useContext } from 'react';
import Body from '../component/layout/Body';
import Header from '../component/layout/Header';
import URL from '../utils/URL';
import { DispatchContext, StateContext } from './../utils/context/AppContext';
import ProtectedContent from './../component/ProtectedContent';
import AuthAction from './../utils/actions/AuthAction';
import { useRouter } from 'next/router';
import Define from '../utils/Define';


export default function profile() {
    const router = useRouter()
    const { auth } = useContext(StateContext)
    const { authDispatch } = useContext(DispatchContext)

    const logOutNow = (e) => {
        e.preventDefault();
        AuthAction.getInstance(authDispatch).Logout();
        router.push(URL.LOGIN)
    }

    return (
        <>
            <Header title="Profile" />
            <ProtectedContent url={URL.PROFILE} />

            <Body>
                <div className="container">
                    <div className="row my-5">
                        <div className="col-md-12">
                            <h3 className="my-3">User Information</h3>
                            <p className="my-3">ID: {auth.id}</p>
                            <p className="my-3">Name: {auth?.name}</p>
                            <p className="my-3">Email: {auth?.email}</p>
                            <p className="my-3">Role: {auth?.role === Define.ADMIN ? "Admin" : "Super Admin"}</p>
                            <button onClick={logOutNow} type="button" className="btn btn-primary badge-pill px-4 mx-2" >
                                Log out</button>
                        </div>
                    </div>
                </div>

            </Body>
        </>
    )
}
