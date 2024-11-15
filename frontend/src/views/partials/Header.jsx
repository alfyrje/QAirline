import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./header.css";
import "../../index.css";

function Header() {
  const [activeMenu, setActiveMenu] = useState(null);

  // Function to toggle the 'active' class
  const toggleSublist = (index) => {
    setActiveMenu(activeMenu === index ? null : index); // Toggle active state
  };

  return (
    <>
      <nav className="navbar">
        <div className="logoContainer">
          <Link to="/">
            <img
              src="/images/0.svg"
              alt="Logo"
              width={200}
              height={80}
              className="logo"
            />
          </Link>
        </div>
        <div className="navLink">
          <Link to="/" id="khamPha">
            Khám phá
          </Link>
          <Link to="/bookings" id="datVe">
            Đặt vé
          </Link>
          <Link to="/contact" id="thongTinHanhTrinh">
            Thông tin hành trình
          </Link>
        </div>
        <div className="authLink">
          <Link to="/Đăng nhập" className="signIn">
            Đăng nhập
          </Link>
          <Link to="/Đăng kí" className="logOut">
            Đăng ký
          </Link>
        </div>
      </nav>

      <div className="sideBar">
        <div
          className={`menu-item ${activeMenu === 0 ? "active" : ""}`}
          onClick={() => toggleSublist(0)} // Pass index to toggle
        >
          <div className="title">Khám phá</div>
          <div className="sub-list">
            <div className="sub-title">Sublist 1</div>
            <div className="list-item">Item 1</div>
            <div className="list-item">Item 2</div>
            <div className="list-item">Item 3</div>
          </div>
          <div className="sub-list">
            <div className="sub-title">Sublist 2</div>
            <div className="list-item">Item 1</div>
            <div className="list-item">Item 2</div>
          </div>
          <div className="sub-list">
            <div className="sub-title">Sublist 3</div>
            <div className="list-item">Item 1</div>
            <div className="list-item">Item 2</div>
            <div className="list-item">Item 3</div>
          </div>
        </div>

        <div
          className={`menu-item ${activeMenu === 1 ? "active" : ""}`}
          onClick={() => toggleSublist(1)}
        >
          <div className="title">Đặt vé</div>
          <div className="sub-list">
            <div className="sub-title">Sublist 1</div>
            <div className="list-item">Item 1</div>
            <div className="list-item">Item 2</div>
          </div>
        </div>

        <div
          className={`menu-item ${activeMenu === 2 ? "active" : ""}`}
          onClick={() => toggleSublist(2)}
        >
          <div className="title">Thông tin hành trình</div>
          <div className="sub-list">
            <div className="sub-title">Sublist 1</div>
            <div className="list-item">Item 1</div>
            <div className="list-item">Item 2</div>
          </div>
        </div>

        <div
          className={`menu-item ${activeMenu === 3 ? "active" : ""}`}
          onClick={() => toggleSublist(3)}
        >
          <div className="title">Bamboo Club</div>
          <div className="sub-list">
            <div className="sub-title">Sublist 1</div>
            <div className="list-item">Item 1</div>
            <div className="list-item">Item 2</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
