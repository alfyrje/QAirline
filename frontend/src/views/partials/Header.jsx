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
      <nav className="header-navbar">
        <div className="header-logoContainer">
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
        <div className="header-navLink">
          <Link to="/" id="header-khamPha">
            Khám phá
          </Link>
          <Link to="/bookings" id="header-datVe">
            Đặt vé
          </Link>
          <Link to="/contact" id="header-thongTinHanhTrinh">
            Thông tin hành trình
          </Link>
        </div>
        <div className="header-authLink">
          <Link to="/Đăng nhập" className="header-signIn">
            Đăng nhập
          </Link>
          <a id = 'header-separation'> | </a>
          <Link to="/Đăng kí" className="header-logOut">
            Đăng ký
          </Link>
        </div>
      </nav>

    {/* sidebar
      menu-item
        title 
        Sublist
          list-item */}



      <div className="header-sideBar">
      <div
          className={`menu-item ${activeMenu === 0 ? "active" : ""}`
        }
          onClick={() => toggleSublist(-1)} // Pass index to toggle
          id = "logInLogOutMedia"
        >
          <div id="header-authLinkSideBar">
            <Link to="/Đăng nhập" className="header-signIn">
              Đăng nhập
            </Link>
            <a id = 'header-separation'> | </a>
            <Link to="/Đăng kí" className="header-logOut">
              Đăng ký
            </Link>
          </div>
        </div>

        <div
          className={`header-menu-item ${activeMenu === 0 ? "active" : ""}`}
          onClick={() => toggleSublist(0)} // Pass index to toggle
        >
          
          <div className="header-title">Khám phá</div>
          <div className="header-sub-list">
            <div className="header-sub-title">Sublist 1</div>
            <div className="header-list-item">Item 1</div>
            <div className="header-list-item">Item 2</div>
            <div className="header-list-item">Item 3</div>
          </div>
          <div className="header-sub-list">
            <div className="header-sub-title">Sublist 2</div>
            <div className="header-list-item">Item 1</div>
            <div className="header-list-item">Item 2</div>
          </div>
          <div className="header-sub-list">
            <div className="header-sub-title">Sublist 3</div>
            <div className="header-list-item">Item 1</div>
            <div className="header-list-item">Item 2</div>
            <div className="header-list-item">Item 3</div>
          </div>
        </div>

        <div
          className={`header-menu-item ${activeMenu === 1 ? "active" : ""}`}
          onClick={() => toggleSublist(1)}
        >
          <div className="header-title">Đặt vé</div>
          <div className="header-sub-list">
            <div className="header-sub-title">Sublist 1</div>
            <div className="header-list-item">Item 1</div>
            <div className="header-list-item">Item 2</div>
          </div>
        </div>

        <div
          className={`header-menu-item ${activeMenu === 2 ? "active" : ""}`}
          onClick={() => toggleSublist(2)}
        >
          <div className="header-title">Thông tin hành trình</div>
          <div className="header-sub-list">
            <div className="header-sub-title">Sublist 1</div>
            <div className="header-list-item">Item 1</div>
            <div className="header-list-item">Item 2</div>
          </div>
        </div>

        <div
          className={`header-menu-item ${activeMenu === 3 ? "active" : ""}`}
          onClick={() => toggleSublist(3)}
        >
          <div className="header-title">Bamboo Club</div>
          <div className="header-sub-list">
            <div className="header-sub-title">Sublist 1</div>
            <div className="header-list-item">Item 1</div>
            <div className="header-list-item">Item 2</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
