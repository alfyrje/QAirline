import React, { useState, useEffect, useRef } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useParams, Link, useNavigate } from "react-router-dom";

import apiInstance from "../../utils/axios";
import { useAuthStore } from "../../store/auth";
import { register } from "../../utils/auth";

import "./login.css";

function LogIn() {
  return (
    <>
      <section class="login-container">
        <Header />
        <div class="login-form-container">
          <form class="login-form"action="#">
            <div class="login-form-icon">
            <img src='/icons/hoa.png' width='50px' height='50px'></img>
            </div>
            <h3>Đăng nhập qAirline</h3>
            <div class="login-input_box">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email của bạn"
                required
              />
            </div>
            <div class="login-input_box">
              <div class="login-password_title">
                <label for="password">Mật khẩu</label>
                <a class="login-a"href="#">Quên mật khẩu?</a>
              </div>
              <input
                type="password"
                id="password"
                placeholder="Nhập mật khẩu của bạn"
                required
              />
            </div>
            <div class="login-input_box">
              <div class="login-password_remember">
                <label for="password">Ghi nhớ lần đăng nhập sau</label>
                <div class="login-checkbox-container">
                <input
                type="checkbox"
                id="password_remember"
                required
              />
                </div>
              </div>
            </div>
            <button type="submit">Log In</button>
            <p>
              Don't have an account? <a class="login-a" href="#">Sign up</a>
            </p>
          </form>
        </div>
        <Footer />
      </section>
    </>
  );
}
export default LogIn;
