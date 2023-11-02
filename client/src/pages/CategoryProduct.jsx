import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getProductByCategory } from "../redux/slices/productSlice";
import { useEffect, useState } from "react";


function CategoryProduct() {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);

    async function onLoadGetProductByCategory() {
        const response = await dispatch(getProductByCategory(params.slug))
        if (response?.payload?.success) {
            setProducts(response?.payload?.products);
            setCategory(response?.payload?.category)
        }
    }
    useEffect(() => {
        if (params?.slug) onLoadGetProductByCategory()
    }, [params?.slug])
    return (
        <Layout>
            <div className="container mt-3">
                <h4 className="text-center">Category - {category.name}</h4>
                <h6 className="text-center">{products?.length} Result Found</h6>
                <div className="row">
                    <div className="col-md-9 offset-1">
                        <div className="d-flex flex-wrap">
                            {products?.map((p) => (
                                <div
                                    className="card m-2"
                                    style={{ width: "18rem" }}
                                    key={p._id}
                                >
                                    <img
                                        src={p.image.secure_url}
                                        className="card-img-top"
                                        alt={p.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">
                                            {p.description.substring(0, 30)}...
                                        </p>
                                        <p className="card-text"> ₹ {p.price}</p>
                                        <button
                                            className="btn btn-primary ms-1"
                                            onClick={() => navigate(`/product/${p.slug}`, { state: p })}
                                        >
                                            More Details
                                        </button>
                                        <button className="btn btn-secondary ms-1">
                                            ADD TO CART
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProduct