import { useEffect, useState } from "react"
import Layout from "../../components/Layout/Layout"
import { useDispatch } from "react-redux";
import { getAllOrders, orderStatus } from "../../redux/slices/orderSlice";
import moment from "moment";
import { Select } from "antd";
import AdminLayout from "../../components/Layout/AdminLayout";
import dateFormeter from "../../helper/dateFormater";
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

    const handleChange = async (orderId, value) => {
        const response = await dispatch(orderStatus([orderId, value]));
    }
    return (
        <AdminLayout>
            <div className="allOrdersContainer" style={{ marginTop: "60px" }}>

                {orderList?.map((order, i) => {
                    return (
                        <div key={i} className="border shadow  mt-3 bg-white overflow-auto">
                            <table className="table " style={{ width: "100%" }}>
                                <thead style={{ width: "100%" }}>
                                    <tr style={{ width: "100%" }}>
                                        <th scope="col" >#</th>
                                        <th className="">Status</th>
                                        <th className="">Buyer</th>
                                        <th className="">Order Date</th>
                                        <th className="">Payment</th>
                                        <th className="">Total Items</th>
                                        <th >Deliver Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>
                                            <Select
                                                bordered={false}
                                                onChange={(value) => handleChange(order._id, value)}
                                                defaultValue={order?.status}
                                            >
                                                {status?.map((s, i) => {
                                                    return (
                                                        <Option key={i} value={s}>
                                                            {s}
                                                        </Option>
                                                    )
                                                })}
                                            </Select>
                                        </td>
                                        <td>{order?.buyer?.name}</td>
                                        <td>{dateFormeter(order?.createdAt)}</td>
                                        <td>{order?.payment?.success ? "Success" : "Failed"}</td>
                                        <td>{order?.products?.length}</td>
                                        <td>{order?.buyer?.address}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="px-5 d-md-flex flex-column">
                                <table>
                                    <thead>
                                        <tr>
                                            <th >No</th>
                                            <th >Product Name</th>
                                            <th >Price</th>
                                            <th >Quantity</th>
                                            <th >Product Image</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order?.products?.map((p, i) => (

                                            <tr key={i}>
                                                <th scope="row">{i + 1}</th>
                                                <td>{p.name}</td>
                                                <td>{p.price}</td>
                                                <td>{p.itemQuantity}</td>
                                                <td><img className="" style={{ width: "50px" }} src={p?.image} alt="" /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                })}
            </div>
        </AdminLayout>
    )
}

export default AdminOrders