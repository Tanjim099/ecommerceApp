import Layout from "../../components/Layout/Layout";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/slices/authSlice";

function ForgotPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const forgotData = {
            email: email,
            newPassword: newPassword,
            answer: answer
        }

        const response = await dispatch(forgotPassword(forgotData));
        console.log(response)
        if (response?.payload?.success) {
            navigate("/login")
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
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            id="newPassword"
                            placeholder="Enter Your New Password"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="answer"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="answer"
                            placeholder="Enter Your Favorite Sport"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Reset Password
                    </button>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword