import { Link, NavLink, useNavigate } from "react-router-dom"
import { FaShopware } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/slices/authSlice";
import { useEffect, useState } from "react";
import SearchInput from "../Form/SearchInput";
import { getCategories } from "../../redux/slices/categorySlice";
import { Badge } from "antd";
function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const getUserData = localStorage.getItem("userData")
    let userData = JSON.parse(getUserData);
    const [categories, setCategories] = useState([])
    // console.log(userData)
    // const userData = useSelector((state) => state?.auth.data);
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

    const { items } = useSelector((state) => state?.cart);
    useEffect(() => {
        onLoadCategories()
    }, [])
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse px-4" id="navbarTogglerDemo01">
                        <Link to="/" className="navbar-brand">
                            <FaShopware /> {" "}
                            LOGO
                        </Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <SearchInput />
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link" aria-current="page">Home</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    to={"/categories"}
                                    data-bs-toggle="dropdown"
                                >
                                    Categories
                                </Link>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to={"/categories"}>
                                            All Categories
                                        </Link>
                                    </li>
                                    {categories?.map((c) => (
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to={`/category/${c.slug}`}
                                            >
                                                {c.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            {!isLoggedIn ? (<>
                                <li className="nav-item">
                                    <NavLink to="/register" className="nav-link" >
                                        Register
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-link" >
                                        Login
                                    </NavLink>
                                </li>
                            </>) : (
                                <>
                                    <li className="nav-item dropdown">
                                        <NavLink
                                            className="nav-link dropdown-toggle"
                                            href="#"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {userData?.name}
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <NavLink to={`/dashboard/${userData?.role == "ADMIN" ? "admin" : "user"}`} className="dropdown-item">
                                                    Dashboard
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    onClick={onLogout}
                                                    to="/login"
                                                    className="dropdown-item"
                                                >
                                                    Logout
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                </>
                            )}
                            <li className="nav-item">
                                <Badge count={items?.length} showZero>
                                    <NavLink to="/cart" className="nav-link">
                                        Cart
                                    </NavLink>
                                </Badge>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header