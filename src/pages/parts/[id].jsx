import Footer from "../../component/layout/Footer";
import Header from "../../component/layout/Header";
import ProtectedContent from "../../component/ProtectedContent";
import Define from "../../utils/Define";
import Body from '../../component/layout/Body';
import ListAction from '../../utils/actions/ListAction';

import QRCode from 'qrcode.react'


export default function Part({ part }) {

    const printMe = () => {
        var dataUrl = document.getElementById('123456').toDataURL(); //attempt to save base64 string to server using this var  
        var windowContent = '<!DOCTYPE html>';
        windowContent += '<html>'
        windowContent += '<head><title>Print canvas</title></head>';
        windowContent += '<body>'
        windowContent += '<img src="' + dataUrl + '">';
        windowContent += '</body>';
        windowContent += '</html>';
        var printWin = window.open('', '', '');
        printWin.document.open();
        printWin.document.write(windowContent);
        printWin.document.close();
        printWin.focus();
        printWin.print();
        //printWin.close();

    }

    const downloadQR = (e) => {
        const canvas = document.getElementById("123456");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "123456.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }


    return (
        <>
            <Header title="Products List" />
            <ProtectedContent url={`/parts/${part.id}`} />

            <Body>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card" >
                                <img src={part.parts_img} className="card-img-top desk-img" />
                                <p className="card-title desk-img">ID: {part.id}</p>
                                <div className="card-body">

                                    <h5 className="card-title">{part.part_title}</h5>
                                    <p className="card-text">Description : {part.part_desc}</p>
                                    <div className="d-flex flex-column justify-content-center">

                                        <QRCode
                                            className="qr-img"
                                            id="123456"
                                            value={part.id}
                                            size={290}
                                            level={"H"}
                                            includeMargin={true}
                                        />
                                        <div className="d-flex flex-row ">
                                            <a className="btn btn-primary card-link qr-btn" onClick={downloadQR}> Save QR </a>
                                            <a className="btn btn-primary card-link qr-btn" onClick={printMe}> Print QR </a>
                                        </div>

                                        {/* <a className="btn btn-primary card-link qr-btn" onClick={() => { window.print() }}> Print QR </a> */}

                                    </div>
                                </div>

                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Brand : {part.brand}</li>
                                    <li className="list-group-item">Stock : {part.part_stock}</li>
                                    <li className="list-group-item">Manufacturer Num: {part.manufacturer_part_num}</li>
                                    <li className="list-group-item">Store Location : {part.store_location}</li>
                                    <li className="list-group-item">Supplier Name : {part.supplier_name}</li>
                                    <li className="list-group-item">Purchased Date : {part.purchased_date}</li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </Body>
            <Footer />
        </>

    )
}

export const getServerSideProps = async (context) => {
    const id = context.params.id

    ListAction.getSource();
    const res = await ListAction.getOne(Define.part_collection, id)
    return {
        props: { part: res.data }
    }
}
