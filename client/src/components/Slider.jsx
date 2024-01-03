import { useSelector } from "react-redux";
import "../styles/Slider.css";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { NavLink } from "react-router-dom";
function CollectionSlider() {
    const { categoryData } = useSelector((state) => state?.category)
    console.log(categoryData)

    let sliderItems = document.getElementById("sliderItems");
    function arrowLeft() {
        console.log("yes")
        sliderItems.scrollLeft -= 400
    }
    function arrowRight() {
        sliderItems.scrollLeft += 400
    }
    return (
        <div className="sliderContainer">
            <div className="sliderBtn">
                <button onClick={arrowLeft}><BsArrowLeft /></button>
                <button onClick={arrowRight}><BsArrowRight /></button>
            </div>
            <div className="sliderItems" id="sliderItems">
                {
                    categoryData?.map((c) => {
                        return (
                            <NavLink to={`/category/${c.slug}`} className="sliderItem d-flex flex-column justify-content-center align-items-center ">
                                <img className="bg-white p-4" src={c?.icon?.secure_url} alt="" />
                                <h3 className="fs-6">{c?.name}</h3>
                            </NavLink>
                        )
                    })
                }
                {/* <div className="sliderItem">
                    <img src="https://suruchi-demo-3.myshopify.com/cdn/shop/files/Frame_2_360x.png?v=1695197183" alt="" />
                    <h3>Mobile Phone</h3>
                    <h5>5 Items</h5>
                </div>
                <div className="sliderItem">
                    <img src="https://suruchi-demo-3.myshopify.com/cdn/shop/files/Frame_2_360x.png?v=1695197183" alt="" />
                    <h3>Mobile Phone</h3>
                    <h5>5 Items</h5>
                </div>
                <div className="sliderItem">
                    <img src="https://suruchi-demo-3.myshopify.com/cdn/shop/files/Frame_2_360x.png?v=1695197183" alt="" />
                    <h3>Mobile Phone</h3>
                    <h5>5 Items</h5>
                </div>
                <div className="sliderItem">
                    <img src="https://suruchi-demo-3.myshopify.com/cdn/shop/files/Frame_2_360x.png?v=1695197183" alt="" />
                    <h3>Mobile Phone</h3>
                    <h5>5 Items</h5>
                </div>
                <div className="sliderItem">
                    <img src="https://suruchi-demo-3.myshopify.com/cdn/shop/files/Frame_2_360x.png?v=1695197183" alt="" />
                    <h3>Mobile Phone</h3>
                    <h5>5 Items</h5>
                </div>
                <div className="sliderItem">
                    <img src="https://suruchi-demo-3.myshopify.com/cdn/shop/files/Frame_2_360x.png?v=1695197183" alt="" />
                    <h3>Mobile Phone</h3>
                    <h5>5 Items</h5>
                </div>
                <div className="sliderItem">
                    <img src="https://suruchi-demo-3.myshopify.com/cdn/shop/files/Frame_2_360x.png?v=1695197183" alt="" />
                    <h3>Mobile Phone</h3>
                    <h5>5 Items</h5>
                </div>
                <div className="sliderItem">
                    <img src="https://suruchi-demo-3.myshopify.com/cdn/shop/files/Frame_2_360x.png?v=1695197183" alt="" />
                    <h3>Mobile Phone</h3>
                    <h5>5 Items</h5>
                </div>
                <div className="sliderItem">
                    <img src="https://suruchi-demo-3.myshopify.com/cdn/shop/files/Frame_2_360x.png?v=1695197183" alt="" />
                    <h3>Mobile Phone</h3>
                    <h5>5 Items</h5>
                </div> */}
            </div>
        </div>
    )
}

export default CollectionSlider