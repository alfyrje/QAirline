import React, { useState, useRef, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "../../utils/auth";
import { register } from "../../utils/auth";
import "./register.css";


const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register() {
  const userRef = useRef();

  const [formData, setFormData] = useState({
    name_lastname: "",
    name_firstname: "",
    date_birth: "",
    gender: "",
    nationality: "",
    email: "",
    phone_number: "",
    ID_citizen: "",
    password: "",
    confirm_pwd: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  const resetForm = () => {
    setFormData({
      name_lastname: "",
      name_firstname: "",
      date_birth: "",
      gender: "",
      nationality: "",
      email: "",
      phone_number: "",
      ID_citizen: "",
      password: "",
      confirm_pwd: "",
    }); 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const error = await register(formData);
    if (error) {
      alert(JSON.stringify(error));
      resetForm();
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <section className="register-container">
        <Header />
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
              <label htmlFor="nationality">QUỐC TỊCH</label>
              <input
                type="text"
                id="nationality"
                autoComplete="off"
                onChange={handleChange}
                required
                placeholder="Quốc tịch"
              />
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
