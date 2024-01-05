import { Link, NavLink } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useSelector } from "react-redux";

function Categories() {
    const { categoryData } = useSelector((state) => state?.category)
    return (
        <Layout title={"All Categories"}>
            <div className="w-md-75 w-75 w-lg-75 m-auto mt-4 d-flex flex-column justify-content-center align-items-center">
                <h2 className="text-center">All Category</h2>
                <div className=" row gap-3 row-cols-auto row-cols-sm-auto row-cols-md-auto gx-0 justify-content-center align-items-center">
                    {categoryData?.map((c, i) => {
                        return (
                            <NavLink key={i} to={c.slug} className=" border-0 bg-white d-flex justify-content-center align-items-center" style={{ width: "100px", height: "100px", borderRadius: "50%" }}>
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <img className="" style={{ width: "30px" }} src={c.icon.secure_url} alt="" />
                                    <p className="text-center" style={{ fontSize: "14px" }}>{c.name}</p>
                                </div>
                            </NavLink>
                        )
                    })}
                </div>
            </div>
        </Layout>
    )
}

export default Categories


{/* <div className="col-md-6 mt-5 mb-3 gx-3 gy-3">
                                <Link className="btn btn-primary" to={`/category/${c.slug}`}>
                                    {c.name}
                                </Link>
                            </div> */}