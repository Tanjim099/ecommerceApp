import { AiFillHome } from "react-icons/ai";
import { TbCategoryFilled } from "react-icons/tb";
import { FaFirstOrder, FaUserCircle } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md"
import { NavLink } from "react-router-dom";
import { FaWhatsappSquare, FaCartPlus, FaBars } from "react-icons/fa"
import { useSelector } from "react-redux";
function FooterNavbar() {
    return (
        <div>

            <div className="PhoneNavbar text-white d-flex justify-content-evenly" style={{ width: "100%", height: "7vh", backgroundColor: "#007aff", position: "fixed", bottom: "0" }}>
                <NavLink to="/" className="d-flex flex-column align-items-center text-white text-decoration-none border-0 justify-content-center">
                    <AiFillHome />
                    <span className="" style={{ fontSize: "12px" }}>Home</span>
                </NavLink>
                <NavLink to="/category" className="d-flex flex-column align-items-center text-white text-decoration-none border-0 justify-content-center">
                    <TbCategoryFilled />
                    <span style={{ fontSize: "12px" }}>All Category</span>
                </NavLink>
                <NavLink to="/dashboard/user/orders" className="d-flex flex-column align-items-center text-white text-decoration-none border-0 justify-content-center">
                    <FaFirstOrder />
                    <span style={{ fontSize: "12px" }}>My Orders</span>
                </NavLink>
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <MdHelpCenter />
                    <span style={{ fontSize: "12px" }}>Help</span>
                </div>
                <button className="navbar-toggler border-0 text-white bg-transparent d-flex flex-column align-items-center justify-content-center" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                    <FaUserCircle />
                    <span style={{ fontSize: "12px" }}>Account</span>
                </button>
            </div>
        </div>
    )
}

export default FooterNavbar