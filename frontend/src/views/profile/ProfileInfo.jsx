import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useParams, Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/auth";
import { register } from "../../utils/auth";

import "./profile.css";

function ProfileInfo() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/users/profile/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load user profile");
        }
        return response.json();
      })
      .then((data) => {  
        console.log(data.id);
        setUserData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="profile-content">
        <div className="profile-info-header">Thông tin cá nhân</div>
        <div className="profile-info">
          <div className="profile-info-item">
            <label htmlFor="full-name">Họ tên:</label> {userData.first_name} {userData.last_name}
          </div>
          <div className="profile-info-column">
            <div className="profile-info-item">
              <label htmlFor="date_birth">
                Ngày sinh: 
              </label> {userData.personal_info.date_of_birth}
            </div>
            <div className="profile-info-item">
              <label htmlFor="gender">
                Giới tính: 
              </label> {userData.personal_info.gender}
            </div>
          </div>
          <div className="profile-info-item">
            <label htmlFor="email">
            Email:
            </label>{userData.email}
          </div>
          <div className="profile-info-item">
            <label htmlFor="phone-number">
            Số điện thoại: 
            </label> {userData.personal_info.tel_num}
          </div>
          <div className="profile-info-item">
            <label htmlFor="citizen-id">
            Số CCCD: 
            </label> {userData.personal_info.citizen_id}
          </div>
          <div className="profile-info-item">
          <label htmlFor="current-password">Mật khẩu hiện tại:</label>
          <input
            id="current-password"
            type="password"
            placeholder="Mật khẩu cũ"
          />
        </div>
        <div className="profile-info-column">
          <div className="profile-info-item">
            <label htmlFor="new-password">Mật khẩu mới:</label>
            <input
              id="new-password"
              type="password"
              placeholder="Mật khẩu mới"
            />
          </div>
          <div className="profile-info-item">
            <label htmlFor="confirm-password">Xác nhận mật khẩu:</label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Nhập lại mật khẩu mới"
            />
            <button className="profile-info-edit-button"></button>
          </div>

        </div>
        </div>
      </div>
    </>
  );
}
export default ProfileInfo;
