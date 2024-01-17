import { useDispatch } from "react-redux";
import Layout from "../../components/Layout/Layout"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateProfile } from "../../redux/slices/authSlice";
import UserMenu from "../../components/Layout/UserMenu"


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
        const response = await dispatch(updateProfile(userData))
        console.log(response)
        if (response?.payload?.success) {
            onLoadUserData()
        }
    };

    return (
        <Layout title={"User - Profile Page"} className="min-h-auto" style={{ minHeight: "5vh" }}>
            <div className="container-fluid col-12 col-lg-8 my-4 min-h-auto m-auto">
                <div className="row gap-2 gap-md-0 gap-lg-0">
                    <div className="col-md-3 col-lg-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9 col-lg-9 mx-">
                        <div className="bg-white shadow">
                            <div className=" col-12 col-md-8 col-lg-6 p-3">
                                <form onSubmit={handleSubmit} >
                                    <h4 className="title fs-5">Personal Information</h4>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="form-control rounded-0 py-2"
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
                                            className="form-control rounded-0 py-2"
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
                                            className="form-control rounded-0 py-2"
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
                                            className="form-control rounded-0 py-2"
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
                                            className="form-control rounded-0 py-2"
                                            placeholder="Enter Your Address"
                                            id="address"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100 w-lg-auto rounded-0 py-2">UPDATE PROFILE</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile