import { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
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

    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    useEffect(() => {
        fetchData()
    }, [])

    //===========================

    const { ordersByMonthly } = useSelector((state) => state?.payment);
    console.log(ordersByMonthly)

    async function fetcheOrdersByMonthly() {
        const currentDate = new Date();
        console.log(currentDate)
        const year = currentDate.getFullYear();
        const months = currentDate.getMonth() + 1;
        console.log(months)
        const response = await dispatch(getOrdersByMonth([year, months]));
        console.log(response)
    }

    const [orderData, setOrderData] = useState([[12, 1, 12], [13, 43, 12, 33], [21, 11, 34]])
    const newOrder = ordersByMonthly.map((order) => {
        // setOrderData(order?.payment?.transaction?.amount)
        return order?.payment?.transaction?.amount
        // console.log(order?.payment?.transaction?.amount)
    })

    console.log(newOrder)
    // setOrderData(newOrder)

    useEffect(() => {
        fetcheOrdersByMonthly()
    }, [])

    const salesData = {
        labels: ["Jan", "Fab", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        // labels: ordersByMonthly.map((order) => order.createdAt),
        fontColor: "white",
        datasets: [
            {
                label: "Sales / Month",
                data: orderData,
                // data: ordersByMonthly.map((order) => {
                //     order?.payment?.transaction?.amount
                //     console.log(order?.payment?.transaction?.amount)
                // }),
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
                    {/* <div className='main-title'>
                        <h3>DASHBOARD</h3>
                    </div> */}

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

                    <div className='charts'>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="pv" fill="#8884d8" />
                                <Bar dataKey="uv" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>

                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                width={500}
                                height={500}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>


                    </div>
                    <div className="d-flex justify-content-center gap-5 w-100">
                        <div className="h-[400px] w-[60%] bg-white shadow-sm" style={{ width: "60%" }}>
                            <div className="m-auto" style={{ width: "90%" }}>
                                <Bar height={"200px"} className="h-[600px] " data={salesData} options={{ responsive: true }} />
                            </div>
                        </div>
                        <div className="bg-white  w-[40%] p-5 shadow-sm" style={{ width: "40%" }}>
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