import Footer from "./Footer"
import Header from "./Header";
import { Helmet } from "react-helmet";

function Layout({ children, title, description, keywords, author }) {
    return (
        <div>
            <Helmet>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: "75vh" }}>
                {children}
            </main>
            <Footer />
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