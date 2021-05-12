
import { useState, useContext, useEffect } from 'react';
import Define from '../../utils/Define';
import { DispatchContext, StateContext } from './../../utils/context/AppContext';
import ListAction from './../../utils/actions/ListAction';
import AppAction from './../../utils/actions/AppAction';
import Response from './../../utils/Response';
import Types from '../../utils/actions/Types';
import moment from 'moment';


export default function CartList() {

    const { auth, partlist } = useContext(StateContext)
    const { appDispatch, ordersDispatch, partlistDispatch } = useContext(DispatchContext)

    const [cart, setCart] = useState(
        (process.browser) ?
            localStorage.getItem(Define.CART_LOCAL) ? JSON.parse(localStorage.getItem(Define.CART_LOCAL)) : []
            : []
    )

    const [error, setError] = useState(false)

    const orderinfoinit = {
        so_num: "",
        admin_id: "",
        customer_name: "",
        order_desc: "",
        order_date: moment(new Date()).format("DD-MM-YYYY"),
        product_list: []
    }
    const [orderInfo, setOrderInfo] = useState(orderinfoinit)



    //
    useEffect(() => {
        //load parts

        const loadpart = async () => {
            ListAction.getSource()
            await ListAction.getInstance(partlistDispatch).getAll(Define.part_collection)
        }
        loadpart()


        //tmp make all 0
        setCart(cart => {
            const arr = cart.map(itm => {
                itm.part_stock = 1
                return itm;
            })
            return arr;
        })

        //ck stock problem
        cart.forEach(itm => {
            if (partlist.find(ii => ii.id === itm.id) !== undefined) {
                if (partlist.find(ii => ii.id === itm.id).part_stock <= 0) {
                    //console.log("we are here");
                    setError(true)
                }
            }
        });
        //console.log("loading..");
    }, [partlist.length])

    //stockChange
    const stockChange = (e) => {
        const id = e.target.id

        setCart(cart => {
            const arr = cart.map(itm => {
                if (itm.id === id) {
                    const actualstockitem = partlist.find(ii => ii.id === id)
                    if (actualstockitem.part_stock >= parseInt(e.target.value)) {
                        itm.part_stock = parseInt(e.target.value)
                    }
                    else {
                        alert("Stock Not Available,Stock=" + actualstockitem.part_stock)
                    }
                }
                return itm;
            })
            return arr;
        })

    }


    const onDelete = (e) => {
        const ii = e.target.nodeName
        if (ii === "BUTTON" || ii==="I") { 
            if (confirm("are you sure to delete?")) {

                //delete the item
                const id = e.target.id
                const arr = cart.filter(itm => itm.id !== id)
                console.log(arr);
                setCart(arr)
                //update the localstorage
                if (process.browser) {
                    localStorage.setItem(Define.CART_LOCAL, JSON.stringify(arr))
                }

            } else {
                console.log("cancel");
            }
        }
    }

    //onCustomerChnage
    const onCustomerChnage = (e) => {
        setOrderInfo({ ...orderInfo, [e.target.name]: e.target.value })
    }

    const clearCart = (e) => {
        setCart([])
        if (process.browser) {
            localStorage.removeItem(Define.CART_LOCAL)
        }
        setOrderInfo(orderinfoinit)
    }

    //completeOrder
    const completeOrder = async () => {

        //ck stock error
        if (error) {
            alert("Stock Not Available On Some Product,Remove all out of stock parts")
            return
        }

        orderInfo['product_list'] = cart
        orderInfo['admin_id'] = auth.id
        orderInfo['order_date'] =  moment(new Date()).format("DD-MM-YYYY").toString()

        if (cart.length === 0 || orderInfo['so_num'] === "" || orderInfo['customer_name'] === "") {
            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, "Enter All Field Value", "Add Some parts in the cart", "danger"));
            return
        }
        //list action to order list
        AppAction.getInstance(appDispatch).START_LOADING();
        //add new info
        ListAction.getInstance(ordersDispatch).addData(`order/new`, orderInfo).then(res => {
            AppAction.getInstance(appDispatch).STOP_LOADING();
            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `Order Created Successfully`, "success"));
            AppAction.getInstance(appDispatch).RELOAD();

            clearCart()//clear cart info after order complete

        }).catch(e => {
            AppAction.getInstance(appDispatch).STOP_LOADING();
            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, e.message, "Something Went Wrong! try again", "danger"));
        });

    }


    return (
        <div>
            <div className="container">
                <section className="mt-5 mb-4">
                    <div className="row">
                        {/* sidebar start */}
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="mb-3">Order Information</h5>
                                    <ul className="list-group list-group-flush">

                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 my-2">
                                            1.<span><input name="so_num" value={orderInfo.so_num} onChange={onCustomerChnage} type=" text" className="form-control" placeholder="Sales Order NO#" /></span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 my-2">
                                            2.<span><input name="customer_name" value={orderInfo.customer_name} onChange={onCustomerChnage} type="text" className="form-control" placeholder="Customer Name" /></span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 my-2">
                                            3.<span><input name="order_desc" value={orderInfo.order_desc} onChange={onCustomerChnage} type="text" className="form-control" placeholder="Descritpion" /></span>
                                        </li>

                                    </ul>
                                    <button onClick={completeOrder} type="button" className="mt-3 btn btn-primary btn-block waves-effect waves-light">Complete Order</button>
                                    <button onClick={clearCart} type="button" className="mt-3 btn btn-danger btn-block waves-effect waves-light">Clear Order List</button>
                                </div>
                            </div>
                        </div>


                        <div className="col-lg-8">
                            <div className="card wish-list mb-4">
                                <div className="card-body">
                                    <h5 className="mb-4">Cart List</h5>

                                    {cart.map(itm => {
                                        return <div key={itm.id} className="row mb-4">
                                            <div className="col-md-4 col-lg-3 col-xl-3">
                                                <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                                                    <img className="img-fluid w-50" src={itm.parts_img} alt="Sample" />
                                                </div>
                                            </div>
                                            <div className="col-md-8 col-lg-9 col-xl-9">
                                                <div>
                                                    <div className="d-flex justify-content-between">
                                                        <div>
                                                            <h5>Title: {itm.part_title}</h5>

                                                            <p className="mb-3 text-muted text-uppercase small">Stock :


                                                            {/* {console.log("here", partlist.find(ii => ii.id === itm.id))} */}
                                                                <span className="text-danger">
                                                                    {(partlist.find(ii => ii.id === itm.id) !== undefined) ? partlist.find(ii => ii.id === itm.id).part_stock > 0 ? partlist.find(ii => ii.id === itm.id).part_stock : <>
                                                                        Out Of Stock
                                                                        
                                                                    </> : ""}
                                                                </span>


                                                            </p>
                                                            <p className="mb-3 text-muted text-uppercase small">ID: {itm.id}</p>
                                                            <p className="mb-3 text-muted text-uppercase small">Quantity: {itm.part_stock}</p>
                                                            <p className="mb-3 text-muted text-uppercase small">Supplier: {itm.supplier_name}</p>
                                                        </div>
                                                        {/* <div>
                                                            <div className="def-number-input number-input safari_only mb-0 w-100">
                                                                <input id={itm.id} onChange={stockChange} className="form-control" min="1" name="quantity" value={itm.part_stock}
                                                                    type="number" />
                                                            </div>
                                                            <small id="passwordHelpBlock" className="form-text text-muted text-center">
                                                                (Quantity)
                                                            </small>
                                                        </div> */}
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <button id={itm.id} onClick={onDelete} className="btn btn-danger"><i id={itm.id} className="fa fa-trash "></i> Remove item</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })}



                                </div>
                            </div>
                        </div>

                    </div>
                </section>

            </div>

        </div>
    )
}
