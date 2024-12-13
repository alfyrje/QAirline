import React, { useState, useRef, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "../../utils/auth";
import { register } from "../../utils/auth";
import "./register.css";
import nationalities from "./nationalities.json";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register() {
  const userRef = useRef();

  const [formData, setFormData] = useState({
    name_lastname: "",
    name_firstname: "",
    date_birth: "",
    gender: "M",
    nationality: "",
    email: "",
    phone_number: "",
    ID_citizen: "",
    password: "",
    confirm_pwd: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: id.includes("name") ? value.toUpperCase() : value, // Capitalize names
    }));

    // Clear the error message when the user starts typing
    setErrors({
      ...errors,
      [e.target.id]: "",
    });
  };
  const handleBlur = (e) => {
    const { id, value } = e.target;
    const newErrors = { ...errors };

    // Validate fields on blur
    if (id === "name_lastname" || id === "name_firstname") {
      const nameRegex = /^[a-zA-ZÀ-ỹà-ỹ\s'-]+$/;
      if (!nameRegex.test(value)) {
        newErrors[id] =
          "Tên chỉ có thể chứa chữ cái, khoảng trắng, dấu gạch nối và dấu nháy đơn.";
      }
    } else if (id === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors.email = "Định dạng email không hợp lệ.";
      }
    } else if (id === "phone_number") {
      if (!/^0\d{9}$/.test(value)) {
        newErrors.phone_number =
          "Số điện thoại phải bắt đầu bằng số 0 và có 10 chữ số.";
      }
    } else if (id === "ID_citizen") {
      if (!/^0\d{11}$/.test(value)) {
        newErrors.ID_citizen =
          "Số hộ chiếu/CCCD phải bắt đầu bằng số 0 và có 12 chữ số.";
      }
    } else if (id === "confirm_pwd") {
      if (value !== formData.password) {
        newErrors.confirm_pwd = "Mật khẩu không khớp.";
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = {};
  
    // Gọi lại handleBlur cho mỗi trường để kiểm tra lỗi
    Object.keys(formData).forEach((id) => {
      const value = formData[id];
      const fakeEvent = { target: { id, value } };
      handleBlur(fakeEvent);
  
      if (errors[id]) {
        newErrors[id] = errors[id];
      }
    });
  
    // Nếu có lỗi, ngăn không cho gửi form
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    // Không có lỗi, gửi dữ liệu
    setIsLoading(true);
    try {
      const response = await register(formData);
      console.log(response); 
      const test = JSON.stringify(response);
      console.log(test);     
      if (response['message'] === 'Đăng ký tài khoản thành công.') { // Kiểm tra status từ response.data
        alert(response['message']);
        navigate("/login");
      } else { // Truy cập status từ response.data
        alert(response['message']); // Hiển thị error_message
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
      alert("Đã xảy ra lỗi không mong muốn.");
    } finally {
      setIsLoading(false);
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
              Vui lòng điền đầy đủ thông tin cá nhân giống trên CMND/CCCD của
              bạn.
            </h2>
            {[
              {
                id: "name_lastname",
                label: "HỌ",
                placeholder: "Họ, ví dụ: Phạm",
              },
              {
                id: "name_firstname",
                label: "TÊN ĐỆM & TÊN",
                placeholder: "Tên đệm & tên",
              },
            ].map(({ id, label, placeholder, type = "text" }) => (
              <div className="register-input-box" key={id}>
                <label htmlFor={id}>{label}</label>
                <input
                  type={type}
                  id={id}
                  placeholder={placeholder}
                  value={formData[id]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors[id] && (
                  <span className="error-message">{errors[id]}</span>
                )}
              </div>
            ))}
            <div className="register-column">
              <div className="register-input-box">
                <label htmlFor="date_birth">NGÀY, THÁNG, NĂM SINH</label>
                <input
                  type="date"
                  id="date_birth"
                  autoComplete="off"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  placeholder="Ngày sinh"
                />
              </div>
              <div className="register-input-box">
                <label htmlFor="gender">GIỚI TÍNH</label>
                <div className="select-box">
                  <select
                    id="gender"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    placeholder="Giới tính"
                  >
                    <option value="M">Nam</option>
                    <option value="F">Nữ</option>
                    <option value="O">Không xác định</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="register-input-box">
              <label htmlFor="nationality">QUỐC TỊCH</label>
              <div className="select-box">
                <select
                  id="nationality"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  placeholder="Quốc tịch"
                >
                  <option value="">Chọn quốc tịch</option>
                  {nationalities.map((nationality, index) => (
                    <option key={index} value={nationality}>
                      {nationality}
                    </option>
                  ))}
                </select>
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
                onBlur={handleBlur}
                required
                placeholder="Email của bạn"
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>
            <div className="register-input-box">
              <label htmlFor="phone_number">SỐ ĐIỆN THOẠI</label>
              <input
                type="tel"
                id="phone_number"
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
                required
                placeholder="Số điện thoại"
              />
              {errors.phone_number && (
                <span className="error-message">{errors.phone_number}</span>
              )}
            </div>
            <div className="register-input-box">
              <label htmlFor="ID_citizen">SỐ HỘ CHIẾU/ CCCD</label>
              <input
                type="text"
                id="ID_citizen"
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
                required
                placeholder="Số hộ chiếu/ CCCD"
              />
              {errors.ID_citizen && (
                <span className="error-message">{errors.ID_citizen}</span>
              )}
            </div>
            <div className="register-input-box">
              <label htmlFor="password">TẠO MẬT KHẨU</label>
              <input
                type="password"
                id="password"
                onChange={handleChange}
                onBlur={handleBlur}
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
                onBlur={handleBlur}
                required
                placeholder="Nhập lại mật khẩu"
              />
              {errors.confirm_pwd && (
                <span className="error-message">{errors.confirm_pwd}</span>
              )}
            </div>
            <button id="signup" type="submit" onClick={handleSubmit}>
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
