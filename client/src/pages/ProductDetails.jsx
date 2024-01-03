import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useDispatch } from "react-redux";
import { relatedProducts } from "../redux/slices/productSlice";
import { useEffect, useState } from "react";
import ProductCart from "../components/ProductCard";
import "../styles/ProductDetails.css"
import { addItem } from "../redux/slices/cartSlice";
import toast from "react-hot-toast";

function ProductDetails() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { state } = useLocation();
    console.log(state)
    const [relatedProductsList, setRelatedProductsList] = useState([])

    async function onLoadGetSilimarProduct() {
        const response = await dispatch(relatedProducts([state._id, state.category._id]))
        if (response?.payload?.success) {
            setRelatedProductsList(response?.payload?.products)
        }
    }

    let getCartData = localStorage.getItem("cartItems");
    let cartData = JSON.parse(getCartData)
    // console.log(cartItem)

    function onAddToCart(item) {
        // localStorage.setItem("cart", JSON.stringify([...item]));
        dispatch(addItem({
            id: item._id,
            name: item.name,
            price: item.price,
            image: item.image.secure_url,
            itemQuantity: 1
        }))
        // dispatch(addItem(item))
        toast.success("Item Added to cart")
    }

    useEffect(() => {
        onLoadGetSilimarProduct()
    }, [state])
    return (
        <Layout>
            <div className="py-3 py-md-5 bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 mt-3">
                            <div className="bg-white border w-xl-75 w-lg-100 w-md-50 w-sm-75 w-100 m-auto">
                                <img src={state.image?.secure_url} className=" w-100" alt="Img" />
                            </div>
                        </div>
                        <div className="col-md-7 mt-3">
                            <div className="product-view">
                                <h4 className="product-name">
                                    {state?.name}
                                    <label className="label-stock bg-success">In Stock</label>
                                </h4>
                                <hr />

                                <div>
                                    <span className="selling-price">${state?.price}</span>
                                    <span className="original-price">$499</span>
                                </div>
                                {/* <div className="mt-2">
                                    <div className="input-group">
                                        <span className="btn btn1"><i className="fa fa-minus" /></span>
                                        <input type="text" defaultValue={1} className="input-quantity" />
                                        <span className="btn btn1"><i className="fa fa-plus" /></span>
                                    </div>
                                </div> */}
                                <div className="mt-2">
                                    <button class="btn btn1" onClick={() => onAddToCart(state)}>Add to Cart</button>
                                    <button class="btn btn1">Add To Wishlist</button>
                                </div>
                                <div className="mt-3">
                                    <h5 className="mb-0">Small Description</h5>
                                    <p>
                                        {state?.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mt-3">

                        </div>
                    </div>
                </div>
            </div>

            <hr />
            <div className="w-100">
                <div className=" container w-100">
                    <div className="row  w-100 ml-0 mr-0 m-auto">
                        <h4>Similar Products</h4>
                        {relatedProductsList.length < 1 && (
                            <p className="text-center">No Similar Products found</p>
                        )}
                        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 w-100 ml-0 mr-0 m-auto p-0 ">
                            {relatedProductsList?.map((p, i) => (
                                <div className="col px-1">
                                    <ProductCart key={i} title={p.name} image={p.image?.secure_url} price={p.price} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails