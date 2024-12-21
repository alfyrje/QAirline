import { useNavigate } from "react-router-dom";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import ImageSeparator from "../partials/ImageSeparator";
import "./cityLayout.css";
import { useEffect } from 'react';

const CityLayout = () => {
  const navigate = useNavigate();
    useEffect(() => {
        const handleCityClick = (e) => {
          if (e.target.className === 'city-title') {
            const cityName = e.target.textContent; 
            console.log(`Clicked city: ${cityName}`);
            navigate(`/dashboard/cityIntroduction/${cityName}/`);
          }
        };

        document.addEventListener('click', handleCityClick);
        
        return () => {
          document.removeEventListener('click', handleCityClick);
        };
      }, []);

  return (
    <>
      <Header />
      <ImageSeparator imagePath="/images/gigapixel-bg3(1).png"/>
      <div className="cityLayout">
        <h1 className="exploreTitle">Top điểm đến phổ biến</h1>
          <div className="areaContainer vietnam">
            <div className ="area-element">
              <div className="area-text ">Nội địa Việt Nam</div>
              <div className="city-grid-container">
                <div className="bigger-city-card city-card">
                  <img
                    src="/images_info/hoian.jpg"
                    alt="Hội An"
                    className="citycard-image"
                  />
                  <div className="city-title">Hội An</div>
                </div>
                <div className="smaller-city-card city-card">
                  <img
                    src="/images_info/hanoi.jpg"
                    alt="Hà Nội"
                    className="citycard-image"
                  />
                  <div className="city-title">Hà Nội</div>
                </div>
              </div>
            </div>
          </div>


          <div className="areaContainer dongnama">
            <div className ="area-element">
              <div className="area-text ">Đông Nam Á</div>
              <div className="dongnama-city-grid-container">
                <div className="smaller-city-card city-card">
                  <img
                    src="/images_info/bangkok.jpg"
                    alt="Bangkok"
                    className="citycard-image"
                  />
                  <div className="city-title">Bangkok</div>
                </div>
                <div className="bigger-city-card city-card">
                  <img
                    src="/images_info/jakarta.jpg"
                    alt="Jakarta"
                    className="citycard-image"
                  />
                  <div className="city-title">Jakarta</div>
                </div>
                <div className="biggest-city-card city-card">
                  <img
                    src="/images_info/singapore.jpg"
                    alt="Singapore"
                    className="citycard-image"
                  />
                  <div className="city-title">Singapore</div>
                </div>
              </div>
            </div>
          </div>


          
          <div className="areaContainer dongbaca">
            <div className ="area-element">
              <div className="area-text ">Đông Bắc Á</div>
              <div className="city-grid-container">
                <div className="bigger-city-card city-card">
                  <img
                    src="/images_info/jeju.jpg"
                    alt="Hành lý"
                    className="citycard-image"
                  />
                  <div className="city-title">Jeju</div>
                </div>
                <div className="smaller-city-card city-card">
                  <img
                    src="/images_info/tokyo.jpg"
                    alt="Làm thủ tục"
                    className="citycard-image"
                  />
                  <div className="city-title">Tokyo</div>
                </div>
              </div>
            </div>
          </div>


          <div className="areaContainer">
            <div className ="area-element">
              <div className="area-text ">Châu Âu</div>

              <div className="city-grid-container">
              <div className="biggest-city-card city-card">
                  <img
                    src="/images_info/london.jpg"
                    alt="Hành lý"
                    className="citycard-image"
                  />
                  <div className="city-title">London</div>
                </div>
                <div className="bigger-city-card city-card">
                  <img
                    src="/images_info/berlin.jpg"
                    alt="Hành lý"
                    className="citycard-image"
                  />
                  <div className="city-title">Berlin</div>
                </div>
                <div className="smaller-city-card city-card">
                  <img
                    src="/images_info/paris.jpg"
                    alt="Làm thủ tục"
                    className="citycard-image"
                  />
                  <div className="city-title">Paris</div>
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
