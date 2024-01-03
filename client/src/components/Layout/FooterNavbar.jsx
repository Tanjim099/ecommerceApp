import { AiFillHome } from "react-icons/ai";
import { TbCategoryFilled } from "react-icons/tb";
import { FaFirstOrder, FaUserCircle } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md"
import { NavLink } from "react-router-dom";
import { FaWhatsappSquare, FaCartPlus, FaBars } from "react-icons/fa"
import { useSelector } from "react-redux";
function FooterNavbar() {
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    return (
        <div>
            {/* <div className="offcanvas offcanvas-end text-bg-dark" tabIndex={-1} id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Dark offcanvas</h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" />
                </div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li className="nav-item">
                            {!isLoggedIn ? (
                                <>
                                    <NavLink to="/login" className="nav-link active" aria-current="page">Login</NavLink>
                                    <NavLink to="/register" className="nav-link active" aria-current="page">Register</NavLink>
                                </>
                            ) : (
                                <NavLink to="/dashboard/user/profile" className="nav-link active" aria-current="page">Profile</NavLink>
                            )}
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                    </ul>

                </div>
            </div> */}
            <div className="PhoneNavbar text-white d-flex justify-content-evenly" style={{ width: "100%", height: "7vh", backgroundColor: "#007aff", position: "fixed", bottom: "0" }}>
                <NavLink to="/" className="d-flex flex-column align-items-center text-white text-decoration-none border-0 justify-content-center">
                    <AiFillHome />
                    <span className="" style={{ fontSize: "12px" }}>Home</span>
                </NavLink>
                {/* <NavLink> */}
                <NavLink to="/category" className="d-flex flex-column align-items-center text-white text-decoration-none border-0 justify-content-center">
                    <TbCategoryFilled />
                    <span style={{ fontSize: "12px" }}>All Category</span>
                </NavLink>
                {/* </NavLink> */}
                <NavLink to="/dashboard/user/orders" className="d-flex flex-column align-items-center text-white text-decoration-none border-0 justify-content-center">
                    <FaFirstOrder />
                    <span style={{ fontSize: "12px" }}>My Orders</span>
                </NavLink>
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <MdHelpCenter />
                    <span style={{ fontSize: "12px" }}>Help</span>
                </div>
                <button className="navbar-toggler border-0 text-white bg-transparent d-flex flex-column align-items-center justify-content-center" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                    {/* <span className="navbar-toggler-icon text-white " /> */}
                    <FaUserCircle />
                    <span style={{ fontSize: "12px" }}>Account</span>
                </button>
            </div>
        </div>
    )
}

export default FooterNavbar