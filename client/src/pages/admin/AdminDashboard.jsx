import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import "../../styles/AdminDashboard.css"
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill }
    from 'react-icons/bs'
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, LineChart, Line } from "recharts";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title, BarElement } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import AdminLayout from "../../components/Layout/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../../redux/slices/statSlice";
import { getOrdersByMonth } from "../../redux/slices/paymentSlice";
ChartJS.register(ArcElement, BarElement, Tooltip, Legend, CategoryScale, LinearScale, Title)
function AdminDashboard() {
    const dispatch = useDispatch();
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const [statData, setStatData] = useState([]);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }

    async function fetchData() {
        const response = await dispatch(getStats());
        setStatData(response?.payload?.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    //===========================

    const { ordersByMonthly } = useSelector((state) => state?.payment);
    console.log(ordersByMonthly)

    async function fetcheOrdersByMonthly() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const months = currentDate.getMonth() + 1;
        const response = await dispatch(getOrdersByMonth([year, months]));
    }

    const [orderData, setOrderData] = useState([[12, 1, 12], [13, 43, 12, 33], [21, 11, 34]])
    const newOrder = ordersByMonthly.map((order) => {
        return order?.payment?.transaction?.amount
    })

    useEffect(() => {
        fetcheOrdersByMonthly()
    }, [])

    const salesData = {
        labels: ["Jan", "Fab", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        fontColor: "white",
        datasets: [
            {
                label: "Sales / Month",
                data: orderData,
                backgroundColor: ["red"],
                borderColor: ["white"],
                borderWidth: 2
            }
        ]
    }


    const userData = {
        labels: ["Users", "Products", "Orders"],
        datasets: [
            {
                label: "User Details",
                data: [statData?.users, statData?.products, statData?.orders],
                backgroundColor: ["#0363e8", "#f84d6a", "#059969"]

            }
        ]
    }
    return (
        <AdminLayout>
            <div className='grid-container w-100 bg-white ' style={{ height: "100vh" }}>
                <main className='main-container bg-white'>
                    <div className='main-cards'>
                        <div className='card text-white'>
                            <div className='card-inner'>
                                <h3 className=" text-white">PRODUCTS</h3>
                                <BsFillArchiveFill className='card_icon' />
                            </div>
                            <h1>{statData?.products}</h1>
                        </div>
                        <div className='card text-white'>
                            <div className='card-inner'>
                                <h3>CATEGORIES</h3>
                                <BsFillGrid3X3GapFill className='card_icon' />
                            </div>
                            <h1>{statData?.categories}</h1>
                        </div>
                        <div className='card text-white'>
                            <div className='card-inner'>
                                <h3>CUSTOMERS</h3>
                                <BsPeopleFill className='card_icon' />
                            </div>
                            <h1>{statData?.users}</h1>
                        </div>
                        <div className='card text-white'>
                            <div className='card-inner'>
                                <h3>ORDERS</h3>
                                <BsFillBellFill className='card_icon' />
                            </div>
                            <h1>{statData?.orders}</h1>
                        </div>
                    </div>
                    <div className=" row gap-3 gap-md-0 gap-lg-0 mt-4">
                        <div className="h-[400px] col-12 col-md-8 col-lg-8 bg-white shadow-sm" >
                            <div className="m-auto" style={{ width: "90%" }}>
                                <Bar height={"200px"} className="h-[600px] " data={salesData} options={{ responsive: true }} />
                            </div>
                        </div>
                        <div className="bg-white  col-12 col-md-4 col-lg-4 p-5 shadow-sm" >
                            <div className=" m-auto" style={{ width: "90%" }}>
                                <Pie data={userData} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </AdminLayout>
    )
}

export default AdminDashboard