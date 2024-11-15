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
      <section class="profile-container">
        <Header />
        <div class="profile-content-container">
          <div class="profile-sidemenu">
            <ul class="profile-sidemenu-list">
              <li class="active">
                <a class="profile-a"href="#">
                  <span class="text">Thông tin tài khoản</span>
                </a>
              </li>
              <li>
                <a class="profile-a"href="#">
                  <span class="text">Lịch sử chuyến bay</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="profile-content">
            <ProfileInfo />
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}
export default Profile;
