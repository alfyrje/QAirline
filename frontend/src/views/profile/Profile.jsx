import React, { useState, useEffect, useRef } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProfileFlights from "./ProfileFlights";
import ProfileInfo from "./ProfileInfo";

import apiInstance from "../../utils/axios";
import { useAuthStore } from "../../store/auth";
import { register } from "../../utils/auth";

import "./profile.css";

function Profile() {
  return (
    <>
      <section className="profile-container">
        <Header />
        <div className="profile-content-container">
          <div className="profile-sidemenu">
            <ul className="profile-sidemenu-list">
              <li className='profile-sidemenu-item'>
                <a className="profile-a"href="#">
                  <span className="text">Thông tin tài khoản</span>
                </a>
              </li>
              <li className='profile-sidemenu-item'>
                <a className="profile-a"href="#">
                  <span className="text">Lịch sử chuyến bay</span>
                </a>
              </li>
              <li className='profile-sidemenu-item'>
                <a className="profile-a"href="#">
                  <span className="text">Đổi mật khẩu</span>
                </a>
              </li>
            </ul>
          </div>
            <ProfileFlights />
            {/* <ProfileInfo /> */}
        </div>
        <Footer />
      </section>
    </>
  );
}
export default Profile;
