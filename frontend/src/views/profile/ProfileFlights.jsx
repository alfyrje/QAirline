import React, { useState, useEffect, useRef } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useParams, Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/auth";
import { register } from "../../utils/auth";

import "./profile.css";

function ProfileFlights() {
  return (
    <>
      <div className="profile-content">
        <div className="profile-flights-header">Lịch sử chuyến bay</div>
        <div className="profile-flights-content">
          <div className="profile-flights-search">
            <div className="profile-flights-search-date">
              <label htmlFor="date">Từ ngày</label>
              <input type="date"></input>
            </div>
            <div className="profile-flights-search-date">
              <label htmlFor="date">Đến ngày</label>
              <input type="date"></input>
            </div>
            <div className="profile-flights-search-button">
              <button>Tìm kiếm</button>
            </div>
          </div>
          <div className="profile-flights-list">
            <div className="profile-flights-list-header">
            <div className="profile-flights-list-row">
      <div className="column ticket-id">Mã vé</div>
      <div className="column departure-time">Thời gian xuất phát</div>
      <div className="column arrival-time">Thời gian đến</div>
      <div className="column departure-location">Địa điểm xuất phát</div>
      <div className="column arrival-location">Địa điểm đến</div>
      <div className="column passenger-info">Thông tin người bay</div>
      <div className="column ticket-info">Thông tin vé</div>
      <div className="column status">Trạng thái</div>
    </div>
            </div>
            <div className="profile-flights-list-body">
    {/* Các hàng dữ liệu */}
    <div className="profile-flights-list-row">
      <div className="column ticket-id">12345</div>
      <div className="column departure-time">2024-11-15 08:00</div>
      <div className="column arrival-time">2024-11-15 10:00</div>
      <div className="column departure-location">Hà Nội</div>
      <div className="column arrival-location">Hồ Chí Minh</div>
      <div className="column passenger-info">Nguyễn Văn A</div>
      <div className="column ticket-info">Ghế 12A, Hạng Thương gia</div>
      <div className="column status">Hoàn tất</div>
    </div>
    {/* Thêm nhiều hàng khác nếu cần */}
  </div>          </div>
          
        </div>
      </div>
    </>
  );
}
export default ProfileFlights;
