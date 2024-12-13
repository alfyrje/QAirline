import React, { useState, useEffect, useRef } from "react"; 
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useParams, Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/auth";
import {login} from "../../utils/auth";

import "./login.css";

function LogIn() {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",   
  });
  const[isLoading, setIsLoading] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    if (e.target.id === "email") setEmailError("");
    if (e.target.id === "password") setPasswordError("");
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
    });
  }

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsLoading(true);
    const response = await login(formData.email, formData.password);
    if (response.status===200) {
      navigate("/profile");
    } else if (response.status===404) {
      setEmailError(response.detail || "Người dùng không tồn tại.");
    } else if (response.status===401) {
      setPasswordError(response.detail || "Mật khẩu không đúng.");
    } else {
      alert("An unexpected error occurred.");
    }
    setIsLoading(false);
  };
  return (
    <>
      <section className="login-container">
        <Header />
        <div className="login-form-container">
          <form className="login-form"action="#"onSubmit={handleLogin}>
            <div className="login-form-icon">
            <img src='/icons/hoa.png' width='50px' height='50px'></img>
            </div>
            <h3>Đăng nhập qAirline</h3>
            <div className="login-input_box">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email của bạn"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {emailError && <span className="error-message">{emailError}</span>}
            </div>
            <div className="login-input_box">
              <div className="login-password_title">
                <label htmlFor="password">Mật khẩu</label>
              </div>
              <input
                type="password"
                id="password"
                placeholder="Nhập mật khẩu của bạn"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {passwordError && <span className="error-message">{passwordError}</span>}
            </div>
            <a className="login-a"href="#">Quên mật khẩu?</a>
            <button type="submit">Log In</button>
            <p>
              Don't have an account?              
              <Link className="login-a" to="/register">
                Sign up
              </Link>
            </p>
          </form>
        </div>
        <Footer />
      </section>
    </>
  );
}
export default LogIn;