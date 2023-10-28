import { useDispatch, useSelector } from "react-redux"
import AdminMenu from "../../components/Layout/AdminMenu"
import Layout from "../../components/Layout/Layout"
import { useEffect } from "react";
import { getCategories } from "../../redux/slices/categorySlice";

function CreateCategory() {
    const dispatch = useDispatch();
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
        <Layout title={"Create Category Page"}>
            <div className="container-fluid px-5 py-3">
                <div className="row">
                    <div className="col-md-2">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        Create Category Page
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory