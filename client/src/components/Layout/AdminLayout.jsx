import React, { useState } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill, BsFillUsbCFill }
    from 'react-icons/bs'
import { AiOutlineMenu } from "react-icons/ai"
import "../../styles/AdminLayout.css"
import { NavLink } from 'react-router-dom';

function AdminLayout({ children }) {
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
                                        <BsFillArchiveFill className='text-white' />
                                        <small>Users</small>
                                    </NavLink>
                                </li>
                                <li className='border-bottom border-dark'>
                                    <NavLink to="/dashboard/admin/orders" className="d-flex item-center justify-content-center gap-1">
                                        <BsFillArchiveFill className='text-white' />
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
                                        <BsPeopleFill className='text-white' />
                                        <small>Add Product</small>
                                    </NavLink>
                                </li>

                                <li className='border-bottom border-dark'>
                                    <NavLink to="/dashboard/admin/create-category">
                                        <span className="las la-envelope" />
                                        <small>Categories</small>
                                    </NavLink>
                                </li>
                                <li className='border-bottom border-dark'>
                                    <a href>
                                        <span className="las la-tasks" />
                                        <small>Tasks</small>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="main-content bg-white">
                    <div style={{ minWidth: "100%", backgroundColor: "white" }}>
                        <header className='header  d-flex justify-content-between' style={{ width: "90%" }}>
                            <label htmlFor="menu-toggle">
                                <AiOutlineMenu />
                            </label>
                            <div className="header-content d-flex justify-content-between">
                                <nav className=" navbar-expand-lg ">
                                    <div className id="navbarNavDropdown">
                                        <ul className="navbar-nav">
                                            <li className="nav-item dropdown position-relative end-0" >

                                                <span classname="nav-link dropdown-toggle fs-6" role="button" data-bs-toggle="dropdown" aria-expanded="false">Admin</span>
                                                <ul className="dropdown-menu mt-4 w-auto end-0  position-absolute">
                                                    <li className="text-center">Logout</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>

                                {/* <div className="header-menu position-relative right-0">
                                <div className="user">
                                    <BsFillUsbCFill />
                                    <BsFillUsbCFill />
                                    <span>Logout</span>
                                </div>
                            </div> */}
                            </div>

                        </header>
                    </div>
                    {children}
                </div>
            </div>

        </>
    )
}

export default AdminLayout;