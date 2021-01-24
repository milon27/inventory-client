
import Modal from './Modal';
import { useContext, useEffect } from 'react';
import AppAction from './../../../utils/actions/AppAction';
import { DispatchContext } from '../../../utils/context/AppContext';
import Response from './../../../utils/Response';
import ListAction from './../../../utils/actions/ListAction';
import Input from '../form/Input';
import { StateContext } from './../../../utils/context/AppContext';
import Define from '../../../utils/Define';


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
    const uploadNew = (fb) => {//form data=fb=fd

        AppAction.getInstance(appDispatch).START_LOADING();
        //add new info
        ListAction.getInstance(partlistDispatch).addData(`product/upload/part_collection`, fb).then(res => {
            AppAction.getInstance(appDispatch).STOP_LOADING();
            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `Part Created Successfully`, "success"));
            AppAction.getInstance(appDispatch).RELOAD();
            setInput(initState);
        }).catch(e => {
            AppAction.getInstance(appDispatch).STOP_LOADING();
            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, e.message, "Something Went Wrong! try again", "danger"));
        });
    }
    const updateOld = (fb) => {
        console.log("updating....");
        AppAction.getInstance(appDispatch).START_LOADING();

        //add new info
        ListAction.getInstance(partlistDispatch).updateData(`product/upload/part_collection`, fb).then(res => {
            AppAction.getInstance(appDispatch).STOP_LOADING();
            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `Part Updated Successfully`, "success"));
            AppAction.getInstance(appDispatch).RELOAD();
            setInput(initState);
        }).catch(e => {
            AppAction.getInstance(appDispatch).STOP_LOADING();
            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, e.message, "Something Went Wrong! try again", "danger"));
        });
    }

    const updateOldNoImage = (fb) => {
        console.log("updating....without image");
        AppAction.getInstance(appDispatch).START_LOADING();

        //update
        ListAction.getInstance(partlistDispatch).updateDataPatch(`product/upload/part_collection`, fb).then(res => {
            AppAction.getInstance(appDispatch).STOP_LOADING();
            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `Part Updated Successfully`, "success"));
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
            //console.log(input);

            const fd = new FormData()
            fd.append("part_title", input.part_title)
            fd.append("brand", input.brand)
            fd.append("manufacturer_part_num", input.manufacturer_part_num)
            fd.append("part_desc", input.part_desc)
            fd.append("part_stock", parseInt(input.part_stock))
            fd.append("store_location", input.store_location)
            fd.append("supplier_name", input.supplier_name)
            fd.append("purchased_date", input.purchased_date)
            //ck for the image:::
            if (input.parts_img.name === undefined) {
                //we dont have any image while updating....
                if (input.id == null || input.id == undefined) {
                    AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, "Empty Field Found", "Enter all feild value and try again", "danger"));
                } else {
                    input.part_stock = parseInt(input.part_stock)
                    updateOldNoImage(input)
                }

            } else {
                fd.append("parts_img", input.parts_img, input.parts_img.name)//file
                if (input.id == null || input.id == undefined) {
                    uploadNew(fd)
                } else {
                    fd.append("id", input.id)
                    updateOld(fd)
                }
            }
        }
    }

    return (
        <Modal
            id={props.id}
            title="Add New Part"
            btnTitle="Add Part Now"
            callback={onSubmit}
            resetInput={{ setInput, initState }}
        >
            <div className="row">
                <div className="col-md-12">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                {input ? <>
                                    <Input name="part_title" title="Part Title" value={input.part_title} onChange={onChange} />

                                    {(input.id == null || input.id == undefined) ? "" :
                                        <>

                                            {auth.role === Define.S_ADMIN ?
                                                <>
                                                    <label htmlFor="">Part Stock :</label>
                                                    <input type="number"
                                                        className="form-control"
                                                        name="part_stock"
                                                        placeholder="Part Stock"
                                                        value={input.part_stock}
                                                        onChange={onChange}
                                                    />
                                                </>
                                                : <></>}

                                        </>
                                    }


                                    <Input name="brand" title="Part Brand" value={input.brand} onChange={onChange} />
                                    <Input name="manufacturer_part_num" title="Manufacturer Part Num" value={input.manufacturer_part_num} onChange={onChange} />
                                    <Input name="part_desc" title="Part Desc" value={input.part_desc} onChange={onChange} />
                                    <Input name="store_location" title="Store Location" value={input.store_location} onChange={onChange} />
                                    <Input name="supplier_name" title="Supplier Name" value={input.supplier_name} onChange={onChange} />
                                    <Input title="Parts Image" onChange={onChangeFile} type="file" />
                                </> : <></>}
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </Modal >
    )
}
