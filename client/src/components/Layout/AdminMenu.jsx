import { NavLink } from "react-router-dom"
import {
    BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
    BsListCheck, BsMenuButtonWideFill, BsFillGearFill
}
    from 'react-icons/bs'

function AdminMenu({ openSidebarToggle, OpenSidebar }) {
    return (
        <>
            {/* <div className="text-center">
                <div className="list-group">
                    <h4>Admin Panel</h4>
                    <NavLink
                        to="/dashboard/admin/create-category"
                        className="list-group-item list-group-item-action"
                    >
                        Create Category
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/create-product"
                        className="list-group-item list-group-item-action"
                    >
                        Create Product
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/all-products"
                        className="list-group-item list-group-item-action"
                    >
                        All Products
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/orders"
                        className="list-group-item list-group-item-action"
                    >
                        Orders
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/users"
                        className="list-group-item list-group-item-action"
                    >
                        Users
                    </NavLink>
                </div>
            </div> */}

            <>
                <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
                    <div className='sidebar-title'>
                        <div className='sidebar-brand'>
                            <BsCart3 className='icon_header' /> SHOP
                        </div>
                        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
                    </div>

                    <ul className='sidebar-list'>
                        <li className='sidebar-list-item'>
                            <NavLink to="/dashboard/admin">
                                <BsGrid1X2Fill className='icon' /> Dashboard
                            </NavLink>
                        </li>
                        <li className='sidebar-list-item'>
                            <NavLink to="/dashboard/admin/all-products">
                                <BsFillArchiveFill className='icon' /> Products
                            </NavLink>
                        </li>
                        <li className='sidebar-list-item'>
                            <NavLink to="/dashboard/admin/create-product">
                                <BsFillArchiveFill className='icon' /> Add Product
                            </NavLink>
                        </li>
                        <li className='sidebar-list-item'>
                            <NavLink to="">
                                <BsFillGrid3X3GapFill className='icon' /> Categories
                            </NavLink>
                        </li>
                        <li className='sidebar-list-item'>
                            <NavLink to="">
                                <BsPeopleFill className='icon' /> Customers
                            </NavLink>
                        </li>
                        <li className='sidebar-list-item'>
                            <NavLink to="">
                                <BsListCheck className='icon' /> Inventory
                            </NavLink>
                        </li>
                        <li className='sidebar-list-item'>
                            <NavLink to="">
                                <BsMenuButtonWideFill className='icon' /> Reports
                            </NavLink>
                        </li>
                        <li className='sidebar-list-item'>
                            <NavLink to="">
                                <BsFillGearFill className='icon' /> Setting
                            </NavLink>
                        </li>
                    </ul>
                </aside>
                {/* small device  */}
                <aside id="samllDevice" className={openSidebarToggle ? "sidebar-responsive" : ""}>
                    <div className='samllDevice-title'>
                        <div className='samllDevice-brand'>
                            <BsCart3 className='icon_header' /> SHOP
                        </div>
                        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
                    </div>

                    <ul className='samllDevice-list'>
                        <li className='samllDevice-list-item'>
                            <a href="">
                                <BsGrid1X2Fill className='icon' />
                            </a>
                        </li>
                        <li className='samllDevice-list-item'>
                            <a href="">
                                <BsFillArchiveFill className='icon' />
                            </a>
                        </li>
                        {/* <li className='samllDevice-list-item'>
                            <a href="">
                                <BsFillArchiveFill className='icon' />
                            </a>
                        </li> */}
                        <li className='samllDevice-list-item'>
                            <a href="">
                                <BsFillGrid3X3GapFill className='icon' />
                            </a>
                        </li>
                        <li className='samllDevice-list-item'>
                            <a href="">
                                <BsPeopleFill className='icon' />
                            </a>
                        </li>
                        <li className='samllDevice-list-item'>
                            <a href="">
                                <BsListCheck className='icon' />
                            </a>
                        </li>
                        <li className='samllDevice-list-item'>
                            <a href="">
                                <BsMenuButtonWideFill className='icon' />
                            </a>
                        </li>
                        <li className='samllDevice-list-item'>
                            <a href="">
                                <BsFillGearFill className='icon' />
                            </a>
                        </li>
                    </ul>
                </aside>
            </>
        </>
    )
}

export default AdminMenu