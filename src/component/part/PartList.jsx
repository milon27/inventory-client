import Link from 'next/link'
import { useContext } from 'react';
import AppAction from '../../utils/actions/AppAction';
import ListAction from '../../utils/actions/ListAction';
import { DispatchContext, StateContext } from '../../utils/context/AppContext';
import Define from '../../utils/Define';
import Response from '../../utils/Response';

export default function PartList({ data }) {

    const { partlist, setInput } = data

    const { auth } = useContext(StateContext)
    const { appDispatch, partlistDispatch } = useContext(DispatchContext)

    //on edit click
    const onClickHandle = (e) => {
        if (e.target.nodeName.toLowerCase() == "button") {
            const _id = e.target.id;
            let arr = partlist.filter((item) => {
                return item.id === _id
            });
            const selected = arr[0]
            if (e.target.classList.contains("btn-danger")) {
                //delete
                deleteHandle(selected)
            } else {
                //edit
                setInput(selected);
            }
        }
    }

    const deleteHandle = (selected) => {
        //are you sure you are to delete
        if (confirm("Are you sure,you want to delete?")) {
            //update
            AppAction.getInstance(appDispatch).START_LOADING();
            ListAction.getInstance(partlistDispatch).deleteData(`v1/delete/${Define.part_collection}/${selected.id}`, selected.id).then(res => {
                AppAction.getInstance(appDispatch).STOP_LOADING();
                AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `Product Deleted Successfully`, "success"));
                AppAction.getInstance(appDispatch).RELOAD();
            }).catch(e => {
                AppAction.getInstance(appDispatch).STOP_LOADING();
                AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, e.message, "Something Went Wrong! try again", "danger"));
            });
        } else {
            console.log("cancel");
        }
    }


    return (
        <div className="container-fluid">

            {/* <div className="row">
                <div className="col-md-12">

                </div>
            </div> */}
            <div className="row">
                <div className="col-md-12">
                    <ul className="list-group" onClick={onClickHandle}>
                        {partlist.length > 0 ? partlist.map(item => {
                            return (

                                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center m-part">
                                    <Link href={`/parts/${item.id}`}>
                                        <div className="img-container">
                                            <img className="part-img " src={item.parts_img} />
                                            <div className="overlay">View Details</div>
                                        </div>
                                    </Link>

                                    <span className="part-item  ">{item.id}
                                    </span>
                                    <span className="part-item  ">Title : {item.part_title}</span>
                                    <span className="part-item ">Stock : {item.part_stock}</span>
                                    <span className="part-item ">Supplier : {item.supplier_name}
                                    </span>
                                    <span className="part-item ">Date:{item.purchased_date}</span>
                                    <span className="part-item ">
                                        <button id={item.id} btn="edit" className="btn btn-primary badge-pill px-4 mx-3" data-toggle="modal" data-target="#addPart">
                                            Edit</button>


                                        {auth.role === Define.S_ADMIN ?
                                            <>
                                                <button id={item.id} type="button" className="btn btn-danger badge-pill px-4">
                                                    Delete</button>
                                            </>
                                            : <></>}

                                    </span>
                                </li>

                            )
                        }) : <h2>No Product Available,Add new Product</h2>}
                    </ul>
                </div>
            </div>
        </div>
    )
}

