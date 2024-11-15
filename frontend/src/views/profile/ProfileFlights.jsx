import React, { useState, useEffect, useRef } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useParams, Link, useNavigate } from "react-router-dom";

import apiInstance from "../../utils/axios";
import { useAuthStore } from "../../store/auth";
import { register } from "../../utils/auth";

import "./profile.css";

function ProfileFlights() {
  return (
    <>
      <div class="profile-info-container">
        <div class="profile-info-header">Thông tin cá nhân</div>
        <div class="profile-info">
          <div class="profile-info-item">Mã hành khách</div>
          <div class="profile-info-item">Họ tên</div>
          <div class="profile-info-column">
            <div class="profile-info-item">
              <label htmlFor="date_birth">Ngày sinh</label>
            </div>
            <div class="profile-info-item">
              <label htmlFor="gender">Giới tính</label>
            </div>
          </div>
          <div class="profile-info-item">Email</div>
          <div class="profile-info-item">Số điện thoại</div>
          <div class="profile-info-item">Số CCCD</div>
          <div class="profile-edit-pwd">
            <label>Mật khẩu hiện tại</label>
            <input type="password"></input>
            <div class="profile-info-column">
              <label>Mật khẩu mới</label>
              <input type="password"></input>
              <label>Xác minh mật khẩu mới</label>
              <input type="password"></input>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProfileFlights;
