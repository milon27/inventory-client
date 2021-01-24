import Link from 'next/link'

export default function PartList({ data }) {

    const { partlist, setInput } = data

    //on edit click
    const onClickHandle = (e) => {
        if (e.target.nodeName.toLowerCase() == "button") {
            const _id = e.target.id;
            let arr = partlist.filter((item) => {
                return item.id === _id
            });
            setInput(arr[0]);
            //console.log("edit item: ", arr[0]);
        }
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <ul className="list-group" onClick={onClickHandle}>
                        {partlist.map(item => {
                            return (
                                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center m-part">
                                    <img className="part-img " src={item.parts_img} />
                                    <span className="part-item  ">ID : {item.id}</span>
                                    <span className="part-item  ">Title : {item.part_title}</span>
                                    <span className="part-item ">Stock : {item.part_stock}</span>
                                    <span className="part-item ">
                                        <Link href={`/parts/${item.id}`}>
                                            <button className="btn btn-primary mx-3">Details</button>
                                        </Link>
                                        <button id={item.id} type="button" className="btn btn-primary badge-pill px-4" data-toggle="modal" data-target="#addPart">
                                            Edit</button>
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

