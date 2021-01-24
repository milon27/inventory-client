import Header from "../../component/layout/Header";
import ProtectedContent from "../../component/ProtectedContent";
import ListAction from "../../utils/actions/ListAction";
import Define from "../../utils/Define";
import Body from './../../component/layout/Body';
import Footer from './../../component/layout/Footer';
import Link from 'next/link'

export default function SingleOrder({ order, partlist }) {
    return (
        <>
            <Header title="Order Item" />
            <ProtectedContent url={`/orders/${order.id}`} />

            <Body>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="my-3">Order Information</h3>
                            <div className="card" >
                                <p className="card-title p-4" >ID: {order.id}</p>

                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">SO Number : {order.so_num}</li>
                                    <li className="list-group-item">Admin ID : {order.admin_id}</li>
                                    <li className="list-group-item">Customer Name : {order.customer_name}</li>
                                    <li className="list-group-item">Order Desc : {order.order_desc}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="my-3">Order Part List</h3>
                            <ul className="list-group">
                                {partlist.map(item => {
                                    return (
                                        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center m-part">
                                            <img className="part-img " src={item.parts_img} />
                                            <span className="part-item  ">ID : {item.id}</span>
                                            <span className="part-item  ">Title : {item.part_title}</span>
                                            <span className="part-item ">Quantity : {item.part_stock}</span>
                                            <span className="part-item ">
                                                <Link href={`/parts/${item.id}`}>
                                                    <button className="btn btn-primary mx-3">Details</button>
                                                </Link>
                                            </span>
                                        </li>
                                    )
                                })}
                            </ul>
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
    const part_list_res = await ListAction.getAllFromSub(Define.order_collection, Define.order_sub_collection, id)

    const res = await ListAction.getOne(Define.order_collection, id)
    return {
        props: { order: res.data, partlist: part_list_res.data }
    }
}
