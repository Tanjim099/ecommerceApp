import { useSelector } from "react-redux";
import Layout from "../components/Layout/Layout";

function Search() {
    const { result } = useSelector((state) => state?.search)
    console.log(result)
    return (
        <Layout title={"Search Result"}>
            <div className="container">
                <div className="text-center">
                    <h1>Search Resuts</h1>
                    <h6>
                        {result.length < 1
                            ? "No Products Found"
                            : `Found ${result.length}`}
                    </h6>
                    <div className="d-flex flex-wrap mt-4">
                        {result?.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }}>
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
                                    <p className="card-text"> $ {p.price}</p>
                                    <button class="btn btn-primary ms-1">More Details</button>
                                    <button class="btn btn-secondary ms-1">ADD TO CART</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search