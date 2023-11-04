import { useEffect, useState } from "react"
import AdminMenu from "../../components/Layout/AdminMenu"
import Layout from "../../components/Layout/Layout"
import { useDispatch } from "react-redux";
import { getAllOrders } from "../../redux/slices/orderSlice";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;



function AdminOrders() {
    const [status, setStatus] = useState(["Not Process", "Processing", "Shopped", "Delivered", "Cancel"]);
    const [changeStatus, setChangeStatus] = useState("");
    const dispatch = useDispatch();
    const [orderList, setOrderList] = useState([])
    async function onLoadGetAllOrders() {
        const response = await dispatch(getAllOrders());
        setOrderList(response?.payload)
    }
    useEffect(() => {
        onLoadGetAllOrders()
    }, [])
    return (
        <Layout title={"All Orders"}>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">All Orders</h1>
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
                                            <td>
                                                <Select
                                                    bordered={false}
                                                    onChange={(value) => setChangeStatus(value)}
                                                    defaultValue={order?.status}
                                                >
                                                    {status?.map((s, i) => {
                                                        return (
                                                            <Option key={i} value={status}>
                                                                {s}
                                                            </Option>
                                                        )
                                                    })}
                                                </Select>
                                            </td>
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
        </Layout>
    )
}

export default AdminOrders