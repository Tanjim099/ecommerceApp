import { useSelector } from "react-redux";
import "../styles/Slider.css";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { NavLink } from "react-router-dom";
function CollectionSlider() {
    const { categoryData } = useSelector((state) => state?.category)

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
                    categoryData?.map((c, i) => {
                        return (
                            <NavLink key={i} to={`/category/${c.slug}`} className="sliderItem d-flex flex-column justify-content-center align-items-center ">
                                <img className="bg-white p-4" src={c?.icon?.secure_url} alt="" />
                                <h3 className="fs-6">{c?.name}</h3>
                            </NavLink>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CollectionSlider