import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/slices/productSlice";
import { Link } from "react-router-dom";

function AdminProducts() {
    const dispatch = useDispatch()
    const { productList } = useSelector((state) => state?.product)
    async function onLoadGetAllProducts() {
        const response = await dispatch(getAllProducts());
        console.log(response)
    }
    useEffect(() => {
        onLoadGetAllProducts()
    }, [])
    return (
        <Layout title={"Create Product Page"}>
            <div className="container-fluid p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>All Products List</h1>
                        <div className="d-flex wrap">
                            {productList?.map((p) => (
                                <Link
                                    key={p._id}
                                    to={`/dashboard/admin/product/${p.slug}`}
                                    className="product-link"
                                >
                                    <div className="card m-2" style={{ width: "18rem" }}>
                                        <img
                                            src={`http://localhost:8080/api/v1/product/product-image/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default AdminProducts