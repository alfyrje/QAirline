import React, { useState, useRef, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../utils/axios";
import { setAuthUser } from "../../utils/auth";
import "./register.css";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register() {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name_lastname: "",
    name_firstname: "",
    date_birth: "",
    gender: "male",
    email: "",
    phone_number: "",
    ID_citizen: "",
    password: "",
    confirm_pwd: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      name_lastname,
      name_firstname,
      date_birth,
      gender,
      email,
      phone_number,
      ID_citizen,
      password,
      confirm_pwd,
    } = formData;

    try {
      const userData = {
        email: document.getElementById("email").value,
        tel_num: document.getElementById("phone_number").value,
        personal_info: {
          first_name: document.getElementById("name_firstname").value,
          last_name: document.getElementById("name_lastname").value,
          date_of_birth: document.getElementById("date_birth").value,
          citizen_id: document.getElementById("ID_citizen").value,
          nationality: document.getElementById("nationality").value,
          email: document.getElementById("email").value,
          address: document.getElementById("address").value,
        },
        username: document.getElementById("email").value,
        password: document.getElementById("password").value,
      };
      const response = await apiInstance.post("/users/register/", userData);
      if (response.status === 201) {
        // setAuthUser(response.data.access_token, response.data.refresh_token);
        setSuccess(true);
        setFormData({
          name_lastname: "",
          name_firstname: "",
          date_birth: "",
          gender: "male",
          email: "",
          phone_number: "",
          ID_citizen: "",
          password: "",
          confirm_pwd: "",
        });
        navigate("/profile");
      }
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 409) {
        setErrMsg("User Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <section className="register-container">
        <Header />
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>
        <div className="register-form-container">
          <form className="register-form" onSubmit={handleSubmit}>
            <h1>Bạn đã sẵn sàng tham gia qAirline club? Hãy bắt đầu ngay!</h1>
            <h2>
              Vui lòng điền đầy đủ thông tin cá nhân giống trên CMND/CCCD của bạn.
            </h2>
            <div className="register-input-box">
              <label htmlFor="name_lastname">HỌ</label>
              <input
                type="text"
                id="name_lastname"
                autoComplete="off"
                onChange={handleChange}
                required
                placeholder="Họ, ví dụ: Phạm"
              />
            </div>
            <div className="register-input-box">
              <label htmlFor="name_firstname">TÊN ĐỆM & TÊN</label>
              <input
                type="text"
                id="name_firstname"
                autoComplete="off"
                onChange={handleChange}
                required
                placeholder="Tên đệm & tên"
              />
            </div>
            <div className="register-column">
              <div className="register-input-box">
                <label htmlFor="date_birth">NGÀY, THÁNG, NĂM SINH</label>
                <input
                  type="date"
                  id="date_birth"
                  autoComplete="off"
                  onChange={handleChange}
                  required
                  placeholder="Ngày sinh"
                />
              </div>
              <div className="register-input-box">
                <label htmlFor="gender">GIỚI TÍNH</label>
                <div className="select-box">
                  <select id="gender" onChange={handleChange} required placeholder="Giới tính">
                    <option value="M">Nam</option>
                    <option value="F">Nữ</option>
                    <option value="O">Không xác định</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="register-input-box">
              <label htmlFor="email">EMAIL</label>
              <input
                type="email"
                id="email"
                ref={userRef}
                autoComplete="off"
                onChange={handleChange}
                required
                placeholder="Email của bạn"
              />
            </div>
            <div className="register-input-box">
              <label htmlFor="phone_number">SỐ ĐIỆN THOẠI</label>
              <input
                type="tel"
                id="phone_number"
                autoComplete="off"
                onChange={handleChange}
                required
                placeholder="Số điện thoại"
              />
            </div>
            <div className="register-input-box">
              <label htmlFor="ID_citizen">SỐ HỘ CHIẾU/ CCCD</label>
              <input
                type="text"
                id="ID_citizen"
                autoComplete="off"
                onChange={handleChange}
                required
                placeholder="Số hộ chiếu/ CCCD"
              />
            </div>
            <div className="register-input-box">
              <label htmlFor="password">TẠO MẬT KHẨU</label>
              <input
                type="password"
                id="password"
                onChange={handleChange}
                required
                placeholder="Tạo mật khẩu"
              />
            </div>
            <div className="register-input-box">
              <label htmlFor="confirm_pwd">NHẬP LẠI MẬT KHẨU</label>
              <input
                type="password"
                id="confirm_pwd"
                onChange={handleChange}
                required
                placeholder="Nhập lại mật khẩu"
              />
            </div>
            <button id="signup" type="submit">
              Sign Up
            </button>
          </form>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Register;
