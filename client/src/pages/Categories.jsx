import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useSelector } from "react-redux";

function Categories() {
    const { categoryData } = useSelector((state) => state?.category)
    return (
        <Layout title={"All Categories"}>
            <div className="container">
                <div className="row">
                    {categoryData?.map((c) => {
                        return (
                            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3">
                                <Link className="btn btn-primary" to={`/category/${c.slug}`}>
                                    {c.name}
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Layout>
    )
}

export default Categories