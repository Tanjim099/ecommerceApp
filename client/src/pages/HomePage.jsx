import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout/Layout";
import { filtersProduct, getAllProducts, productCount } from "../redux/slices/productSlice";
import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { Checkbox, Radio } from "antd";
import { getCategories } from "../redux/slices/categorySlice";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [productList, setProductList] = useState([])
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(1);
    // const { productList } = useSelector((state) => state?.product)
    console.log(total)

    async function onLoadGetAllProducts() {
        setLoading(true);
        const response = await dispatch(getAllProducts(page));
        if (response?.payload?.success) {
            setProductList(response?.payload?.products)
        }
    }

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);

    async function loadMore() {
        const response = await dispatch(getAllProducts(page));
        if (response?.payload?.success) {
            setProductList([...productList, ...response?.payload?.products])
        }
    }

    const categories = useSelector((state) => state?.category?.categoryData?.category);
    async function onGetData() {
        const response = await dispatch(getCategories())
        console.log(response)
    }

    async function onloadGetProductCount() {
        const response = await dispatch(productCount())
        setTotal(response?.payload?.total)
        console.log(response)
    }

    //FILTER BY CATEGORY
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        }
        else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all)
    }

    async function onFiltersProduct() {
        const response = await dispatch(filtersProduct([checked, radio]))
        setProductList(response?.payload?.products)
        console.log(response)
    }
    useEffect(() => {
        onloadGetProductCount()
        onGetData()
        if (!checked.length || !radio.length) onLoadGetAllProducts()
    }, [checked.length, radio.length])

    useEffect(() => {
        if (checked.length || radio.length) onFiltersProduct();
    }, [checked, radio])
    return (
        <Layout>
            <Carousel />
            <div className="container-fluid row mt-3">

                <div className="col-md-2">
                    {/* CATEGORY FILTER */}
                    <h4 className="text-center">Filter By Category</h4>
                    <div className="d-flex flex-column">
                        {
                            categories?.map((c) => {
                                return (
                                    <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                        {c.name}
                                    </Checkbox>
                                )
                            })
                        }
                    </div>
                    {/*PRICE FILTER */}
                    <h4 className="text-center mt-5">Filter By Price</h4>
                    <div className="d-flex flex-column">
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                            {
                                Prices?.map((p) => {
                                    return (
                                        <div key={p._id}>
                                            <Radio value={p.array}>{p.name}</Radio>
                                        </div>
                                    )
                                })
                            }
                        </Radio.Group>
                    </div>
                </div>
                <div className="col-md-10">
                    {JSON.stringify(radio, null, 4)}
                    <h1 className="text-center">All Products</h1>
                    <div className="d-flex flex-wrap">
                        {productList?.map((p) => (
                            <div className="card m-2" style={{ width: "18rem", maxHeight: "28rem" }}>
                                <img
                                    src={p.image.secure_url}
                                    className="card-img-top h-[100px]"
                                    style={{ maxHeight: "250px" }}
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name.substring(0, 20)}...</h5>
                                    <p className="card-text">
                                        {p.description.substring(0, 30)}...
                                    </p>
                                    <p className="card-text"> {p.price}</p>
                                    <button class="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`, { state: p })}>More Details</button>
                                    <button class="btn btn-secondary ms-1">ADD TO CART</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="m-2 p-3">
                        {productList && productList.length < total && (
                            <button
                                className="btn btn-warning"

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
        </Layout>
    )
}

export default HomePage