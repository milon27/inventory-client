import Alert from "../../component/layout/Alert";

import Body from "../../component/layout/Body";
import Header from "../../component/layout/Header";
import Loading from "../../component/layout/Loading";
import { useState, useContext } from 'react'
import dynamic from 'next/dynamic'
import Define from "../../utils/Define";
const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false })
import { useRouter } from 'next/router'
import URL from "../../utils/URL";
import ProtectedContent from './../../component/ProtectedContent';
import Footer from "../../component/layout/Footer";
import AppAction from './../../utils/actions/AppAction';
import { DispatchContext } from "../../utils/context/AppContext";
import Response from './../../utils/Response';

export default function ScanOut() {
    const [cart, setCart] = useState([])
    const router = useRouter()

    const { appDispatch } = useContext(DispatchContext)

    const gotoCart = () => {
        if (cart.length === 0) {
            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, "Scan Out Some Part First", "Scan then click on confirm Scan Out", "danger"));
            return
        }
        //update the localstorage
        if (process.browser) {
            localStorage.setItem(Define.CART_LOCAL, JSON.stringify(cart))
        }
        router.push(URL.CART_LIST)
    }

    //QR code mehod
    const handleScan = (data) => {
        if (data) {
            const item = JSON.parse(data)

            const found = cart.find(itm => itm.id === item.id);

            if (found === undefined) {
                setCart([...cart, item])
            }
        }

    }
    const handleError = (err) => {
        console.error(err)
    }


    return (
        <>
            <Header title="Scan Out" />
            <Body>
                <ProtectedContent url={`scan-out/`} />
                <div className="row">
                    <div className="col-md-12">
                        <Alert />
                        <Loading color="info" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div>
                            {process.browser ?
                                <QrReader
                                    delay={150}
                                    onError={handleError}
                                    onScan={handleScan}
                                    style={{ width: '100%' }}
                                />
                                :
                                <></>}
                        </div>
                        <div className="my-3 text-center">
                            <button onClick={gotoCart} className="btn btn-primary mx-3">Confrim Scan Out</button>
                        </div>

                    </div>

                    {/*  */}
                    <div className="col-md-8 col-sm-6 col-xs-12">

                        {cart.map(result => {
                            return <li key={result.id} className="list-group-item d-flex justify-content-between align-items-center m-part">
                                <img className="part-img " src={result.parts_img} />
                                <span className="part-item  ">ID : {result.id}</span>
                                <span className="part-item  ">Title : {result.part_title}</span>
                            </li>
                        })}
                    </div>

                </div>
            </Body>
            <Footer />
        </>
    )
}
