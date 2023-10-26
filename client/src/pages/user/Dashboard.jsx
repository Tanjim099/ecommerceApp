import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/userMenu";

function Dashboard() {
    return (
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard