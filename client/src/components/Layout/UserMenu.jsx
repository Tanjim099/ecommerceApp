import { NavLink, useNavigate } from "react-router-dom";
import { FaUser, FaFirstOrder } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useEffect, useState } from "react";


function UserMenu() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userData, setUserData] = useState([])
    async function onLogout(e) {
        e.preventDefault();
        const response = await dispatch(logout());
        if (response?.payload?.data) {
            navigate("/")
        }
    }

    useEffect(() => {
        const getUserData = localStorage.getItem("userData")
        let userData = JSON.parse(getUserData);
        setUserData(userData)
    }, [])
    return (
        <>
            <div className="text-center">
                <div className="list-group  d-flex gap-2">
                    <div className="bg-white d-flex align-items-center gap-2 p-2 shadow">
                        <div>
                            <img className="" style={{ width: "40px" }} src="https://cdn-icons-png.flaticon.com/512/219/219983.png" alt="" />
                        </div>
                        <div>
                            <p className="m-0" style={{ fontSize: "13px" }}>Hello,</p>
                            <p className="m-0">{userData?.name}</p>
                        </div>
                    </div>
                    <NavLink
                        to="/dashboard/user/profile"
                        className="list-group-item list-group-item-action shadow rounded-0 d-flex align-items-center justify-content-center gap-1"
                    >
                        <FaUser />Profile
                    </NavLink>
                    <NavLink
                        to="/dashboard/user/orders"
                        className="list-group-item list-group-item-action shadow rounded-0 d-flex align-items-center justify-content-center gap-1"
                    >
                        <FaFirstOrder /> Orders
                    </NavLink>
                    <NavLink
                        onClick={onLogout}
                        to="/"
                        className="list-group-item list-group-item-action shadow rounded-0 align-self-center d-flex align-items-center justify-content-center gap-1"
                    >
                        <IoLogOutSharp /> Logout
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default UserMenu