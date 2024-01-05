import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout/Layout";
import { decrementQuantity, incrementQuantity, removeItem } from "../redux/slices/cartSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";
import "../styles/CardStyle.css"
import { getBrainTreeToken, payment } from "../redux/slices/paymentSlice";
function CartPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [cartItem, setCartItem] = useState([])
    const [clientToken, setClientToken] = useState("")
    const [instance, setInstance] = useState("")
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const getUserData = localStorage.getItem("userData")
    let userData = JSON.parse(getUserData);
    const { items } = useSelector((state) => state?.cart);
    //TOTAL PRICE
    const totalPrice = () => {
        try {
            let total = 0
            items?.map((item) => {
                total = total + item.price * item.itemQuantity;
            })

            return total.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR"
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function handleRemove(itemId) {
        // e.preventDefault
        await dispatch(removeItem({ id: itemId.id }))
    }

    async function getBrainTreeTokens() {
        const response = await dispatch(getBrainTreeToken())
        setClientToken(response?.payload?.clientToken)
    }
    useEffect(() => {
        getBrainTreeTokens()
    }, [isLoggedIn])

    const handlePayment = async () => {
        const { nonce } = await instance.requestPaymentMethod();
        console.log(items)
        const response = await dispatch(payment([nonce, items]))
        localStorage.removeItem("cartItems");
        navigate("/dashboard/user/orders");
        toast.success("Payment Completed Successfully ");
    }

    const handleIncrement = (itemId) => {
        dispatch(incrementQuantity({ id: itemId.id }));
    };

    const handleDecrement = (itemId) => {
        dispatch(decrementQuantity({ id: itemId.id }));
    };
    return (
        <Layout title={"Cart"}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center p-2 mb-1 fs-3">
                            {userData?.name ? (`Hello ${userData.name}`) : (" Hello User")}
                        </h1>
                        <h4 className="text-center fs-5">
                            {items?.length
                                ? `You Have ${items.length} items in your cart ${isLoggedIn ? "" : "please login to checkout"
                                }`
                                : " Your Cart Is Empty"}
                        </h4>
                    </div>
                </div>
                <div className="row row-gap-3">
                    <div className="col-12 col-md-12 col-lg-9 p-lg-2 p-1 bg-white">
                        {/* ========================== */}
                        <div className="py-3 py-md-5">
                            <div className="container">
                                <div className="row gap-5">
                                    <div className="col-md-12">
                                        <div className="shopping-cart">
                                            <div className="cart-item d-flex flex-column gap-3">
                                                {items?.map((p, i) => {
                                                    return (
                                                        <div key={i} className="row bg-light p-3 px-md-2">

                                                            <div className="col-md-5 gap-1 d-flex gap-2 d-lg-flex gap-lg-2 align-items-lg-center my-auto">
                                                                <div className="mr-1">
                                                                    <img src={p.image} style={{ width: 50, height: 50 }} alt />
                                                                </div>
                                                                <div>
                                                                    <span className=" fs-md-2" style={{ fontSize: "13px" }}>{p.name}</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-2 my-auto">
                                                                <label className="price">{p.price}</label>
                                                            </div>
                                                            <div className="col-md-3 col-7 my-auto">
                                                                <div className="quantity">
                                                                    <div className="input-group">
                                                                        <span className="btn btn1" onClick={() => handleDecrement(p)} disabled={p.itemQuantity === 1}><i className="fa fa-minus" /></span>

                                                                        <span className="input-quantity text-center">{p.itemQuantity || 1}</span>
                                                                        <span className="btn btn1" onClick={() => handleIncrement(p)} ><i className="fa fa-plus" /></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-2 col-5 my-auto">
                                                                <div className="remove">
                                                                    <button className=" text-white border-0 px-2 py-1 rounded" style={{ backgroundColor: "#2874f0" }} onClick={() => handleRemove(p)}>Remove</button>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    )
                                                })}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ================================ */}
                    </div>
                    <div className="col-12 col-md-12 col-lg-3  text-center bg-white p-2">
                        <h2 className="fs-5">Cart Summary</h2>
                        <p className="fs-6">Total | Checkout | Payment</p>
                        <hr />
                        <h4 className="fs-5 fw-bold">Total : {totalPrice()}</h4>
                        {userData?.address ? (
                            <>
                                <div className="mb-3">
                                    <h4>Current Address</h4>
                                    <p>{userData?.address}</p>
                                    <button
                                        className="btn bg-info-subtle"
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
                                        className="btn bg-info-subtle"
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
                        <div className="mt-2">
                            {!clientToken || !items?.length ? (
                                ""
                            ) : (
                                <>
                                    <DropIn
                                        options={{
                                            authorization: clientToken,
                                            paypal: {
                                                flow: "vault",
                                            },
                                        }}
                                        onInstance={(instance) => setInstance(instance)}
                                    />

                                    <button
                                        className="btn btn-primary"
                                        onClick={handlePayment}
                                        disabled={!instance || !isLoggedIn || !userData?.address}
                                    >
                                        Make Payment
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage