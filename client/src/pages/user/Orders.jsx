import { useDispatch, useSelector } from "react-redux"
import Layout from "../../components/Layout/Layout"
import { useEffect, useState } from "react";
import { getOrders } from "../../redux/slices/orderSlice";
import moment from "moment"
import dateFormeter from "../../helper/dateFormater";
import "../../styles/Orders.css";
import UserMenu from "../../components/Layout/UserMenu"

// import UserMenu from "../../components/Layout/userMenu";
function Orders() {
    const dispatch = useDispatch();
    const [orderList, setOrderList] = useState([])
    async function getAllOrders() {
        const response = await dispatch(getOrders());
        setOrderList(response?.payload)
    }
    useEffect(() => {
        getAllOrders()
    }, [])
    return (
        <Layout title={"User - Orders Page"}>
            <div className="container-fluid col-12 col-lg-8 my-4 min-h-auto m-auto">
                <div className="row gap-2 gap-md-2 gap-lg-0">
                    <div className="col-md-12 col-lg-3 p-0">
                        <UserMenu />
                    </div>
                    <div className="col-md-12 col-lg-9 p-0">
                        <h1 className="text-center">All Orders</h1>
                        {orderList?.map((order, i) => {
                            return (
                                <div key={i} className="border overflow-scroll  mb-3 orderCardBox">
                                    <table className="table bg-success">
                                        <thead>
                                            <tr className="bg-success">
                                                <th className="col bg-primary text-white">#</th>
                                                <th className="col bg-primary text-white">Status</th>
                                                <th className="col bg-primary text-white">Buyer</th>
                                                <th className="col bg-primary text-white">Order Date</th>
                                                <th className="col bg-primary text-white">Payment</th>
                                                <th className="col bg-primary text-white">Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{order?.status}</td>
                                                <td>{order?.buyer?.name}</td>
                                                <td>{dateFormeter(order?.createdAt)}</td>
                                                <td>{order?.payment?.success ? "Success" : "Failed"}</td>
                                                <td>{order?.products?.length}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className=" d-md-flex flex-column">
                                        {order?.products?.map((p) => (
                                            <div className=" p-2 d-md-flex justify-content-between " key={p._id}>


                                                <div className="col-md-8">
                                                    <p>{p.name}</p>
                                                </div>
                                                <div className="col-md-2">
                                                    <p>Price : {p.price}</p>
                                                </div>
                                                <div className="col-md-0">
                                                    <img
                                                        src={p?.image}
                                                        className="card-img-top"
                                                        alt={p.name}
                                                        style={{ width: "40px" }}
                                                    />
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