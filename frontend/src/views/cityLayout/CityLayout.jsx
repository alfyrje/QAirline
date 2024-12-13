import { useNavigate } from "react-router-dom";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import ImageSeparator from "../partials/ImageSeparator";
import "./cityLayout.css";

const CityLayout = () => {
  //   const navigate = useNavigate();
  //   const handleInfoClick = (title) => {
  //     navigate(`/travel-info/${title}`);
  //     console.log(title);
  //   };
  return (
    <>
      <Header />
      <ImageSeparator imagePath="/separator/separator_travel_info.jpg" />
      <div className="cityLayout">
        <h1 className="exploreTitle">Top điểm đến phổ biến</h1>
        <div className="cityContainerBackground">
          <div className="cityContainer">
            <div className="domestic-destination">
              <div className="area-text ">Nội địa Việt Nam</div>
              <div className="city-grid-container">
                <div className="bigger-city-card city-card">
                  <img
                    src="/images_info/hanhli.jpg"
                    alt="Hành lý"
                    className="citycard-image"
                  />
                  <div className="city-title">Tp Hồ Chí Minh</div>
                </div>
                <div className="smaller-city-card city-card">
                  <img
                    src="/images_info/booking.jpg"
                    alt="Làm thủ tục"
                    className="travel-card-image"
                  />
                  <div className="city-title">Hà Nội</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CityLayout;
