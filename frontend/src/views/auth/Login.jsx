import React, { useState, useEffect, useRef } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useParams, Link, useNavigate } from "react-router-dom";

import apiInstance from "../../utils/axios";
import login from "../../utils/requests"

import "./login.css";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setError("");
  
    try {
      const response = await apiInstance.post("http://127.0.0.1:8000/users/login/", {
        email,
        password,
      });
  
      if (response.status === 200) {
        setAuthUser(response.data.access_token, response.data.refresh_token);
        navigate("/profile");
      }
    } catch (err) {
      setError(err.response?.data?.error_message || "Login failed. Please try again.");
    }
  };
  return (
    <>
      <section className="login-container">
        <Header />
        <div className="login-form-container">
          <form className="login-form"action="#">
            <div className="login-form-icon">
            <img src='/icons/hoa.png' width='50px' height='50px'></img>
            </div>
            <h3>Đăng nhập qAirline</h3>
            <div className="login-input_box">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="login-input_box">
              <div className="login-password_title">
                <label for="password">Mật khẩu</label>
                <a className="login-a"href="#">Quên mật khẩu?</a>
              </div>
              <input
                type="password"
                id="password"
                placeholder="Nhập mật khẩu của bạn"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="login-input_box">
              <div className="login-password_remember">
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
            <button type="submit"onClick={handleLogin}>Log In</button>
            <p>
              Don't have an account? <a className="login-a" href="#">Sign up</a>
            </p>
          </form>
        </div>
        <Footer />
      </section>
    </>
  );
}
export default LogIn;
