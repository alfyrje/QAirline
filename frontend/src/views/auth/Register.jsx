import React, { useState, useEffect, useRef } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useParams, Link, useNavigate } from "react-router-dom";

import apiInstance from "../../utils/axios";
import { useAuthStore } from "../../store/auth";
import { register } from "../../utils/auth";

import "./register.css";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
        <section class="register-container">
        <Header />
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div class="register-form-container">
            <form class="register-form">
              <h1>
                  Bạn đã sẵn sàng tham gia qAirline club? Hãy bắt đầu ngay!
              </h1>
              <h2>
                Vui lòng điền đầy đủ thông tin cá nhân giống trên CMND/CCCD của
                bạn.
              </h2>
              <div class="register-input-box">
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
              <div class="register-input-box">
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
              <div class="register-column">
                <div class="register-input-box">
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
                <div class="register-input-box">
                  <label htmlFor="gender">GIỚI TÍNH</label>
                  <div class="select-box">
                    <select
                      id="gender"
                      onChange={(e) => setGender(e.target.value)}
                      required
                      placeholder="Giới tính"
                    >
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                      <option value="other">Không xác định</option>
                    </select>
                  </div>
                </div>
              </div>

              <h1>
                Thông tin liên hệ
              </h1>
              <h2>
                Bằng cách chia sẻ thông tin liên lạc của bạn, bạn có thể nhận
                được cuộc gọi hoặc tin nhắn liên quan đến chuyến bay và bất kỳ
                cập nhật về hành lý nào cho hành trình của bạn.
              </h2>
              <div class="register-input-box">
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

              <div class="register-input-box">
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

              <div class="register-input-box">
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

              <div class="register-input-box">
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

              <div class="register-input-box">
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
              <button id="signup">Sign Up</button>
            </form>
          </div>
          <Footer />

        </section>
    </>
  );
}
export default Register;
