import Header from "../../component/layout/Header";
import Body from './../../component/layout/Body';
import { useContext, useEffect } from 'react';
import { DispatchContext, StateContext } from './../../utils/context/AppContext';
import ListAction from "../../utils/actions/ListAction";
import Define from './../../utils/Define';
import Types from "../../utils/actions/Types";
import Link from 'next/link'
import ProtectedContent from "../../component/ProtectedContent";
import Footer from './../../component/layout/Footer';

export default function Orders({ data }) {

    const { orders } = useContext(StateContext)
    const { ordersDispatch } = useContext(DispatchContext)

    useEffect(() => {
        ordersDispatch({
            type: Types.GET_ALL_DATA,
            payload: data//an array
        })
        return () => {
            //cleanup
        }
    }, [])

    return (
        <>
            <Header title="Order List" />
            <ProtectedContent url={`/orders/`} />
            <Body>
                <div className="row">
                    <div className="col-md-12">
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped ">
                            <thead className="bg-primary text-light">
                                <tr>
                                    <th scope="col">SO Number</th>
                                    <th scope="col">Admin ID</th>
                                    <th scope="col">Customer Name</th>
                                    <th scope="col">Order Desc</th>
                                    <th scope="col">Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(item => {
                                    return <tr key={item.id} >
                                        <th scope="row"> {item.so_num}</th>
                                        <td>{item.admin_id}</td>
                                        <td>{item.customer_name}</td>
                                        <td>{item.order_desc}</td>
                                        <td>
                                            <Link href={`/orders/${item.id}`}>
                                                <a className="btn btn-primary">View Details</a>
                                            </Link>

                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Body>
            <Footer />
        </>
    )
}


export const getServerSideProps = async (context) => {
    ListAction.getSource()
    const res = await ListAction.getAll(Define.order_collection)
    //console.log("order list ", res.data);
    return {
        props: {
            data: res.data,//arry
        }
    }
}
