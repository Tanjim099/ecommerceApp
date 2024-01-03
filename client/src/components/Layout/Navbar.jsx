import "../../styles/Navbar.css"
import { MdMarkEmailUnread, MdAppSettingsAlt } from "react-icons/md"
import { FaWhatsappSquare, FaCartPlus, FaBars, FaFirstOrderAlt } from "react-icons/fa"
import { AiFillHeart } from "react-icons/ai"
import { BiSolidUserCircle } from "react-icons/bi";
import { IoMdLogIn } from "react-icons/io";
import { MdLogin, MdConnectWithoutContact } from "react-icons/md";
import { MdOutlinePermDeviceInformation } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { FaShopLock } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "antd";
import { logout } from "../../redux/slices/authSlice"
import { getCategories } from "../../redux/slices/categorySlice"
import { useEffect, useState } from "react"
import SearchInput from "../Form/SearchInput"
import { searchProduct } from "../../redux/slices/searchSlice";
function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const [userData, setUserData] = useState([])
    const [categories, setCategories] = useState([])
    async function onLogout(e) {
        e.preventDefault();
        const response = await dispatch(logout());
        if (response?.payload?.data) {
            navigate("/")
        }
    }
    async function onLoadCategories() {
        const response = await dispatch(getCategories())
        if (response?.payload.success) {
            setCategories(response?.payload?.category)
        }
    }


    const [searchQuery, setSearchQuery] = useState('');
    // const products = useSelector((state) => state.products);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchQuery == " ") return
        const response = await dispatch(searchProduct(searchQuery));
        console.log(response)
        if (response?.payload?.length > 1) {
            navigate("/search")
        }
    };

    const { items } = useSelector((state) => state?.cart);
    useEffect(() => {
        onLoadCategories()
        const getUserData = localStorage.getItem("userData")
        let userData = JSON.parse(getUserData);
        setUserData(userData)
    }, [])
    return (
        <>
            <div>
                <div className="bigNavbar">
                    <header>
                        <div className="header-content-top border-0">
                            <div className="content d-flex gap-5 text-white">
                                <span><FaWhatsappSquare /> (00)0000-0000</span> |
                                <span> <MdMarkEmailUnread />help@shoppingcart.com</span> |
                                <span> <MdAppSettingsAlt />Download App</span>
                            </div>
                        </div>
                        <div className="containers">
                            <NavLink to="/" className="text-decoration-none border-0"><strong className="logo"><i className="fa fa-heart" />LOGO</strong></NavLink>
                            <label className="open-search" htmlFor="open-search">
                                <i className="fa fa-search" />
                                <input className="input-open-search" id="open-search" type="checkbox" name="menu" />
                                <div className="search">
                                    {/* <button className="button-search"><i className="fa fa-search" /></button>
                                    <input type="text" placeholder="What are you looking for?" className="input-search" /> */}
                                    <SearchInput />
                                </div>
                            </label>
                            <nav className="nav-content border-0">
                                <ul className="nav-content-list mb-0 pt-3 pb-3  border-0">
                                    <li className="nav-content-item account-login mb-0 border-0">
                                        <label className="open-menu-login-account  border-0" htmlFor="open-menu-login-account">
                                            <input className="input-menu border-0" id="open-menu-login-account" type="checkbox" name="menu" />
                                            <BiSolidUserCircle />
                                            {!isLoggedIn ? (
                                                <>
                                                    <span className="login-text fs-4"><strong className="fs-6">Account</strong></span>
                                                    <ul className="login-list mb-0 pb-0 border-0">
                                                        <li className="login-list-item"><NavLink to="/login" className="border-0 account-login-list-link d-block">Login</NavLink></li>
                                                        <li className="login-list-item"><NavLink to="/register" className="border-0 account-login-list-link d-block">Register</NavLink></li>

                                                    </ul>
                                                </>
                                            ) : (

                                                <>
                                                    <span className="login-text"><strong>{userData?.name}</strong></span>
                                                    <ul className="login-list  pb-0 border-0">
                                                        <li className="login-list-item"><NavLink to="/dashboard/user/profile" className="border-0 account-login-list-link d-block">Profile</NavLink></li>
                                                        <li className="login-list-item">
                                                            {userData?.role == "ADMIN" ? (
                                                                <NavLink to="/dashboard/admin" className="border-0 account-login-list-link d-block">Dashboard</NavLink>
                                                            ) : (
                                                                <NavLink to="/dashboard/user/orders" className="border-0 account-login-list-link d-block">Orders</NavLink>
                                                            )}
                                                        </li>
                                                        <li className="login-list-item"><NavLink className="border-0 account-login-list-link d-block" onClick={onLogout}>logout</NavLink></li>
                                                    </ul>
                                                </>
                                            )}
                                        </label>
                                    </li>
                                    <li className="nav-content-item mb-0"><NavLink className="nav-content-link border-0"  ><AiFillHeart /></NavLink></li>
                                    <li className="nav-content-item mb-0 border-0">
                                        {/* <NavLink to="/cart" className="nav-content-link border-0">< FaCartPlus />
                                        </NavLink> */}
                                        <NavLink to="/cart" className="">
                                            <Badge count={items?.length || 0} showZero className="mr-2">
                                                <NavLink className="nav-content-link border-0">
                                                    < FaCartPlus />
                                                </NavLink>
                                            </Badge>
                                        </NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="nav-containers">
                            <nav className="all-category-nav">
                                <label className="open-menu-all" htmlFor="open-menu-all">
                                    <input className="input-menu-all" id="open-menu-all" type="checkbox" name="menu-open" />
                                    <NavLink to="/category" className="all-navigator border-0"><i className="fa fa-bars" /> <span>All category</span> <i className="fa fa-angle-down" />
                                        <i className="fa fa-angle-up" />
                                    </NavLink>
                                    <ul className="all-category-list">
                                        {/* <li className="all-category-list-item"><a href="https://www.cupcom.com.br/" className="all-category-list-link">Smartphones<i className="fas fa-angle-right" /></a>
                                        <div className="category-second-list">
                                            <ul className="category-second-list-ul">
                                                <li className="category-second-item"><NavLink>Iphone 10</NavLink></li>
                                                <li className="category-second-item"><NavLink>Galaxy Note 10</NavLink></li>
                                                <li className="category-second-item"><NavLink>Motorola One </NavLink></li>
                                                <li className="category-second-item"><NavLink>Galaxy A80 </NavLink></li>
                                                <li className="category-second-item"><NavLink>Galaxy M </NavLink></li>
                                                <li className="category-second-item"><NavLink>Huaway P30 </NavLink></li>
                                            </ul>
                                            <div className="img-product-menu"><img src="https://i.ibb.co/Vvndkmy/banner.jpg" /></div>
                                        </div>
                                    </li> */}
                                        {categories?.map((c) => {
                                            return (
                                                <>
                                                    <li className="all-category-list-item"><NavLink to={`/category/${c.slug}`} className="all-category-list-link border-0">{c.name}</NavLink></li>
                                                </>
                                            )
                                        })}
                                        {/* <li className="all-category-list-item"><NavLink className="all-category-list-link border-0">Furniture</NavLink></li>
                                        <li className="all-category-list-item"><NavLink className="all-category-list-link">Toys</NavLink></li>
                                        <li className="all-category-list-item"><NavLink className="all-category-list-link">Computing</NavLink></li>
                                        <li className="all-category-list-item"><NavLink className="all-category-list-link">Games</NavLink></li>
                                        <li className="all-category-list-item"><NavLink className="all-category-list-link">Automotive</NavLink></li> */}
                                    </ul>
                                </label>
                            </nav>
                            <nav className="featured-category">
                                <ul className="nav-row">
                                    <li className="nav-row-list"><NavLink to="/category/smart-phones" className="nav-row-list-link border-0">Smart Phones</NavLink></li>
                                    <li className="nav-row-list"><NavLink to="/category/smart-watch" className="nav-row-list-link border-0">Smart Watch</NavLink></li>
                                    <li className="nav-row-list"><NavLink to="/category/laptop" className="nav-row-list-link border-0">Laptop</NavLink></li>
                                    <li className="nav-row-list"><NavLink to="/category/ipad" className="nav-row-list-link border-0">IPad</NavLink></li>
                                    <li className="nav-row-list"><NavLink to="/category/camera" className="nav-row-list-link border-0">Camera</NavLink></li>
                                    <li className="nav-row-list"><NavLink to="/category/games" className="nav-row-list-link border-0">Games</NavLink></li>
                                </ul>
                            </nav>
                        </div>
                    </header >
                    {/* <div style={{ display: 'block', margin: '0 auto', textAlign: 'center', marginTop: 50 }}>
                    <div className="g-ytsubscribe" data-channelid="UCpXTlrDWlpN46PKieJ-FcPw" data-layout="full" data-count="hidden" />
                </div>
                <div style={{ margin: '50px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <a style={{ display: 'block', textAlign: 'center', color: '#555', textDecoration: 'none', marginRight: 15 }} href="https://www.cupcom.com.br/" target="_blank"><i className="fas fa-home" style={{ color: '#1da1f2', marginRight: 5 }} />More compoments: cupcom.com.br</a>
                </div> */}
                </div >
                {/* ================= */}
                {/* small navbar */}
                <div className="smallNavbar">
                    <div>
                        <div className="d-flex bg-white " style={{ backgroundColor: "white" }}>
                            <nav className="navbar navbar-dark shadow-none fixed-top" style={{ backgroundColor: "#007aff" }} >
                                <div className="container-fluid h-100">
                                    <div className="d-flex gap-2 ">
                                        <button className="navbar-toggler border-0 text-white bg-transparent  focus-ring" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                                            {/* <span className="navbar-toggler-icon text-white " /> */}
                                            <FaBars />
                                        </button>
                                        <NavLink to="/" className="navbar-brand">LOGO</NavLink>
                                    </div>
                                    <div>
                                        {/* <div className="bg-white px-2 m-0"><a className="navbar-brand" href="#" style={{ color: "#007aff" }}>< FaCartPlus /></a><span>0</span></div> */}
                                        <Badge count={items?.length || 0} showZero className="mr-2">
                                            <NavLink to="/cart" className="navbar-brand p-0 m-2">
                                                < FaCartPlus />
                                            </NavLink>
                                        </Badge>
                                    </div>
                                    <div className="offcanvas offcanvas-end text-bg-dark" tabIndex={-1} id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                                        <div className="offcanvas-header" style={{ backgroundColor: "rgb(0, 122, 255)" }}>
                                            <NavLink to="/" className="offcanvas-title" id="offcanvasDarkNavbarLabel">LOGO</NavLink>
                                            <button type="button" className="btn-close btn-close-white text-white" data-bs-dismiss="offcanvas" aria-label="Close" />
                                        </div>
                                        <div className="offcanvas-body bg-white text-black">
                                            <ul className="text-capitalize d-flex flex-column gap-2 fs-6 text-dark-emphasis">
                                                {/* <li className="nav-item text-black"> */}
                                                {/* className="navbar-nav justify-content-end flex-grow-1 pe-3 text-black" */}
                                                {!isLoggedIn ? (
                                                    <>
                                                        <li className="d-flex align-items-center gap-2"><IoMdLogIn /><NavLink to="/login" className="nav-link  text-black" aria-current="page">Login</NavLink></li>
                                                        <li className="d-flex align-items-center gap-2"><MdLogin /><NavLink to="/register" className="nav-link text-black" aria-current="page">Register</NavLink></li>
                                                    </>
                                                ) : (
                                                    <li className="d-flex align-items-center gap-2">
                                                        <BiSolidUserCircle /> <NavLink to="/dashboard/user/profile" className="nav-link" aria-current="page">Profile</NavLink>
                                                    </li>
                                                )}
                                                {/* </li> */}
                                                <li className="d-flex align-items-center gap-2">
                                                    < FaCartPlus />
                                                    <NavLink to="/cart" className="nav-link">My Cart</NavLink>
                                                </li>
                                                <li className="d-flex align-items-center gap-2">
                                                    < FaFirstOrderAlt />
                                                    <NavLink to="/dashboard/user/orders" className="nav-link">My Orders</NavLink>
                                                </li>
                                                <li className="nav-item dropdown d-flex align-items-center gap-2">
                                                    <TbCategoryFilled />
                                                    <NavLink to="/category" className=" dropdown-toggle text-dark-emphasis" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        All Category
                                                    </NavLink>
                                                    <ul className="dropdown-menu dropdown-menu-dark text-dark-emphasis">
                                                        {categories?.map((c) => {
                                                            return (
                                                                <>
                                                                    <li className="text-capitalize"><NavLink to={`/category/${c.slug}`} className="dropdown-item">{c.name}</NavLink></li>
                                                                </>
                                                            )
                                                        })}
                                                        {/* <li><a className="dropdown-item" href="#">Action</a></li>
                                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                                        <li>
                                                            <hr className="dropdown-divider" />
                                                        </li>
                                                        <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                                                    </ul>
                                                </li>
                                                <li className="d-flex align-items-center gap-2">
                                                    < MdOutlinePermDeviceInformation />
                                                    <NavLink to="/dashboard/user/orders" className="nav-link">About Us</NavLink>
                                                </li>
                                                <li className="d-flex align-items-center gap-2">
                                                    < MdConnectWithoutContact />
                                                    <NavLink to="/dashboard/user/orders" className="nav-link">Contact Us</NavLink>
                                                </li>
                                                <li className="d-flex align-items-center gap-2">
                                                    < FaShopLock />
                                                    <NavLink to="/dashboard/user/orders" className="nav-link">Privacy Policy</NavLink>
                                                </li>

                                            </ul>
                                            {isLoggedIn ? (
                                                <button onClick={onLogout} className="position-absolute bg-transparent border-0 fw-medium " style={{ bottom: "10px" }}>Loguot</button>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                    <div className="w-100  py-2 searchBox" style={{ padding: "0px 13px", backgroundColor: "#007aff" }}>
                        <div className="w-100">

                            <div className="input-group rounded " >
                                <input type="text" value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)} className="form-control" placeholder="search here..." aria-label="Recipient's username" aria-describedby="button-addon2" />
                                <button onClick={handleSearch} className="btn btn-outline-secondary bg-transparent text-white" type="button" id="button-addon2" style={{ borderRadius: "0px 6px 6px 0px", border: "1px solid white" }}>Search</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Navbar