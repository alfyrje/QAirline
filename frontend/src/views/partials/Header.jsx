import { FaBars, FaTimes } from "react-icons/fa";
import "./header.css";
import "../../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { logout } from "../../utils/auth";
import profile from "/icons/square-user.svg";
import user from "/icons/circle-user-round.svg";
import logout_icon from "/icons/log-out.svg";
import React, { useState, useEffect, useRef } from "react";
import notification_icon from "/icons/bell-ring.svg";
import { stack as Menu } from "react-burger-menu";
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

function NotificationItem({ notification }) {
  return (
    <li className="notification-item">
      <div className="notification-title">{notification.title}</div>
      <div className="notification-time">
        {format(new Date(notification.created_at), 'HH:mm - dd/MM/yyyy', { locale: vi })}
      </div>
    </li>
  );
}

function Header() {
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn, checkLoginStatus } = useAuthStore();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchNotifications = async () => {
      console.log("Fetching notifications...");
      try {
        const response = await fetch(
          'http://localhost:8000/adminapp/notifications/',
          {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Notifications:', data);
        setNotifications(data.map(news => ({
          title: news.title,
          message: news.content,
          created_at: news.created_at,
          flight_code: news.flight_code
        })));

      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (token) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/dashboard");
  };

  // Function to toggle the 'active' class
  const toggleSublist = (index) => {
    setActiveMenu(activeMenu === index ? null : index); // Toggle active state
  };
  const [open, setOpen] = useState(false);
  let menuRef = useRef();
  let notificationRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current || !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
      <nav className="header-navbar">
        <div className="header-logoContainer">
          <Link to="/dashboard">
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
          <Link to="/explore" id="header-khamPha">
            Khám phá
          </Link>
          <Link to="/discount" id="header-datVe">
            Khuyến mãi
          </Link>
          <Link to="/travel-info" id="header-thongTinHanhTrinh">
            Thông tin hành trình
          </Link>
          <Link to="/ticket-info" id="header-thongTinHanhTrinh">
            Vé đã đặt
          </Link>
        </div>
        <div>
          <Menu right className="navSideBar">
            <a className="menu-item" href="/login">
              Đăng nhập
            </a>
            <a className="menu-item" href="/register">
              Đăng Kí
            </a>
            <a id="home" className="menu-item" href="/explore">
              Khám phá
            </a>
            <a id="about" className="menu-item" href="/discount">
              Khuyến mãi
            </a>
            <a id="contact" className="menu-item" href="/travel-info">
              Thông tin hành trình
            </a>
            <a id="contact" className="menu-item" href="/ticket-info">
              Vé đã đặt 
            </a>
            {/* <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */}
          </Menu>

          {isLoggedIn ? (
            <>
              <div className="header-controls">
                <div className="header-notification" ref={notificationRef}>
                  <div
                    className="menu-trigger"
                    onClick={() => setNotificationOpen(!notificationOpen)}
                  >
                    <img src={notification_icon} alt="notification" />
                  </div>

                  <div className={`dropdown-menu ${notificationOpen ? "active" : "inactive"}`}>
                    <ul>
                      {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                          <NotificationItem
                            key={index}
                            notification={notification}
                          />
                        ))
                      ) : (
                        <li className="notification-item">Không có thông báo mới</li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="header-logOut" ref={menuRef}>
                  <div
                    className="menu-trigger"
                    onClick={() => {
                      setOpen(!open);
                    }}
                  >
                    <img src={user} alt="user" />
                  </div>
                  <div
                    className={`dropdown-menu ${open ? "active" : "inactive"}`}
                  >
                    <ul>
                      <Link to="/profile">
                        <DropdownItem
                          img={profile}
                          className="dropdownItem"
                          text={"Thông tin cá nhân"}
                        />
                      </Link>
                      <div onClick={handleLogout}>
                        <DropdownItem
                          img={logout_icon}
                          className="dropdownItem"
                          text={"Đăng xuất"}
                        />
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
              <Menu right className="navSideBar">
                <a className="menu-item" href="/login">
                  Đăng xuất
                </a>
                <a className="menu-item" href="/register">
                  Thông tin cá nhân
                </a>
                <a id="home" className="menu-item" href="/explore">
                  Khám phá
                </a>
                <a id="about" className="menu-item" href="/discount">
                  Khuyến mãi
                </a>
                <a id="contact" className="menu-item" href="/travel-info">
                  Thông tin hành trình
                </a>
                <a id="contact" className="menu-item" href="/ticket-info">
                  Vé đã đặt 
                </a>


                {/* <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */}
              </Menu>
            </>
          ) : (
            <>
              <Link to="/login" className="header-signIn">
                Đăng nhập
              </Link>
              <a id="header-separation"> | </a>
              <Link to="/register" className="header-register">
                Đăng ký
              </Link>

              <Menu right className="navSideBar">
                <a className="menu-item" href="/login">
                  Đăng nhập
                </a>
                <a className="menu-item" href="/register">
                  Đăng Kí
                </a>
                <a id="home" className="menu-item" href="/explore">
                  Khám phá
                </a>
                <a id="about" className="menu-item" href="/discount">
                  Khuyến mãi
                </a>
                <a id="contact" className="menu-item" href="/travel-info">
                  Thông tin hành trình
                </a>
                <a id="contact" className="menu-item" href="/ticket-infoinfo">
                  Vé đã đặt 
                </a>
                {/* <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */}
              </Menu>
            </>
          )}
        </div>
      </nav>

      {/* sidebar
      menu-item
        title 
        Sublist
          list-item */}

      <div className="header-sideBar">
        <div
          className={`menu-item ${activeMenu === 0 ? "active" : ""}`}
          onClick={() => toggleSublist(-1)} // Pass index to toggle
          id="logInLogOutMedia"
        >
          <div id="header-authLinkSideBar">
            <Link to="/Đăng nhập" className="header-signIn">
              Đăng nhập
            </Link>
            <a id="header-separation"> | </a>
            <Link to="/Đăng kí" className="header-register">
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

function DropdownItem(props) {
  return (
    <li className="dropdownItem">
      <img src={props.img}></img>
      <a> {props.text} </a>
    </li>
  );
}

export default Header;
