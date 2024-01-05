import { Link, NavLink } from "react-router-dom"
import "../../styles/Footer.css"

function Footer() {
    const currentData = new Date();
    const currentYear = currentData.getFullYear();
    return (
        <div>
            <div className="footer-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <h4 className="footer-heading">Funda E-Commerce</h4>
                            <div className="footer-underline" />
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                            </p>
                        </div>
                        <div className="col-md-3">
                            <h4 className="footer-heading">Quick Links</h4>
                            <div className="footer-underline" />
                            <div className="mb-2"><NavLink to="/" className="text-white border-0">Home</NavLink></div>
                            <div className="mb-2"><NavLink to="/about" className="text-white border-0">About Us</NavLink></div>
                            <div className="mb-2"><NavLink to="/#" className="text-white border-0">Contact Us</NavLink></div>
                            <div className="mb-2"><NavLink to="/#" className="text-white border-0">Blogs</NavLink></div>
                            <div className="mb-2"><NavLink to="/#" className="text-white border-0">Sitemaps</NavLink></div>
                        </div>
                        <div className="col-md-3">
                            <h4 className="footer-heading">Shop Now</h4>
                            <div className="footer-underline" />
                            <div className="mb-2"><a href className="text-white">Collections</a></div>
                            <div className="mb-2"><a href className="text-white">Trending Products</a></div>
                            <div className="mb-2"><a href className="text-white">New Arrivals Products</a></div>
                            <div className="mb-2"><a href className="text-white">Featured Products</a></div>
                            <div className="mb-2"><a href className="text-white">Cart</a></div>
                        </div>
                        <div className="col-md-3">
                            <h4 className="footer-heading">Reach Us</h4>
                            <div className="footer-underline" />
                            <div className="mb-2">
                                <p>
                                    <i className="fa fa-map-marker" /> #444, some main road, some area, some street, bangalore, india - 560077
                                </p>
                            </div>
                            <div className="mb-2">
                                <a href className="text-white">
                                    <i className="fa fa-phone" /> +91 888-XXX-XXXX
                                </a>
                            </div>
                            <div className="mb-2">
                                <a href className="text-white">
                                    <i className="fa fa-envelope" /> fundaofwebit@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <p className> © {currentYear} - Tanjim - Ecommerce. All rights reserved.</p>
                        </div>
                        <div className="col-md-4">
                            <div className="social-media">
                                Get Connected:
                                <NavLink to="/about"><i className="fa fa-facebook" /></NavLink>
                                <NavLink><i className="fa fa-twitter" /></NavLink>
                                <NavLink><i className="fa fa-instagram" /></NavLink>
                                <NavLink><i className="fa fa-youtube" /></NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Footer