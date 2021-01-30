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
    //const [done, setDone] = useState(false)
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
            //if (!done) {
            const item = JSON.parse(data)
            const found = cart.find(itm => itm.id === item.id);
            if (found === undefined) {//if already found do not add it
                setCart([...cart, item])
                //beep
                var beepsound = new Audio('/beep.mp3');
                beepsound.loop = false;
                beepsound.play();
            }
            //}
        }

    }
    const handleError = (err) => {
        console.error(err)
    }

    const onDelete = (e) => {

        if (confirm("are you sure to delete?")) {
            const ii = e.target.nodeName
            if (ii === "I") {
                //delete the item
                const id = e.target.id
                const arr = cart.filter(itm => itm.id !== id)
                console.log(arr);
                setCart(arr)
            }
        } else {
            console.log("cancel");
        }


    }
    return (
        <>
            <Header title="Scan Out" />
            <Body>
                <ProtectedContent url={`scan-out/`} />
                {(typeof window !== "undefined" && window.innerWidth > 700) ? <>
                    <div className="row">
                        <div className="col-md-12">
                            <Alert />
                            <Loading color="info" />
                        </div>
                    </div>
                </> : <></>}
                <div className="row">
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div>
                            {process.browser ?
                                <QrReader
                                    delay={10}
                                    onError={handleError}
                                    onScan={handleScan}
                                    style={{ width: '100%' }}
                                />
                                :
                                <></>}
                        </div>
                        {(typeof window !== "undefined" && window.innerWidth <= 700) ? <>
                            <div className="row mt-2">
                                <div className="col-md-12">
                                    <Alert />
                                    <Loading color="info" />
                                </div>
                            </div>
                        </> : <></>}
                        <div className="my-3 text-center">
                            <button onClick={gotoCart} className="btn btn-primary mx-3">Confirm Scan Out</button>
                        </div>

                    </div>

                    {/*  */}
                    <div className="col-md-8 col-sm-6 col-xs-12" onClick={onDelete}>

                        {cart.map(result => {
                            return <li key={result.id} className="list-group-item d-flex justify-content-between align-items-center m-part">
                                <img className="part-img" src={result.parts_img} />
                                <span className="part-item  ">ID :{result.id}</span>
                                <span className="part-item  ">Title : {result.part_title}</span>
                                <span className="part-item  ">Supplier : {result.supplier_name}</span>
                                <span className="part-item"><i id={result.id} className="fa fa-trash"></i></span>
                            </li>
                        })}
                    </div>

                </div>
            </Body>
            <Footer />
        </>
    )
}
