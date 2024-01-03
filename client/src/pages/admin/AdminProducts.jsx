import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProducts } from "../../redux/slices/productSlice";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import "../../styles/AdminProducts.css"
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill, BsTrash }
    from 'react-icons/bs'
import { FiEdit } from "react-icons/fi"
import AdminLayout from "../../components/Layout/AdminLayout";
import toast from "react-hot-toast";

function AdminProducts() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { productList } = useSelector((state) => state?.product)
    async function onLoadGetAllProducts() {
        const response = await dispatch(getAllProducts());
        console.log(response)
    }

    async function onDeleteProduct(pId) {
        const response = await dispatch(deleteProduct(pId));
        console.log(response);
        if (response?.payload?.success) {
            toast.success("Product Deleted Successfully")
            await dispatch(getAllProducts());
        }
    }
    useEffect(() => {
        onLoadGetAllProducts()
    }, [])
    return (
        <AdminLayout>
            <div className='product-grid-container'>
                <div className="ProductContainer">
                    <div className="w-100">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Update</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productList?.map((p, i) => (

                                    <tr>
                                        <td key={i} scope="row">{i + 1}</td>
                                        <td>{p.name}</td>
                                        <td>{p.price}</td>
                                        <td>{p.quantity}</td>
                                        <td><img className="" style={{ width: "50px" }} src={p.image.secure_url} alt="" /></td>
                                        <td>{p.createdAt}</td>
                                        <td><button onClick={() => navigate(`/dashboard/admin/product/${p._id}`, { state: p })} className="p-2 no-border bg-success text-white rounded"><FiEdit /></button></td>
                                        <td><button onClick={() => onDeleteProduct(p._id)} className="p-2 no-border bg-danger text-white rounded"><BsTrash /></button></td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AdminProducts