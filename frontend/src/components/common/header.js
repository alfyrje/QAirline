import { Pacifico } from 'next/font/google';
// import "../../styles/common.css";
import Navbar from "./navbar";

const pacifico = Pacifico({ subsets: ['latin'], weight: '400' });

export default function Header() {
  return (
    <head className="head">
      {/* <div className="container"> */}
          {/* <a href="/">
            <img src="../../../public/icons/logo.png" alt="Logo" />
          </a> */}
          {/* <Navbar /> */}
          {/* <form className="search-form" role="search">
            <input type="search" placeholder="Search..." aria-label="Search" />
          </form>
          <div className="auth-buttons">
            <button type="button" className="btn login-btn">Login</button>
            <button type="button" className="btn signup-btn">Sign-up</button>
          </div> */}
      {/* </div> */}
    </head>
  );
}