import React, { useState, useEffect, useRef } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useParams, Link, useNavigate } from "react-router-dom";

import apiInstance from "../../utils/axios";
import { useAuthStore } from "../../store/auth";
import { register } from "../../utils/auth";

import "./profile.css";

function ProfileInfo() {
  return (
    <>
      <div className="profile-content">
        <div className="profile-info-header">Thông tin cá nhân</div>
        <div className="profile-info">
          <div className="profile-info-item">Mã hành khách</div>
          <div className="profile-info-item">Họ tên</div>
          <div className="profile-info-column">
            <div className="profile-info-item">
              <label htmlFor="date_birth">Ngày sinh</label>
            </div>
            <div className="profile-info-item">
              <label htmlFor="gender">Giới tính</label>
            </div>
          </div>
          <div className="profile-info-item">Email</div>
          <div className="profile-info-item">Số điện thoại</div>
          <div className="profile-info-item">Số CCCD</div>
          <div className="profile-edit-pwd">
            <div className="profile-info-item">
            <label>Mật khẩu hiện tại</label>
            <input type="password"></input>
            </div>
            <div className="profile-info-column">
              <div className="profile-info-item">
              <label>Mật khẩu mới</label>
              <input type="password"></input>
              </div>
              <div className="profile-info-item">
              <label>Xác minh mật khẩu mới</label>
              <input type="password"></input>
              </div>
            </div>
          </div>
        </div>
        <button className="profile-info-edit">Sửa thông tin</button>
      </div>
    </>
  );
}
export default ProfileInfo;
