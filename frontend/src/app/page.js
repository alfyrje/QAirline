import Image from "next/image";
// import styles from "./page.module.css";
import Navbar from "../components/common/navbar";

export default function Home() {
  return (
  <body>
    <header>
     <Navbar />
    </header>
    <h1>ĐĂNG KÝ TÀI KHOẢN SKYJOY</h1>
    <form>
        {/* Họ */}
        <label htmlFor="lastName">Họ *</label>
        <input type="text" id="lastName" name="lastName" required />
        <br /><br />

        {/* Tên đệm và Tên */}
        <label htmlFor="firstName">Tên đệm và Tên *</label>
        <input type="text" id="firstName" name="firstName" required />
        <br /><br />
        
        <p>Vui lòng nhập họ, tên đệm và tên khớp với giấy tờ tùy thân của bạn. Ví dụ: với tên Nguyễn Văn A, bạn cần nhập NGUYỄN vào ô "Họ" và VĂN A vào ô "Tên đệm và Tên".</p>
        <br />

        {/* Số điện thoại */}
        <label htmlFor="phone">Số điện thoại *</label>
        <select id="countryCode">
            <option value="+84">+84</option>
            {/* Add other country codes as needed */}
        </select>
        <input type="tel" id="phone" name="phone" required />
        <br /><br />

        {/* Ngày sinh */}
        <label htmlFor="dob">Ngày sinh *</label>
        <input type="date" id="dob" name="dob" required />
        <br /><br />

        {/* Email */}
        <label htmlFor="email">Email *</label>
        <input type="email" id="email" name="email" required />
        <p>Nhập email để xác minh và khôi phục tài khoản khi cần thiết</p>
        <br />

        {/* Mã giới thiệu */}
        <label htmlFor="referralCode">Mã giới thiệu</label>
        <input type="text" id="referralCode" name="referralCode" />
        <br /><br />

        <button type="submit">Đăng Ký</button>
        <p>Bằng việc xác nhận, tôi đồng ý chia sẻ thông tin cá nhân với SkyJoy và tất cả các <a href="#">điều khoản của chương trình</a>.</p>
    </form>
</body>
  );
}
