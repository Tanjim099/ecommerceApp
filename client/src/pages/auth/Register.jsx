import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/slices/authSlice";
import "../../styles/AuthStyles.css"

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    //form submit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            name: name,
            email: email,
            password: password,
            phone: phone,
            address: address
        }

        const response = await dispatch(register(userData))
        console.log(response)
        if (response?.payload?.data) {
            navigate("/login")
        }
    };
    return (
        <Layout title={"Register - Page"}>
            <div className="form-container ">
                <h1>Register</h1>
                <form onSubmit={handleSubmit} >
                    <div className="mb-3">
                        <label
                            htmlFor="name"
                            className="form-label"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            name="name"
                            id="name"
                            aria-describedby="emailHelp"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="email"
                            className="form-label"
                        >
                            Email address
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="password"
                            className="form-label"
                        >
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            name="password"
                            className="form-control"
                            id="password"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="phone"
                            className="form-label"
                        >
                            Phone Number
                        </label>
                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type="text"
                            name="phone"
                            className="form-control"
                            id="phone"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="address"
                            className="form-label"
                        >
                            Address
                        </label>
                        <input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            type="text"
                            name="address"
                            className="form-control"
                            id="address"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        </Layout>
    )
}

export default Register