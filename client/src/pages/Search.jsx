import { useSelector } from "react-redux";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import ProductCart from "../components/ProductCard";

function Search() {
    const navigate = useNavigate()
    const { result } = useSelector((state) => state?.search)
    console.log(result)
    return (
        <Layout title={"Search Result"}>
            <div className="container container-lg container-md container-sm container-xl container-xxl  max-w-90 mx-auto">
                <div className="text-center">
                    <h1 className="fs-4 mt-3">Search Resuts</h1>
                    <h6>
                        {result.length < 1
                            ? "No Products Found"
                            : `Found ${result.length}`}
                    </h6>
                    <div className="col-md-12 offset-lg-1">
                        <div className="d-flex flex-wrap  gap-1">
                            {result?.map((p, i) => (
                                <ProductCart key={i} title={p.name} image={p?.image?.secure_url} price={p.price} id={p._id} slug={p.slug} data={p} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search