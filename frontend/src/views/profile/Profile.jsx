import React, { useState, useEffect, useRef } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProfileFlights from "./ProfileFlights";
import ProfileInfo from "./ProfileInfo";
import ImageSeparator from "../partials/ImageSeparator";
import { useAuthStore } from "../../store/auth";
import { register } from "../../utils/auth";

import "./profile.css";

function Profile() {
  const [currentView, setCurrentView] = useState("flights");
  const renderContent = () => {
    switch (currentView) {
      case "flights":
        return <ProfileFlights />;
      case "info":
        return <ProfileInfo />;
      default:
        return <ProfileInfo />;
    }
  }
  return (
    <>
      <section className="profile-container">
        <Header />
            <ImageSeparator imagePath="/separator/separator_travel_info.jpg" />
        <div className="profile-content-container">
          <div className="profile-sidemenu">
            <div className="profile-sidemenu-list">
              <div className='profile-sidemenu-item'>
                <a className="profile-a"href="#info"
                onClick={()=>setCurrentView("info")}
                >
                  <span className="text">Thông tin tài khoản</span>
                </a>
              </div>
              <div className='profile-sidemenu-item'>
                <a className="profile-a"href="#flights"
                onClick={()=>setCurrentView("flights")}
                >
                  <span className="text">Lịch sử chuyến bay</span>
                </a>
              </div>
            </div>
          </div>
          {renderContent()}
        </div>
        <Footer />
      </section>
    </>
  );
}
export default Profile;
