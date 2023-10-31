function Carousel() {
    return (
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval={10000}>
                    <img src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1698604141_Top_Deals_on_Exclusive_Styles.jpg?im=Resize=(1680,320)" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item" data-bs-interval={2000}>
                    <img src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1698437393_Aaj_Ki_deals_banner_HPMC_desktop.jpg?im=Resize=(1680,320)" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://images-static.nykaa.com/uploads/091ddfbf-3c1d-4790-abbb-44cf3b3d09e1.JPG?tr=w-1200,cm-pad_resize" className="d-block w-100" alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
            </button>
        </div>

    )
}

export default Carousel