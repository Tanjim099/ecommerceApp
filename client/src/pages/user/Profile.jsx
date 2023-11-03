import { useDispatch } from "react-redux";
import Layout from "../../components/Layout/Layout"
import UserMenu from "../../components/Layout/userMenu"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateProfile } from "../../redux/slices/authSlice";

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    function onLoadUserData() {
        const getUserData = localStorage.getItem("userData")
        let userData = JSON.parse(getUserData);
        console.log(userData)
        setName(userData?.name)
        setEmail(userData?.email)
        setPhone(userData?.phone)
        setAddress(userData?.address)
    }

    useEffect(() => {
        onLoadUserData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            name: name,
            email: email,
            password: password,
            phone: phone,
            address: address
        }
        console.log(userData)
        const response = await dispatch(updateProfile(userData))
        console.log(response)
        if (response?.payload?.success) {
            onLoadUserData()
        }
    };

    return (
        <Layout title={"User - Profile Page"}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="form-container ">
                            <form onSubmit={handleSubmit} >
                                <h4 className="title">USER PROFILE</h4>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="form-control"
                                        name="name"
                                        id="name"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter Your Name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter Your Email"
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter Your Password"
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        type="text"
                                        name="phone"
                                        className="form-control"
                                        id="phone"
                                        placeholder="Enter Your Phone"
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        type="text"
                                        name="address"
                                        className="form-control"
                                        placeholder="Enter Your Address"
                                        id="address"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">UPDATE PROFILE</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile