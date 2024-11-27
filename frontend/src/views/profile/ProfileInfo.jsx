import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
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
          <div className="profile-info-item">Mã hành khách: {userData.id}</div>
          <div className="profile-info-item">
            Họ tên: {userData.first_name} {userData.last_name}
          </div>
          <div className="profile-info-column">
            <div className="profile-info-item">
              <label htmlFor="date_birth">
                Ngày sinh: {userData.personal_info.date_of_birth}
              </label>
            </div>
            <div className="profile-info-item">
              <label htmlFor="gender">
                Giới tính: {userData.personal_info.gender}
              </label>
            </div>
          </div>
          <div className="profile-info-item">Email: {userData.email}</div>
          <div className="profile-info-item">
            Số điện thoại: {userData.personal_info.tel_num}
          </div>
          <div className="profile-info-item">
            Số CCCD: {userData.personal_info.citizen_id}
          </div>
        </div>
      </div>
    </>
  );
}
export default ProfileInfo;
