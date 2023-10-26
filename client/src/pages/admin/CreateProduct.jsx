import AdminMenu from "../../components/Layout/AdminMenu"
import Layout from "../../components/Layout/Layout"

function CreateProduct() {
    return (
        <Layout title={"Create Product Page"}>
            <div className="container-fluid p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        Create Product Page
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct