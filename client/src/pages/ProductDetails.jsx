import { useLocation } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useDispatch } from "react-redux";
import { relatedProducts } from "../redux/slices/productSlice";
import { useEffect, useState } from "react";

function ProductDetails() {
    const dispatch = useDispatch();
    const { state } = useLocation();
    const [relatedProductsList, setRelatedProductsList] = useState([])
    console.log(relatedProductsList)

    async function onLoadGetSilimarProduct() {
        const response = await dispatch(relatedProducts([state._id, state.category._id]))
        console.log(response)
        if (response?.payload?.success) {
            setRelatedProductsList(response?.payload?.products)
        }
    }

    useEffect(() => {
        onLoadGetSilimarProduct()
    }, [state])
    return (
        <Layout>
            <div className="row container mt-2">
                <div className="col-md-6">
                    <img src={state?.image?.secure_url} alt={state?.name} />
                </div>
                <div className="col-md-6">
                    <h1 className="text-center">Product Details</h1>
                    <h6>Name: {state?.name}</h6>
                    <h6>Description: {state?.description}</h6>
                    <h6>Price: {state?.price}</h6>
                    <h6>Category: {state?.category.name}</h6>
                    <button className="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
            </div>
            <hr />
            <div className="row container">
                <h4>Simila Products</h4>
                {relatedProductsList.length < 1 && (
                    <p className="text-center">No Similar Products found</p>
                )}
                <div className="d-flex flex-wrap">
                    {relatedProductsList?.map((p) => (
                        <div className="card m-2" style={{ width: "18rem" }}>
                            <img
                                src={p.image?.secure_url}
                                className="card-img-top"
                                alt={p.name}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description.substring(0, 30)}...</p>
                                <p className="card-text"> ₹ {p.price}</p>
                                <button
                                    className="btn btn-primary ms-1"
                                    onClick={() => navigate(`/product/${p.slug}`)}
                                >
                                    More Details
                                </button>
                                <button class="btn btn-secondary ms-1">ADD TO CART</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails