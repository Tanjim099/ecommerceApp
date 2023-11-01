import { useLocation } from "react-router-dom";
import Layout from "../components/Layout/Layout";

function ProductDetails() {
    const { state } = useLocation();
    console.log(state)
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
        </Layout>
    )
}

export default ProductDetails