import { useDispatch, useSelector } from "react-redux"
import AdminMenu from "../../components/Layout/AdminMenu"
import Layout from "../../components/Layout/Layout"
import { useEffect, useState } from "react";
import { createCategory, getCategories } from "../../redux/slices/categorySlice";
import CategoryForm from "../../components/Form/CategoryForm";
import toast from "react-hot-toast";

function CreateCategory() {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    console.log(name)
    async function onFormSubmit(e) {
        console.log(name)
        e.preventDefault()
        const data = {
            name: name
        }
        const response = await dispatch(createCategory(data));
        console.log(response)
        if (response?.payload?.success) {
            toast.success("Category Created Successfully")
            onGetData()
            setName("")
        }
        else {
            toast.error("Something went wrong")
        }
    }
    const categories = useSelector((state) => state?.category?.categoryData);
    console.log(categories)
    async function onGetData() {
        const response = await dispatch(getCategories())
        console.log(response)
    }
    useEffect(() => {
        onGetData()
    }, [])
    return (
        <Layout title={"Dashboard - Create Category"}>
            <div className="container-fluid p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Manage Category</h1>
                        <div className="p-3 w-50">
                            <CategoryForm
                                handleSubmit={onFormSubmit}
                                value={name}
                                setValue={setName}
                            />
                        </div>
                        <div className="w-75">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((c) => (
                                        <>
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary ms-2"
                                                        onClick={() => {
                                                            setVisible(true);
                                                            setUpdatedName(c.name);
                                                            setSelected(c);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger ms-2"
                                                        onClick={() => {
                                                            handleDelete(c._id);
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory