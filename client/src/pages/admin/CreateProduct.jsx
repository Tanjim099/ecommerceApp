import { useEffect, useState } from "react"
import Layout from "../../components/Layout/Layout"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../redux/slices/categorySlice";
import { Select } from "antd";
import { createProduct } from "../../redux/slices/productSlice";
import toast from "react-hot-toast";
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify }
    from 'react-icons/bs';
const { Option } = Select;
import AdminLayout from "../../components/Layout/AdminLayout";
import "../../styles/createProduct.css"
function CreateProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [image, setImage] = useState("");

    //GET ALL CATEGORY
    async function getAllCategory() {
        const response = await dispatch(getCategories())
        if (response?.payload?.success) {
            setCategories(response?.payload?.category)
        }
    }

    async function onCreateProduct(e) {
        e.preventDefault();
        const productData = new FormData();
        productData.append("name", name);
        productData.append("description", description)
        productData.append("price", price)
        productData.append("quantity", quantity)
        productData.append("image", image)
        productData.append("category", category)
        const response = await dispatch(createProduct(productData))
        if (response?.payload?.success) {
            toast.success("Product Created Successfully");
        }
    }
    useEffect(() => {
        getAllCategory()
    }, [])
    return (
        <AdminLayout>
            <div className="createProducContainer">
                <div className="createProductContainer_content">
                    <div>
                        <div className="container-fluid p-3 mt-8" style={{ marginTop: "50px" }}>
                            <div className="row mt-0 mt-lg-8 ">
                                <div className="col-md-12 col-lg-6 bg-white p-4 shadow mt-0 ml-lg-5" style={{ marginTop: "50px" }}>
                                    <h1 className=" fs-4">Create Product</h1>
                                    <div className="w-md-75 w-lg-75 w-100" >
                                        <Select
                                            bordered={false}
                                            placeholder="Select a Category"
                                            size="large"
                                            showSearch
                                            className="form-select mb-3"
                                            onChange={(value) => {
                                                setCategory(value)
                                            }}
                                        >
                                            {categories?.map((c) => {
                                                return <Option key={c._id} value={c._id}>
                                                    {c.name}
                                                </Option>
                                            })}
                                        </Select>
                                        <div className="mb-3">
                                            <label
                                                className="btn btn-outline-secondary col-md-12"
                                                htmlFor="image"
                                            >
                                                {image ? image.name : "Upload Image"}
                                                <input
                                                    type="file"
                                                    name="image"
                                                    id="image"
                                                    accept="image/*"
                                                    onChange={(e) => setImage(e.target.files[0])}
                                                    hidden

                                                />
                                            </label>
                                        </div>
                                        <div className="mb-3">
                                            {image && (
                                                <div className="text-center">
                                                    <img src={URL.createObjectURL(image)}
                                                        alt="product image"
                                                        height={"200px"}
                                                        className="img img-responsive"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="form-control"
                                                placeholder="Enter Product Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <textarea
                                                type="text"
                                                value={description}
                                                placeholder="Enter a Product Description"
                                                className="form-control"
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="number"
                                                name="price"
                                                id="price"
                                                className="form-control"
                                                placeholder="Enter Product Price"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="number"
                                                name="quantity"
                                                id="quantity"
                                                className="form-control"
                                                placeholder="Enter Product Quantity"
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <Select
                                                bordered={false}
                                                size="large"
                                                showSearch
                                                placeholder="Select Shiping"
                                                className="form-select mb-3"
                                                onChange={(value) => setShipping(value)}
                                            >
                                                <Option value="0">No</Option>
                                                <Option value="1">Yes</Option>
                                            </Select>
                                        </div>
                                        <div className="mb-3">
                                            <button
                                                onClick={onCreateProduct}
                                                className="btn btn-primary">
                                                CREATE PRODUCT
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default CreateProduct