import React, { useState} from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./header.css";
import "../../index.css"
import Burger from "./Burger";

// const Header() {
//     return (
//         <>
//         <div> alo anh em</div>
//         <Nav>
//         <Burger/>
//         </Nav>
//         </>
//     );
// }

function Header() {

return (
    <>
        <nav className="navbar">
            <div className="logoContainer">
                <Link to="/">
                    <img src="/images/0.svg" alt="Logo" width={200} height={80} className="logo" />
                </Link>
            </div>
            <div className="navLink">
                <Link to="/" id='khamPha'>Khám phá</Link>
                <Link to="/bookings" id='datVe'>Đặt vé</Link>
                <Link to="/contact" id='thongTinHanhTrinh'>Thông tin hành trình</Link>
            </div>
            <div className="authLink">
                <Link to="/Đăng nhập" className="signIn">Đăng nhập</Link>
                <Link to="/Đăng kí" className="logOut">Đăng ký</Link>
            </div>
        </nav>
    </>
);
}

// nháp 



export default Header;