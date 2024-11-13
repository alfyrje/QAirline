import React, { useState, useEffect, useRef } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useParams, Link, useNavigate } from "react-router-dom";

import apiInstance from "../../utils/axios";
import { useAuthStore } from "../../store/auth";
import { register } from "../../utils/auth";

import "./register.css";
const USER_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register() {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        console.log(match);
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    return (
        <>
            <Header />
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <form>
                    <h1><bold>Bạn đã sẵn sàng tham gia qAirline club? Hãy bắt đầu ngay!</bold></h1>
                    <h2>Vui lòng điền đầy đủ thông tin cá nhân giống trên CMND/CCCD của bạn.</h2>
                    <label htmlFor="name_lastname">
                        HỌ               
                    </label>
                    <input
                        type="text"
                        id="name_lastname"
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value.toUpperCase())}
                        pattern="[A-Z]*"
                        required
                        placeholder="Họ, ví dụ: Phạm"
                    />

                    <label htmlFor="name_firstname">
                        TÊN ĐỆM & TÊN               
                    </label>
                    <input
                        type="text"
                        id="name_firstname"
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value.toUpperCase())}
                        pattern="[A-Z]*"
                        required
                        placeholder="Tên đệm & tên"
                    />

                    <label htmlFor="datebirth">
                        NGÀY, THÁNG, NĂM SINH  
                    </label>    
                    <input
                        type="date"
                        id="date_birth"
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        required
                        placeholder="Ngày sinh"
                    />

                    <label htmlFor="gender">
                        GIỚI TÍNH
                    </label>
                    <select id="gender" onChange={(e) => setGender(e.target.value)} required placeholder="Giới tính">
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Không xác định</option>
                    </select>

                    <h1><bold>Thông tin liên hệ</bold></h1>
                    <h2>
                        Bằng cách chia sẻ thông tin liên lạc của bạn, bạn có thể nhận được 
                        cuộc gọi hoặc tin nhắn liên quan đến chuyến bay và bất kỳ cập nhật về hành lý nào cho hành trình của bạn.
                    </h2>

                    <label htmlFor="email">
                        EMAIL
                    </label>
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

                    <label htmlFor="email">
                        SỐ ĐIỆN THOẠI
                    </label>
                    <input
                        type="tel"
                        id="tel"
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

                    <label htmlFor="email">
                        SỐ HỘ CHIẾU/ CCCD
                    </label>
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
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        8 to 24 characters.<br />   
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                    </p>

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
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        Must match the first password input field.
                    </p>
                </form>
                <button id="signup">Sign Up</button>
            </section>
            <Footer />
        </>
    )
}
export default Register;