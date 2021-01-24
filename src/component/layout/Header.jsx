import Head from 'next/Head'
import Link from 'next/link'
import { useContext } from 'react';
import { StateContext } from './../../utils/context/AppContext';
import Define from '../../utils/Define';
import URL from '../../utils/URL';

export default function Header({ title }) {

    //global state
    const { auth } = useContext(StateContext)

    return (
        <div>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.png" />
                {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link> */}

                <link rel="stylesheet" type="text/css" href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/fonts/simple-line-icons/style.min.css"></link>

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css"></link>

                <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300&display=swap" rel="stylesheet"></link>

            </Head>

            <header className="">
                <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">

                    <Link href='/'>
                        <a className="navbar-brand" ><h4 className="text-primary">Juz Air Inventory</h4></a>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">

                            <Link className="nav-item active" href={URL.HOME}>
                                <a className="nav-link" >Home </a>
                            </Link>

                            <Link className="nav-item active" href={URL.PART_LIST}>
                                <a className="nav-link">All Parts </a>
                            </Link>

                            <Link className="nav-item active" href={URL.SCAN_IN}>
                                <a className="nav-link">Scan In</a>
                            </Link>
                            <Link className="nav-item active" href={URL.SCAN_OUT}>
                                <a className="nav-link">Scan Out</a>
                            </Link>

                            <Link className="nav-item active" href={URL.CART_LIST}>
                                <a className="nav-link">Cart List</a>
                            </Link>
                            <Link className="nav-item active" href={URL.ORDER_LIST}>
                                <a className="nav-link">Order List</a>
                            </Link>
                            {auth.role === Define.S_ADMIN ?
                                <Link className="nav-item active" href={URL.USER_LIST}>
                                    <a className="nav-link"> User List</a>
                                </Link>
                                : <></>}

                            <Link className="nav-item active" href={URL.PROFILE}>
                                <a className="nav-link"><i className="fa fa-user" style={{ fontSize: '1.4rem', background: '#4582EC', padding: '5px', color: "#FFF", borderRadius: "5px" }}></i></a>
                            </Link>



                        </ul>

                    </div>
                </nav>
            </header>

        </div>
    )
}
