import Layout from "../../components/Layout/Layout"
import UserMenu from "../../components/Layout/userMenu"

function Orders() {
    return (
        <Layout title={"User - Orders Page"}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Oders Content</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders