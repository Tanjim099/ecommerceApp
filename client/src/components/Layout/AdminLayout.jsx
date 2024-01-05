import React, { useState } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill, BsFillUsbCFill }
    from 'react-icons/bs';
import { FaFirstOrder } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai"
import "../../styles/AdminLayout.css"
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

function AdminLayout({ children }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    async function onLogout(e) {
        e.preventDefault();
        const response = await dispatch(logout());
        if (response?.payload?.data) {
            navigate("/")
        }
    }
    return (
        <>
            <div className='d-flex justify-content-between'>
                <input type="checkbox" id="menu-toggle" />
                <div className="sidebar">
                    <div className="side-header">
                        <h3>L<span>ogo</span></h3>
                    </div>
                    <div className="side-content">

                        <div className="side-menu">
                            <ul>
                                <li className='border-bottom border-dark'>
                                    <NavLink to="/dashboard/admin" className="active">
                                        <span className="las la-home" />
                                        <small>Dashboard</small>
                                    </NavLink>
                                </li>
                                <li className='border-bottom border-dark'>
                                    <NavLink to="/dashboard/admin/users" className="d-flex item-center justify-content-center gap-1">
                                        <BsPeopleFill className='text-white' />
                                        <small>Users</small>
                                    </NavLink>
                                </li>
                                <li className='border-bottom border-dark'>
                                    <NavLink to="/dashboard/admin/orders" className="d-flex item-center justify-content-center gap-1">
                                        <FaFirstOrder className='text-white' />
                                        <small>Orders</small>
                                    </NavLink>
                                </li>

                                <li className='border-bottom border-dark'>
                                    <NavLink to="/dashboard/admin/all-products" className="d-flex item-center justify-content-center gap-1">
                                        <BsFillArchiveFill className='text-white' />
                                        <small>Products</small>
                                    </NavLink>
                                </li>
                                <li className='border-bottom border-dark'>
                                    <NavLink to="/dashboard/admin/create-product" className="d-flex item-center justify-content-center gap-1">
                                        <IoAddCircle className='text-white' />
                                        <small>Add Product</small>
                                    </NavLink>
                                </li>

                                <li className='border-bottom border-dark'>
                                    <NavLink to="/dashboard/admin/create-category">
                                        <BiSolidCategory className='text-white' />
                                        <small>Categories</small>
                                    </NavLink>
                                </li>
                                <li className='border-bottom border-dark'>
                                    <a href>
                                        <span className="las la-tasks" />
                                        <small>Tasks</small>
                                    </a>
                                </li>

                                <li className='border-bottom border-dark w-100 position-absolute bottom-0'>
                                    <NavLink className="d-flex item-center justify-content-center gap-1">
                                        <MdLogout className='text-white' />
                                        <small onClick={onLogout}>Logout</small>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="main-content bg-white">
                    <div style={{ minWidth: "100%", backgroundColor: "white" }}>
                        <header className='header  d-flex justify-content-between' style={{ width: "100%" }}>
                            <label htmlFor="menu-toggle">
                                <AiOutlineMenu />
                            </label>


                        </header>
                    </div>
                    {children}
                </div>
            </div>

        </>
    )
}

export default AdminLayout;