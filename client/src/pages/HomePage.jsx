import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout/Layout";
import { filtersProduct, getAllProducts } from "../redux/slices/productSlice";
import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { Checkbox, Radio } from "antd";
import { getCategories } from "../redux/slices/categorySlice";
import { Prices } from "../components/Prices";

function HomePage() {
    const dispatch = useDispatch();
    const [productList, setProductList] = useState([])
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([])
    // const { productList } = useSelector((state) => state?.product)

    async function onLoadGetAllProducts() {
        const response = await dispatch(getAllProducts());
        if (response?.payload?.success) {
            setProductList(response?.payload?.products)
        }
    }

    const categories = useSelector((state) => state?.category?.categoryData);
    async function onGetData() {
        const response = await dispatch(getCategories())
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
        console.log(response)
    }
    useEffect(() => {
        onGetData()
        if (!checked.length || !radio.length) onLoadGetAllProducts()
    }, [])

    useEffect(() => {
        onFiltersProduct()
    })
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
                    {/* PRICE FILTER */}
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
                            <div className="card m-2" style={{ width: "18rem" }}>
                                <img
                                    src={`http://localhost:8080/api/v1/product/product-image/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">
                                        {p.description.substring(0, 30)}...
                                    </p>
                                    <p className="card-text"> {p.price}</p>
                                    <button class="btn btn-primary ms-1">More Details</button>
                                    <button class="btn btn-secondary ms-1">ADD TO CART</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default HomePage