import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData = {
            email: email,
            password: password
        }

        const response = await dispatch(login(loginData));
        if (response?.payload?.success) {
            navigate("/")
            return
        }

    };
    return (
        <Layout>
            <div className="form-container ">
                <form onSubmit={handleSubmit}>
                    <h4 className="title">LOGIN FORM</h4>

                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="email"
                            placeholder="Enter Your Email "
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="password"
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>

                    <div className="d-flex flex-column gap-2">
                        <button type="submit" className="btn btn-primary">
                            LOGIN
                        </button>
                        <button type="button" className="btn btn-primary" onClick={() => navigate("/forgot-password")}>
                            Forgot Password
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Login