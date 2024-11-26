import React, { useState, useEffect, useRef } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useParams, Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/auth";
import {login} from "../../utils/auth";

import "./login.css";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


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
    if (response) {
      navigate("/profile");
    } else {
      alert(JSON.stringify(response.error));
    }
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
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-input_box">
              <div className="login-password_title">
                <label htmlFor="password">Mật khẩu</label>
                <a className="login-a"href="#">Quên mật khẩu?</a>
              </div>
              <input
                type="password"
                id="password"
                placeholder="Nhập mật khẩu của bạn"
                onChange={handleChange}
                required
              />
            </div>
            {/* <div className="login-input_box">
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
            </div> */}
            <button type="submit">Log In</button>
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
