import React, { useState, useEffect, useRef } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useParams, Link, useNavigate } from "react-router-dom";

import apiInstance from "../../utils/axios";
import { useAuthStore } from "../../store/auth";
import { register } from "../../utils/auth";

import "./register.css";
import { addToolbarButton } from "yet-another-react-lightbox";

import { setAuthUser } from "../../utils/auth";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

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

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const {
      name_lastname,
      name_firstname,
      date_birth,
      gender,
      email,
      phone_number,
      ID_citizen,
      password,
    } = formData;

    // if (!PWD_REGEX.test(password)) {
    //   setErrMsg("Invalid Password Format");
    //   return;
    // }

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
        setAuthUser(response.data.access_token, response.data.refresh_token);
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
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <div className="register-form-container">
          <form className="register-form">
            <h1>Bạn đã sẵn sàng tham gia qAirline club? Hãy bắt đầu ngay!</h1>
            <h2>
              Vui lòng điền đầy đủ thông tin cá nhân giống trên CMND/CCCD của
              bạn.
            </h2>
            <div className="register-input-box">
              <label htmlFor="name_lastname">HỌ</label>
              <input
                type="text"
                id="name_lastname"
                autoComplete="off"
                onChange={(e) => setUser(e.target.value.toUpperCase())}
                pattern="[A-Z]*"
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
                onChange={(e) => setUser(e.target.value.toUpperCase())}
                pattern="[A-Z]*"
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
                  onChange={(e) => setUser(e.target.value)}
                  required
                  placeholder="Ngày sinh"
                />
              </div>
              <div className="register-input-box">
                <label htmlFor="gender">GIỚI TÍNH</label>
                <div className="select-box">
                  <select
                    id="gender"
                    onChange={(e) => setGender(e.target.value)}
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
              <input
                type="text"
                id="nationality"
                autoComplete="off"
                onChange={(e) => setUser(e.target.value.toUpperCase())}
                pattern="[A-Z]*"
                required
                placeholder="Quốc tịch"
              />
            </div>

            <h1>Thông tin liên hệ</h1>
            <h2>
              Bằng cách chia sẻ thông tin liên lạc của bạn, bạn có thể nhận được
              cuộc gọi hoặc tin nhắn liên quan đến chuyến bay và bất kỳ cập nhật
              về hành lý nào cho hành trình của bạn.
            </h2>

            <div className="register-input-box">
              <label htmlFor="address">ĐỊA CHỈ</label>
              <input
                type="text"
                id="address"
                autoComplete="off"
                onChange={(e) => setUser(e.target.value.toUpperCase())}
                pattern="[A-Z]*"
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
                onChange={(e) => setUser(e.target.value)}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                placeholder="Email của bạn"
              />
            </div>

            <div className="register-input-box">
              <label htmlFor="tel">SỐ ĐIỆN THOẠI</label>
              <input
                type="tel"
                id="phone_number"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                placeholder="Số điện thoại"
              />
            </div>
            <div className="register-input-box">
              <label htmlFor="id">SỐ HỘ CHIẾU/ CCCD</label>
              <input
                type="text"
                id="ID_citizen"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                placeholder="Số hộ chiếu/ CCCD"
              />
            </div>

            <div className="register-input-box">
              <label htmlFor="pwd">TẠO MẬT KHẨU</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
            </div>

            <div className="register-input-box">
              <label htmlFor="pwd">NHẬP LẠI MẬT KHẨU</label>
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
            </div>
            <button id="signup" onClick={handleSubmit}>
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
