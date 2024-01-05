import { useNavigate } from "react-router-dom"
import "../styles/ProductCard.css"
import { addItem } from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useState } from "react";
function ProductCart({ title, image, price, id, slug, data }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function onAddToCart(item) {
        dispatch(addItem({
            id: item._id,
            name: item.name,
            price: item.price,
            image: item.image.secure_url,
            itemQuantity: 1
        }))
        toast.success("Item Added to cart")
    }
    return (
        <div className="card_container my-2">
            <div onClick={() => navigate(`/product/${slug}`, { state: data })}>
                <div className="card_header">
                    <img src={image} alt="card-image" className="card_image" />

                </div>
                <div className="card_body">
                    <p className=" card_body_name">{(title).substring(0, 25)}...</p>
                    <div className="d-flex justify-content-between priceBox">
                        <p className="price mb-1">₹ {price}</p>
                    </div>

                </div>
                <div className="card_footer">
                </div>
            </div>
            <div class="overlay">
                <button class="add-to-cart-btn" onClick={() => onAddToCart(data)}>Add to Cart</button>
            </div>
            <div class="add-to-cart-btn_Box">
                <button class="add-to-cart-btn" onClick={() => onAddToCart(data)}>Add to Cart</button>
            </div>
        </div>
    )
}

export default ProductCart