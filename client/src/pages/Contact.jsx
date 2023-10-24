import Layout from "../components/Layout/Layout";
import { BiSupport, BiPhoneCall, BiMailSend } from "react-icons/bi"

function ContactPage() {
    return (
        <Layout title={"Contact - Page"}>
            <div className="row contactus ">
                <div className="col-md-6 ">
                    <img
                        src="https://contact-centres.com/wp-content/uploads/2018/11/happy-contact-centre-agent.jpg"
                        alt="contactus"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-4">
                    <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
                    <p className="text-justify mt-2">
                        any query and info about prodduct feel free to call anytime we 24X7
                        vaialible
                    </p>
                    <p className="mt-3">
                        <BiMailSend /> : www.help@ecommerceapp.com
                    </p>
                    <p className="mt-3">
                        <BiPhoneCall /> : 012-3456789
                    </p>
                    <p className="mt-3">
                        <BiSupport /> : 1800-0000-0000 (toll free)
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default ContactPage