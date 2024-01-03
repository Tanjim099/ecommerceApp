import Footer from "./Footer"
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar";
import "../../styles/Layout.css"
import FooterNavbar from "./FooterNavbar";

function Layout({ children, title, description, keywords, author }) {
    return (
        <div>
            <Helmet>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            {/* <div className="testHeader">
                <Header />
            </div> */}
            <Navbar />
            <main style={{ minHeight: "75vh", marginTop: "0px" }}>
                <Toaster />
                {children}
            </main>
            <Footer />
            <div className="FooterNavbarBox" style={{ height: "6vh" }}>
                <FooterNavbar />
            </div>
        </div>
    )
};

Layout.defaultProps = {
    title: "Home Page",
    description: "Mern Stack Project",
    keywords: "React, Node, Express, MongoDB",
    author: "Tanjim"
}

export default Layout