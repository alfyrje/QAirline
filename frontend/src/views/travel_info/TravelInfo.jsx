import { useNavigate } from "react-router-dom";
import "./travelInfo.css";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import ImageSeparator from "../partials/ImageSeparator";

const TravelInfo = () => {
  const navigate = useNavigate();
  const handleInfoClick = (title) => {
    navigate(`/travel-info/${title}`);
    console.log(title);
  };
  return (
    <>
      <Header />
      <ImageSeparator imagePath="/separator/separator_travel_info.jpg" />
      <div className="travel-container">
        <h1 className="travel-title">Thông tin hành trình</h1>
        <div className="travel-grid-container">
          <div className="travel-card">
            <img
              src="/images_info/hanhli.jpg"
              alt="Hành lý"
              className="travel-card-image"
            />
            <div
              className="travel-card-title"
              onClick={handleInfoClick("Hành lý")}
            >
              Hành lý
            </div>
          </div>
          <div className="travel-card">
            <img
              src="/images_info/booking.jpg"
              alt="Làm thủ tục"
              className="travel-card-image"
            />
            <div className="travel-card-title">Làm thủ tục</div>
          </div>

          <div className="travel-card">
            <img
              src="/images_info/dichvudacbiet.jpg"
              alt="Dịch vụ đặc biệt"
              className="travel-card-image"
            />
            <div className="travel-card-title">Dịch vụ đặc biệt</div>
          </div>
          <div className="travel-card">
            <img
              src="/images_info/giayto.jpg"
              alt="Yêu cầu giấy tờ"
              className="travel-card-image"
            />
            <div className="travel-card-title">Yêu cầu giấy tờ</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TravelInfo;
