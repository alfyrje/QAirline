import React, { useState, useEffect, useRef } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProfileFlights from "./ProfileFlights";
import ProfileInfo from "./ProfileInfo"

import apiInstance from "../../utils/axios";
import { useAuthStore } from "../../store/auth";
import { register } from "../../utils/auth";

import "./profile.css";

function Profile() {
  return (
    <>
      <section class="container">
        <Header />
        {/* <ProfileFlights />
        <ProfileInfo /> */}
        <div class="profile-container">
            <div class="profile-menu-nav">
                <ul>
                    <li>
                        <Link to="/profile/flights">Chuyến bay</Link>
                    </li>
                    <li>
                        <Link to="/profile/info">Thông tin</Link>
                    </li>
                </ul>
            </div>
            <div class="profile-content">
                <ProfileFlights />
            </div>
        </div>
        <Footer />
      </section>
    </>
  );
}
export default Profile;