function Carousel() {
    return (
        <div className="container mt-5">
            <div className="row" style={{ height: "500px", backgroundColor: "red" }}>
                <div className="col-md-8 h-100">
                    <div id="carouselExampleInterval" style={{ height: "100%" }} className="carousel slide w-100 h-100" data-bs-ride="carousel">
                        <div className="carousel-inner" style={{ height: "100%" }}>
                            <div className="carousel-item active h-100" data-bs-interval={10000}>
                                <img src="https://images.meesho.com/images/marketing/1698036743131_512.webp" className="d-block w-100 h-100" alt="..." />
                            </div>
                            <div className="carousel-item h-100" data-bs-interval={2000}>
                                <img src="https://images.samsung.com/is/image/samsung/assets/in/home/1103/Flip5_Yellow_D1.png?imwidth=2560" className="d-block w-100 h-100" alt="..." />
                            </div>
                            <div className="carousel-item" style={{ height: "100%" }}>
                                <img src="https://images.samsung.com/is/image/samsung/assets/in/home/BigTV-festival-KV_HP-1.jpg?imwidth=1366" className="d-block w-100 h-100" alt="..." />
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
                </div>
                <div className="col-md-4">
                    <div className="d-flex flex-column justify-content-between row-gap-2 w-100 h-100" style={{ height: "100%" }}>
                        <div className=" w-100 h-100 bg-secondary-subtle p-2">
                            <img
                                src="https://i.ytimg.com/vi/FT3ODSg1GFE/maxresdefault.jpg"
                                className="w-100 h-100" alt=""
                            />
                        </div>
                        <div className="w-100 h-100 bg-secondary-subtle p-2">
                            <img
                                src="https://www.91-cdn.com/hub/wp-content/uploads/2023/01/Bluetooth-audio-codec-explained.jpg"
                                alt=""
                                className="w-100 h-100"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default Carousel