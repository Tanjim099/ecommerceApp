import AdminMenu from "../../components/Layout/AdminMenu"
import Layout from "../../components/Layout/Layout"

function CreateCategory() {
    return (
        <Layout title={"Create Category Page"}>
            <div className="container-fluid p-3">
                <div className="row">
                    <div className="col-md-3">
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