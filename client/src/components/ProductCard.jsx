import { useNavigate } from "react-router-dom"
import "../styles/ProductCard.css"
import { addItem } from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useState } from "react";
function ProductCart({ title, image, price, id, slug, data }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { items } = useSelector((state) => state?.cart);
    // const [cartData, setCartData] = useState([...items]);
    // console.log(cartData)
    function onAddToCart(item) {
        // localStorage.setItem("cart", JSON.stringify([...item]))
        // const alreadyCartItem = cartData.find((i) => {
        //     return i?.product?._id === item?._id
        // });

        // if (alreadyCartItem) {
        //     const latestCartUpdate = cartData?.map((i) => i?.product?._id === item?._id ? {
        //         ...i, quantity: i?.quantity + 1
        //     } : i
        //     );
        //     setCartData(latestCartUpdate);
        // }
        // else {
        //     setCartData([...cartData, { product: item, quantity: 1 }])
        // }
        // dispatch(addItem(item))
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
        <>
            {/* <div className=" bg-white border-0 rounded-0 shadow-sm productCard" style={{ width: "257px" }} onClick={() => navigate(`/product/${slug}`, { state: data })}>
                <img src={image} className="card-img-top rounded-0 " alt="..." />
                <div className="card-body mt-3">
                    <div className="row">
                        <div className="col-12">
                            <h4 className="fs-6">{(title).substring(0, 22)}...</h4>
                        </div>

                    </div>
                </div>
                <div className="row align-items-center text-center g-0 pandbBox">
                    <div className="col-4 priceBox">
                        <h5>${price}</h5>
                    </div>
                    <div className="col-8 btnsBox">
                        <button className="btn btn-dark w-100 p-2 rounded-0 text-warning">ADD TO CART</button>
                    </div>
                </div>
            </div> */}

            <div className="card_container my-2">
                <div onClick={() => navigate(`/product/${slug}`, { state: data })}>
                    <div className="card_header">
                        <img src={image} alt="card-image" className="card_image" />

                    </div>
                    <div className="card_body">
                        <p className=" card_body_name">{(title).substring(0, 25)}...</p>
                        <div className="d-flex justify-content-between priceBox">
                            <p className="price mb-1">₹ {price}</p>
                            <s className="text-decoration-line-through">₹ {price}</s>
                        </div>

                    </div>
                    <div className="card_footer">
                        <p className="mb-0">1 review</p>
                    </div>
                </div>
                <div class="overlay">
                    <button class="add-to-cart-btn" onClick={() => onAddToCart(data)}>Add to Cart</button>
                </div>
                <div class="add-to-cart-btn_Box">
                    <button class="add-to-cart-btn" onClick={() => onAddToCart(data)}>Add to Cart</button>
                </div>
            </div>


        </>
    )
}

export default ProductCart