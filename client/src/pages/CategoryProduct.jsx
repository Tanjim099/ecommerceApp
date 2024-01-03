import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getProductByCategory } from "../redux/slices/productSlice";
import { useEffect, useState } from "react";
import ProductCart from "../components/ProductCard";


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
                <h4 className="text-center">Category - {category?.name}</h4>
                <h6 className="text-center">{products?.length} Result Found</h6>
                <div className="row m-auto">
                    <div className="col-md-12 offset-lg-1">
                        <div className="d-flex flex-wrap  gap-1">
                            {products?.map((p, i) => (
                                <ProductCart key={i} title={p.name} image={p?.image?.secure_url} price={p.price} id={p._id} slug={p.slug} data={p} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProduct