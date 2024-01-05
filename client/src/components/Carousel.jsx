import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Carousel.css";
import { HiOutlineArrowNarrowRight } from "react-icons/hi"
function Carousel() {
    const navigate = useNavigate()
    return (
        <div className="heroSection">
            <div className="carouselContainer">
                <div className="carouselBox">
                    <div id="carouselExampleCaptions" className="carousel slide w-100 h-100 bg-blue">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={1} aria-label="Slide 2" />
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={2} aria-label="Slide 3" />
                        </div>
                        <div className="carousel-inner w-100 h-100 ">

                            <div className="carousel-item  w-100  h-100 active bg-transparent border-0">
                                <NavLink to="/category/smart-watch">
                                    <img src="https://suruchi-demo-3.myshopify.com/cdn/shop/files/1.png?v=1694872952" className="d-block w-100 h-100 rounded" alt="..." />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5 className="fs-3 fw-bolder">Smart Watches for Every Lifestyle</h5>
                                        <p className="fs-6">Track Your Health with Smartwatches at Upto 80% OFF.</p>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="carousel-item w-100 h-100 bg-transparent border-0">
                                <NavLink to="/category/smart-phone">
                                    <img src="https://in-exstatic-vivofs.vivo.com/gdHFRinHEMrj3yPG/1695991749715/02872893d6f058f34a33797a6fdf4ccd.jpg" className="d-block w-100 h-100 rounded" alt="..." />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5 className="fs-3 fw-bolder">Second slide label</h5>
                                        <p className="fs-6">Some representative placeholder content for the second slide.</p>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="carousel-item w-100 h-100 bg-transparent border-0">
                                <NavLink to="/category/laptop">
                                    <img src="https://suruchi-demo-3.myshopify.com/cdn/shop/files/3m.png?v=1694874182" className="d-block w-100 h-100 rounded-10" alt="..." />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5 className="fs-3 fw-bolder">60% Off on Diwali Dhamaka Sale - Get Additional Exchange Bonus</h5>
                                        <p className="fs-6">Some representative placeholder content for the third slide.</p>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true" />
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true" />
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>

                </div>
                <div className="carouselCardBox">
                    <div className="card text-bg-none smallCard p-0 w-100 bg-transparent border-none rounded-4 cursor-pointer" onClick={() => navigate("/category/headphone")}>
                        <img src="https://suruchi-demo-3.myshopify.com/cdn/shop/files/3_d8b498cd-bbca-40ec-a42d-280b485fb91a.png?v=1694957655&width=1500" className="card-img w-100 h-100" alt="..." />
                        <div className="card-img-overlay text-white d-flex flex-column justify-content-center">
                            <h4 className="card-title fs-5 fw-bolder"> Special Discount</h4>
                            <h4 className="card-title fs-5 fw-bolder">UP TO 50% OFF!</h4>
                            <h5 className="card-title fs-6 text-decoration-underline">Shop Now <HiOutlineArrowNarrowRight /></h5>

                        </div>
                    </div>

                    <div className="card text-bg-none smallCard p-0 w-100 bg-transparent border-none rounded-4 " onClick={() => navigate("/category/video-games")}>
                        <img src="https://suruchi-demo-3.myshopify.com/cdn/shop/files/4_47ca1fa7-ee5e-4e29-b9ff-5df81e07e87c.png?v=1694957660&width=1500" className="card-img w-100 h-100" alt="..." />
                        <div className="card-img-overlay text-white d-flex flex-column justify-content-center">
                            <h4 className="card-title fs-5 fw-bolder"> Hot Deals</h4>
                            <h4 className="card-title fs-5 fw-bolder">UP TO 30% OFF!</h4>
                            <h5 className="card-title fs-6 text-decoration-underline">Shop Now <HiOutlineArrowNarrowRight /></h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="popularCategoryBox">
                <div className="card text-bg-none p-0 w-100 bg-transparent border-none rounded-2" onClick={() => navigate("/category/camera")}>
                    <img src="https://suruchi-demo-3.myshopify.com/cdn/shop/files/Gaming_pc.png?v=1695185741&width=550" className="card-img w-100 h-100" alt="..." />
                    <div className="card-img-overlay text-white d-flex flex-column justify-content-center cart-text-box">
                        <h4 className="card-title fs-5 fw-bolder">Here Camera</h4>
                        <h5 className="card-title fs-6 text-decoration-underline">SHOP NOW</h5>
                    </div>
                </div>
                <div className="card text-bg-none p-0 w-100 bg-transparent border-none rounded-2">
                    <img src="https://suruchi-demo-3.myshopify.com/cdn/shop/files/ipad.png?v=1695185768&width=550" className="card-img w-100 h-100" alt="..." />
                    <div className="card-img-overlay text-white d-flex flex-column justify-content-center">
                        <h4 className="card-title fs-5 fw-bolder">Apple ipad</h4>
                        <h5 className="card-title fs-6 text-decoration-underline">SHOP NOW</h5>
                    </div>
                </div>
                <div className="card text-bg-none p-0 w-100 bg-transparent border-none rounded-2" onClick={() => navigate("/category/smart-watch")}>
                    <img src="https://suruchi-demo-3.myshopify.com/cdn/shop/files/Smart_watch_ab4c738f-94be-4278-9b3c-95c7fc0e2845.png?v=1695186990&width=550" className="card-img w-100 h-100" alt="..." />
                    <div className="card-img-overlay text-white d-flex flex-column justify-content-center">
                        <h4 className="card-title fs-5 fw-bolder">Smart Watch</h4>
                        <h5 className="card-title fs-6 text-decoration-underline">SHOP NOW</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Carousel