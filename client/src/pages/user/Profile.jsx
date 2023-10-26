import Layout from "../../components/Layout/Layout"
import UserMenu from "../../components/Layout/userMenu"

function Profile() {
    return (
        <Layout title={"User - Profile Page"}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Profile Content</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile