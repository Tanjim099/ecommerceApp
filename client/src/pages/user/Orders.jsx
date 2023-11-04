import { useDispatch, useSelector } from "react-redux"
import Layout from "../../components/Layout/Layout"
import UserMenu from "../../components/Layout/userMenu"
import { useEffect, useState } from "react";
import { getOrders } from "../../redux/slices/orderSlice";
import moment from "moment"

function Orders() {
    const dispatch = useDispatch();
    const [orderList, setOrderList] = useState([])
    console.log(orderList)
    async function getAllOrders() {
        const response = await dispatch(getOrders());
        setOrderList(response?.payload)
    }
    useEffect(() => {
        getAllOrders()
    }, [])
    return (
        <Layout title={"User - Orders Page"}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>All Orders</h1>
                        {orderList?.map((order, i) => {
                            return (
                                <div className="border shadow">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th className="col">#</th>
                                                <th className="col">Status</th>
                                                <th className="col">Buyer</th>
                                                <th className="col">Order Date</th>
                                                <th className="col">Payment</th>
                                                <th className="col">Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{order?.status}</td>
                                                <td>{order?.buyer?.name}</td>
                                                <td>{moment(order?.createAt).fromNow()}</td>
                                                <td>{order?.payment?.success ? "Success" : "Failed"}</td>
                                                <td>{order?.products?.length}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="container">
                                        {order?.products?.map((p) => (
                                            <div className="row mb-2 p-3 card flex-row" key={p._id}>
                                                <div className="col-md-4">
                                                    <img
                                                        src={p.image.secure_url}
                                                        className="card-img-top"
                                                        alt={p.name}
                                                        width="100px"
                                                        height={"100px"}
                                                    />
                                                </div>
                                                <div className="col-md-8">
                                                    <p>{p.name}</p>
                                                    <p>{p.description.substring(0, 30)}</p>
                                                    <p>Price : {p.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders