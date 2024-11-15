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
          <form className="form"action="#">
            <div className="img-login">
            <img src='/icons/hoa.png' width='50px' height='50px'></img>
            </div>
            <h3>Đăng nhập qAirline</h3>
            <div className="input_box">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email của bạn"
                required
              />
            </div>
            <div className="input_box">
              <div className="password_title">
                <label for="password">Mật khẩu</label>
                <a href="#">Quên mật khẩu?</a>
              </div>
              <input
                type="password"
                id="password"
                placeholder="Nhập mật khẩu của bạn"
                required
              />
            </div>
            <div className="input_box">
              <div className="password_remember">
                <label for="password">Ghi nhớ lần đăng nhập sau</label>
                <div className="login-checkbox-container">
                <input
                type="checkbox"
                id="password_remember"
                required
              />
                </div>
              </div>
            </div>
            <button type="submit">Log In</button>
            <p className="sign_up">
              Don't have an account? <a href="#">Sign up</a>
            </p>
          </form>
    </>
  );
}
export default ProfileInfo;