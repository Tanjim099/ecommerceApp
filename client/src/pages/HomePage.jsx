import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout/Layout";
import { filtersProduct, getProductsByPage, productCount } from "../redux/slices/productSlice";
import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { Checkbox, Radio } from "antd";
import { getCategories } from "../redux/slices/categorySlice";
import { NavLink, useNavigate } from "react-router-dom";
import { addItem } from "../redux/slices/cartSlice";
import toast from "react-hot-toast";
import "../styles/HomePage.css"
import ProductCart from "../components/ProductCard";
import HomePageAccordion from "../components/Accordion";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import CollectionSlider from "../components/Slider";

// getAllProducts

function HomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [productList, setProductList] = useState([])
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(1);
    async function onLoadGetAllProducts() {
        setLoading(true);
        const response = await dispatch(getProductsByPage(page));
        if (response?.payload?.success) {
            setProductList(response?.payload?.products)
        }
    }

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);

    async function loadMore() {
        const response = await dispatch(getProductsByPage(page));
        if (response?.payload?.success) {
            setProductList([...productList, ...response?.payload?.products])
        }
    }

    const categories = useSelector((state) => state?.category?.categoryData);
    async function onGetData() {
        const response = await dispatch(getCategories())
    }

    async function onloadGetProductCount() {
        const response = await dispatch(productCount())
        setTotal(response?.payload?.total)
    }



    function onAddToCart(item) {
        dispatch(addItem(item))
        toast.success("Item Added to cart")
    }
    const { items } = useSelector((state) => state?.cart);


    //===============================

    const [selectedCategories, setSelectedCategories] = useState([]);
    function reCall() {
        if (!selectedCategories.length) onLoadGetAllProducts()
    }

    useEffect(() => {
        reCall()
    }, [selectedCategories])
    const handleCategoryChange = (categoryId) => {
        if (selectedCategories?.length <= 0) onLoadGetAllProducts()
        const updatedCategories = selectedCategories.includes(categoryId)
            ? selectedCategories.filter((id) => id !== categoryId)
            : [...selectedCategories, categoryId];
        setSelectedCategories(updatedCategories);
    };


    const handleFilter = async () => {
        if (!selectedCategories.length) onLoadGetAllProducts()
        const response = await dispatch(filtersProduct(selectedCategories));
        setProductList(response?.payload?.products)
        setTotal(response?.payload?.products?.length)
    };
    //==========================
    useEffect(() => {
        onloadGetProductCount()
        onGetData()
        onLoadGetAllProducts()
        if (!selectedCategories.length) onLoadGetAllProducts()
    }, [])

    useEffect(() => {
        if (selectedCategories.length) handleFilter()
    }, [])

    return (
        <Layout>
            <div className="container-fluid  homePagContainer">
                <div>
                    <Carousel />
                </div>
                <div className="row section_02">
                    <h1 className="text-center fs-3 mt-3 mb-3 fw-bolder">Best Deals Product</h1>
                    <div className="col-md-2 p-0  shadow-sm justify-content-between    filterBox">
                        <div className=" bg-white p-2 w-100" id="bigDeviceFilterBox">
                            {/* CATEGORY FILTER */}
                            <div>
                                <h2 className="text-center mt-2 fs-6 fw-bold">Filter Products</h2>
                                <div className="d-flex flex-column gap-2">
                                    {categories.map((category) => (
                                        <div key={category._id} className="flex flex-column gap-3 inline">
                                            <input
                                                type="checkbox"
                                                id={category._id}
                                                className="inline"
                                                checked={selectedCategories.includes(category._id)}
                                                onChange={() => handleCategoryChange(category._id)}
                                            />
                                            <label htmlFor={category._id} className="inline">{category.name}</label>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-100 border-0 bg-primary text-white p-1 mt-3" onClick={handleFilter}>Apply Filters</button>
                            </div>
                        </div>
                        {/* filter for small device */}
                        <div className="smallDeviceFilterBox rounded bg-white p-2">
                            <div className="filterBtn">
                                <button type="button" data-bs-toggle="modal" className="bg-transparent border-0 w-100" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Categories <MdOutlineKeyboardArrowDown /></button>
                            </div>
                            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog m-0">
                                    <div className="modal-content w-50 " style={{ minHeigh: "100vh" }}>
                                        <div className="modal-header">
                                            <h2 className="text-center mt-2 fs-6 fw-bold">Filter Products</h2>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                        </div>
                                        <div>
                                            <div className="d-flex flex-column gap-2 px-3">
                                                {categories.map((category) => (
                                                    <div key={category._id} className="flex flex-column align-items-center gap-3 inline">
                                                        <input
                                                            type="checkbox"
                                                            id={category._id}
                                                            style={{ fontSize: "12px" }}
                                                            checked={selectedCategories.includes(category._id)}
                                                            onChange={() => handleCategoryChange(category._id)}
                                                        />
                                                        <label htmlFor={category._id} className="" style={{ fontSize: "12px" }}>{category.name}</label>
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="w-100 border-0 bg-primary text-white p-1 mt-3" data-bs-dismiss="modal" onClick={handleFilter}>Apply Filters</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ============================ */}
                    </div>
                    <div className="col-md-10">
                        <div className="cardContainer">
                            {productList?.map((p, i) => (
                                <ProductCart key={i} title={p.name} image={p.image.secure_url} price={p.price} id={p._id} slug={p.slug} data={p} />
                            ))}
                        </div>
                        <div className="m-auto p-3 d-flex align-items-center justify-content-center">
                            {productList && productList?.length < total && (
                                <button
                                    className="btn bg-info-subtle"

                                    onClick={(e) => {
                                        e.preventDefault()
                                        setPage(page + 1)
                                    }}
                                >
                                    {loading ? "Loading..." : "Loadmore"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="container-fluid p-0 m-0 bg-transparent section_03">
                    <div className="row section_03_container">
                        <div className="col-md-6">
                            <NavLink>
                                <div className="card text-bg-none p-0 w-100 bg-transparent">
                                    <NavLink to="/category/wireless-speakers">
                                        <img src="https://suruchi-demo-3.myshopify.com/cdn/shop/files/111_1_f5d139ec-669d-416f-8ccc-399f0e120ce7.png?v=1695121557&width=750" className="card-img w-100 h-100" alt="..." />
                                        <div className="card-img-overlay text-white d-flex flex-column justify-content-center section_03_container_card-img-overlay">
                                            <h4 className="card-title text-light fs-5 fs-sm-4 fs-md-3 fs-lg-2 fs-xl-1 ">UP TO 75% OFF!</h4>
                                            <h2 className="card-title fs-5 fs-sm-4 fs-md-3 fs-lg-1 fs-xl-1 fw-bolder">Unbeatable Discounts</h2>
                                            <h5 className="card-title fs-6 text-decoration-underline">Shop Now <HiOutlineArrowNarrowRight /></h5>

                                        </div>
                                    </NavLink>
                                </div>
                            </NavLink>
                        </div>
                        <div className="col-md-6">
                            <NavLink>
                                <div className="card text-bg-none p-0 w-100 bg-transparent">
                                    <NavLink to="/category/laptop">
                                        <img src="https://suruchi-demo-3.myshopify.com/cdn/shop/files/Frame_7.png?v=1695121762&width=750" className="card-img w-100 h-100" alt="..." />
                                        <div className="card-img-overlay text-white d-flex flex-column justify-content-center">
                                            <h5 className="card-title text-light fs-5">UP TO 75% OFF!</h5>
                                            <h3 className="card-title fs-4 fw-bolder">Massive Fashion Sale</h3>
                                            <h6 className="card-title fs-6 text-decoration-underline">Shop Now <HiOutlineArrowNarrowRight /></h6>

                                        </div>
                                    </NavLink>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <CollectionSlider />
                <div className="my-4">
                    <img src="https://code.market/imgproxy/2023/05/1684998168_28_Furniture-Store-E-Commerce-Flutter-iOSAndroid-App-Template.png" className="w-100" alt="" />
                </div>
                <div className="my-4">
                    <HomePageAccordion />
                </div>

            </div>
        </Layout>
    )
}

export default HomePage
