import AdminMenu from "../../components/Layout/AdminMenu"
import Layout from "../../components/Layout/Layout"

function Users() {
    return (
        <Layout title={"Create All Users Page"}>
            <div className="container-fluid p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        All Users
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Users