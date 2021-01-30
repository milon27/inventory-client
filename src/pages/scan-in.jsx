import dynamic from 'next/dynamic'
import { useState, useContext } from 'react'
import Alert from '../component/layout/Alert'
import Body from '../component/layout/Body'
import Header from '../component/layout/Header'
import Loading from '../component/layout/Loading'
import { DispatchContext } from '../utils/context/AppContext'
//import QrReader from 'react-qr-reader'

const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false })
import ListAction from './../utils/actions/ListAction';
import AppAction from './../utils/actions/AppAction';
import Response from './../utils/Response';
import ProtectedContent from './../component/ProtectedContent';
import Footer from '../component/layout/Footer'


export default function scanIn() {

    const { appDispatch, partlistDispatch } = useContext(DispatchContext)
    const [result, setResult] = useState({})
    const [done, setDone] = useState(false)


    // function play() {
    //     var beepsound = new Audio(
    //         'https://www.soundjay.com/button/sounds/beep-01a.mp3');
    //     beepsound.play();
    // }

    const onClear = () => {
        setDone(false)
        setResult({})
    }
    const handleScan = (data) => {
        if (data) {
            if (!done) {
                setResult(JSON.parse(data))
                var beepsound = new Audio('/beep.mp3');
                beepsound.loop = false;
                beepsound.play();
                setDone(true)
            }
        }
    }
    const handleError = (err) => {
        console.error(err)
    }


    //on update the quantity
    const onUpdate = () => {
        if (result.id === undefined) {
            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, "Scan In Some Part First", "Scan then click on confirm Scan In", "danger"));
            return
        }


        AppAction.getInstance(appDispatch).START_LOADING();

        //add new info

        const collection = "part_collection"
        const id = result.id
        const field = "part_stock"
        const inc_dec = 1

        ListAction.getInstance(partlistDispatch).updateStock(`v1/up-data/${collection}/${id}/${field}/${inc_dec}`, inc_dec, field)
            .then(res => {
                AppAction.getInstance(appDispatch).STOP_LOADING();
                AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `Part Stock Updated Successfully`, "success"));
                AppAction.getInstance(appDispatch).RELOAD();
                onClear()
            }).catch(e => {
                AppAction.getInstance(appDispatch).STOP_LOADING();
                AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, e.message, "Something Went Wrong! try again", "danger"));
            });
    }


    return (
        <div>
            <Header title="Scan In" />
            <Body>
                <ProtectedContent url={`scan-in/`} />
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
                    <div className="col-md-8 col-sm-6 col-xs-12">
                        <li key={result.id} className="list-group-item d-flex justify-content-around align-items-center m-part">
                            <img className="part-img " src={result.parts_img} />
                            <span className="part-item  ">ID : {result.id}</span>
                            <span className="part-item  ">Title : {result.part_title}</span>
                            {/* <span className="part-item ">Quantity : {result.part_stock}</span> */}
                            {(typeof window !== "undefined" && window.innerWidth <= 700) ? <>
                                <div className="row mt-2">
                                    <div className="col-md-12">
                                        <Alert />
                                        <Loading color="info" />
                                    </div>
                                </div>
                            </> : <></>}


                            <span className="part-item ">
                                <button onClick={onUpdate} className="btn btn-primary mx-3">Confirm Scan In</button>
                            </span>

                            <span className="part-item ">
                                <button onClick={onClear} className="btn btn-danger mx-3">Clear Scan List</button>
                            </span>

                        </li>



                        <div className="row">
                            <div className="col-md-12">
                                <ul className="list-group" >
                                    <li className="list-group-item d-flex flex-column">
                                        <span className="my-2">Brand : {result.brand}</span>
                                        <span className="my-2">Manufacturer Part Num : {result.manufacturer_part_num}</span>
                                        <span className="my-2">Store Location : {result.store_location}</span>
                                        <span className="my-2">Supplier Name : {result.supplier_name}</span>
                                        <span className="my-2">Purchased Date : {result.purchased_date}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </Body>
            <Footer />

        </div >
    )
}
