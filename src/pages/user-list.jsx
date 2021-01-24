import Header from './../component/layout/Header';
import Body from './../component/layout/Body';
import Footer from './../component/layout/Footer';
import TableUserList from '../component/layout/table/TableUserList';
import ModalAddUser from '../component/layout/modal/ModalAddUser';
import Alert from './../component/layout/Alert';
import Loading from './../component/layout/Loading';
import ProtectedContent from '../component/ProtectedContent';
import URL from './../utils/URL';


export default function UserList() {
    return (
        <>
            <Header title="User List" />
            <ProtectedContent url={URL.USER_LIST} />
            <Body>
                <Alert />
                <Loading color="info" />
                {/* modal */}
                <ModalAddUser id="addUser" />

                <div className="row my-3">
                    <div className="col-md-6">
                        <h3>User List</h3>
                    </div>
                    <div className="col-md-6 text-right">
                        {/* open modal form when click on it */}
                        <button type="button" className="btn btn-primary badge-pill px-4" data-toggle="modal" data-target="#addUser">
                            Add New User</button>
                    </div>
                </div>

                {/* user table list */}

                <TableUserList />
            </Body>
            <Footer />
        </>
    )
}
