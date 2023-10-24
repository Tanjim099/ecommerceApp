import Footer from "./Footer"
import Header from "./Header"

function Layout({ children }) {
    return (
        <div>
            <Header />
            <main style={{ minHeight: "75vh" }}>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout