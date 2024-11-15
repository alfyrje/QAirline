import React from "react";
import { Link } from "react-router-dom";
import "./header.css";


function Header() {
    return (
        <header>
            <nav className='navbar'>
                <Link href='/' className='navbar-logo'>
                    <img src='/icons/hoa.png' alt='Logo' width='50px' height='50px' />
                </Link>

                <div className='nav-menu'>
                    <div className='nav-item'>
                        <Link href='/news' className='nav-links'>
                            Khám phá dịch vụ
                        </Link>
                    </div>

                    <div className='nav-item'>
                        <Link href='/booking' className='nav-links'>
                            Đặt vé
                        </Link>
                    </div>

                    <div className='nav-item'>
                        <Link href='/flights-info' className='nav-links'>
                            Thông tin chuyến bay
                        </Link>
                    </div>
                    <div className='nav-item'>
                        <Link href='/log-in' className='nav-links'>
                            Đăng nhập
                        </Link>
                    </div>
                    <div className='nav-item'>
                        <Link href='/register' className='nav-links'>
                            Đăng ký
                        </Link>
                    </div>
                    <div className='nav-item'>
                        <Link href='/assist' className='nav-links'>
                            Trợ giúp
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;