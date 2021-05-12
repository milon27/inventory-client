
import Modal from './Modal';
import { useContext, useEffect } from 'react';
import AppAction from './../../../utils/actions/AppAction';
import { DispatchContext } from '../../../utils/context/AppContext';
import Response from './../../../utils/Response';
import ListAction from './../../../utils/actions/ListAction';
import Input from '../form/Input';
import { StateContext } from './../../../utils/context/AppContext';
import Define from '../../../utils/Define';
import FileUtil from '../../../fb/FileUtil';


export default function ModalAddPart(props) {
    const { auth } = useContext(StateContext)
    const { appDispatch, partlistDispatch } = useContext(DispatchContext)
    const { initState, input, setInput } = props.value

    //local method
    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const onChangeFile = (e) => {
        setInput(input => {
            input.parts_img = e.target.files[0]
            return input
        })
    }
    //validation
    const isValidField = () => {
        if (input.part_title === "" ||
            input.brand === "" ||
            input.manufacturer_part_num === "" ||
            input.part_desc === "" ||
            input.store_location === "" ||
            input.supplier_name === "" ||
            input.parts_img === null
        ) {
            return false;
        } else {
            return true;
        }
    }


    //method

    const updatePart = (input) => {
        console.log("updating....without image");

        //update
        ListAction.getInstance(partlistDispatch).updateData(`v1/add-data/part_collection`, input).then(res => {
            AppAction.getInstance(appDispatch).STOP_LOADING();
            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `Product Updated Successfully`, "success"));
            AppAction.getInstance(appDispatch).RELOAD();
            setInput(initState);
        }).catch(e => {
            AppAction.getInstance(appDispatch).STOP_LOADING();
            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, e.message, "Something Went Wrong! try again", "danger"));
        });
    }
    const addNewPart = (input) => {
        console.log("adding new Product");

        //update
        ListAction.getInstance(partlistDispatch).addData(`v1/add-data/part_collection`, input).then(res => {
            AppAction.getInstance(appDispatch).STOP_LOADING();
            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `Product Updated Successfully`, "success"));
            AppAction.getInstance(appDispatch).RELOAD();
            setInput(initState);
        }).catch(e => {
            AppAction.getInstance(appDispatch).STOP_LOADING();
            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, e.message, "Something Went Wrong! try again", "danger"));
        });
    }

    //submit
    const onSubmit = (e) => {
        e.preventDefault();
        if (!isValidField()) {
            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, "Empty Field Found", "Enter all feild value and try again", "danger"));
        } else {
            //ck for the image:::
            if (input.parts_img.name === undefined) {
                //we dont have any image while updating....
                if (input.id == null || input.id == undefined) {
                    AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, "Empty Field Found", "Enter all feild value and try again", "danger"));
                } else {
                    //we dont have image & we are updating data
                    AppAction.getInstance(appDispatch).START_LOADING();
                    input.part_stock = parseInt(input.part_stock)
                    updatePart(input)
                }
            } else {
                AppAction.getInstance(appDispatch).START_LOADING();
                if (input.id == null || input.id == undefined) {
                    //first upload the file
                    FileUtil.uploadFile(input.parts_img)
                        .then(res => {
                            //success upload & upload new data
                            input.parts_img = res.url
                            input.part_stock = parseInt(input.part_stock)
                            addNewPart(input)
                        }).catch(e => {
                            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, e.message, "Enter all feild value and try again", "danger"));
                            AppAction.getInstance(appDispatch).STOP_LOADING();
                        })
                } else {
                    //we are updating with new image
                    FileUtil.uploadFile(input.parts_img)
                        .then(res => {
                            //success upload & updating data
                            input.parts_img = res.url
                            input.part_stock = parseInt(input.part_stock)
                            updatePart(input)
                        }).catch(e => {
                            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, e.message, "Enter all feild value and try again", "danger"));
                            AppAction.getInstance(appDispatch).STOP_LOADING();
                        })
                    // fd.append("id", input.id)
                    // updateOld(fd)
                }
            }
        }
    }

    return (
        <Modal
            id={props.id}
            title="Add New Product"
            btnTitle="Add Product Now"
            callback={onSubmit}
            resetInput={{ setInput, initState }}
        >
            <div className="row">
                <div className="col-md-12">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                {input ? <>
                                    <Input name="part_title" title="Product Title" value={input.part_title} onChange={onChange} />

                                    {(input.id == null || input.id == undefined) ? "" :
                                        <>

                                            {auth.role === Define.S_ADMIN ?
                                                <>
                                                    <label htmlFor="">Product Stock :</label>
                                                    <input type="number"
                                                        className="form-control"
                                                        name="part_stock"
                                                        placeholder="Product Stock"
                                                        value={input.part_stock}
                                                        onChange={onChange}
                                                    />
                                                </>
                                                : <></>}

                                        </>
                                    }


                                    <Input name="brand" title="Product Brand" value={input.brand} onChange={onChange} />
                                    <Input name="manufacturer_part_num" title="Manufacturer Num" value={input.manufacturer_part_num} onChange={onChange} />
                                    <Input name="part_desc" title="Product Desc" value={input.part_desc} onChange={onChange} />
                                    <Input name="store_location" title="Store Location" value={input.store_location} onChange={onChange} />
                                    <Input name="supplier_name" title="Supplier Name" value={input.supplier_name} onChange={onChange} />
                                    <Input title="Product Image" onChange={onChangeFile} type="file" />
                                </> : <></>}
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </Modal >
    )
}
