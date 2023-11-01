import { useEffect, useState } from "react"
import AdminMenu from "../../components/Layout/AdminMenu"
import Layout from "../../components/Layout/Layout"
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getCategories } from "../../redux/slices/categorySlice";
import { Select } from "antd";
import { deleteProduct, updateProduct } from "../../redux/slices/productSlice";
import toast from "react-hot-toast";
const { Option } = Select;

function UpdateProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { state } = useLocation();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState(state.name);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [image, setImage] = useState("");
    const [id, setId] = useState("");

    //GET ALL CATEGORY
    async function getAllCategory() {
        const response = await dispatch(getCategories())
        if (response?.payload?.success) {
            setCategories(response?.payload?.category)
        }
    }


    function handleImageUpload(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if (uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setImage(uploadedImage)
            })
        }
    };

    function setInitialData() {
        setName(state.name);
        setId(state._id);
        setDescription(state.description);
        setPrice(state.price);
        setCategory(state.category._id);
        setQuantity(state.quantity);
        setShipping(state.shipping)
    }

    async function onUpdateProduct(e) {
        e.preventDefault();
        const productData = new FormData();
        productData.append("name", name);
        productData.append("description", description)
        productData.append("price", price)
        productData.append("quantity", quantity)
        image && productData.append("image", image)
        productData.append("category", category)
        const response = await dispatch(updateProduct([state._id, productData]))
        if (response?.payload?.success) {
            toast.success("Product Updated Successfully");
            navigate("/dashboard/admin/all-products")
        }
    }

    //DELETE PRODUCT
    async function onDeleteProduct(e) {
        e.preventDefault();
        let answer = window.prompt("Are You Suce want to delete product");
        if (!answer) return;
        const response = await dispatch(deleteProduct(state._id));
        console.log(response)
        if (response?.payload?.success) {
            toast.success("Product Updated Successfully");
            navigate("/dashboard/admin/all-products")
        }
    }
    useEffect(() => {
        getAllCategory()
        setInitialData()
    }, [])
    return (
        <Layout title={"Create Product Page"}>
            <div className="container-fluid p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Update Product</h1>
                        <div className="m-3 w-75" >
                            <Select
                                bordered={false}
                                placeholder="Select a Category"
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setCategory(value)
                                }}
                                value={category}
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
                                        onChange={handleImageUpload}
                                        hidden

                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                {image ? (
                                    <div className="text-center">
                                        <img src={URL.createObjectURL(image)}
                                            alt="product image"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <img src={state.image.secure_url}
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
                                    value={shipping ? "Yes" : "No"}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button
                                    onClick={onUpdateProduct}
                                    className="btn btn-primary">
                                    UPDATE PRODUCT
                                </button>
                            </div>
                            <div className="mb-3">
                                <button
                                    onClick={onDeleteProduct}
                                    className="btn btn-danger">
                                    DELETE PRODUCT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct