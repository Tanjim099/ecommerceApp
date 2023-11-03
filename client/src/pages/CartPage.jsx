import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout/Layout";
import { removeItem } from "../redux/slices/cartSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function CartPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [cartItem, setCartItem] = useState([])
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const getUserData = localStorage.getItem("userData")
    let userData = JSON.parse(getUserData);
    const { items } = useSelector((state) => state?.cart);

    //TOTAL PRICE
    const totalPrice = () => {
        try {
            let total = 0;
            items?.map((item) => {
                total = total + item.price;
            })
            return total.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR"
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function removeCartItem(e, p) {
        e.preventDefault
        await dispatch(removeItem(p))
    }
    return (
        <Layout title={"Cart"}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1">
                            {userData?.name ? (`Hello ${userData.name}`) : (" Hello User")}
                        </h1>
                        <h4 className="text-center">
                            {items?.length
                                ? `You Have ${items.length} items in your cart ${isLoggedIn ? "" : "please login to checkout"
                                }`
                                : " Your Cart Is Empty"}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        {items?.map((p) => (
                            <div className="row mb-2 p-3 card flex-row">
                                <div className="col-md-4">
                                    <img
                                        src={p.image.secure_url}
                                        className="card-img-top"
                                        alt={p.name}
                                        width="100px"
                                        height={"100px"}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <p>{p.name}</p>
                                    <p>{p.description.substring(0, 30)}</p>
                                    <p>Price : {p.price}</p>
                                    <button
                                        className="btn btn-danger"
                                        onClick={(e) => removeCartItem(e, p)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-4 text-center">
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total : {totalPrice()}</h4>
                        {userData?.address ? (
                            <>
                                <div className="mb-3">
                                    <h4>Current Address</h4>
                                    <p>{userData?.address}</p>
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => navigate("/dashboard/user/profile")}
                                    >
                                        Update Address
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="mb-3">
                                {isLoggedIn ? (
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => navigate("/dashboard/user/profile")}
                                    >
                                        Update Address
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() =>
                                            navigate("/login", {
                                                state: "/cart",
                                            })
                                        }
                                    >
                                        Plase Login to checkout
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage