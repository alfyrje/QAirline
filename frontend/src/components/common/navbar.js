// "use client";
// import { useState } from "react";
// import React from "react";
// import Link from 'next/link';
// import "../../styles/nav-bar.css";

// function Navbar() {
//     const [click, setClick] = useState(false);
//     const [dropdown, setDropdown] = useState(false);
  
//     const handleClick = () => setClick(!click);
//     const closeMobileMenu = () => setClick(false);
  
//     const onMouseEnter = () => {
//       if (window.innerWidth < 960) {
//         setDropdown(false);
//       } else {
//         setDropdown(true);
//       }
//     };
  
//     const onMouseLeave = () => {
//       if (window.innerWidth < 960) {
//         setDropdown(false);
//       } else {
//         setDropdown(false);
//       }
//     };
  
//     return (
//       <>
//         <nav className='navbar'>
//           <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
//             EPIC
//             <i class='fab fa-firstdraft' />
//           </Link>
//           <div className='menu-icon' onClick={handleClick}>
//             <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
//           </div>
//           <ul className={click ? 'nav-menu active' : 'nav-menu'}>
//             <li className='nav-item'>
//               <Link to='/' className='nav-links' onClick={closeMobileMenu}>
//                 Home
//               </Link>
//             </li>
//             <li
//               className='nav-item'
//               onMouseEnter={onMouseEnter}
//               onMouseLeave={onMouseLeave}
//             >
//               <Link
//                 to='/services'
//                 className='nav-links'
//                 onClick={closeMobileMenu}
//               >
//                 Services <i className='fas fa-caret-down' />
//               </Link>
//               {dropdown && <Dropdown />}
//             </li>
//             <li className='nav-item'>
//               <Link
//                 to='/products'
//                 className='nav-links'
//                 onClick={closeMobileMenu}
//               >
//                 Products
//               </Link>
//             </li>
//             <li className='nav-item'>
//               <Link
//                 to='/contact-us'
//                 className='nav-links'
//                 onClick={closeMobileMenu}
//               >
//                 Contact Us
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to='/sign-up'
//                 className='nav-links-mobile'
//                 onClick={closeMobileMenu}
//               >
//                 Sign Up
//               </Link>
//             </li>
//           </ul>
//           <Button />
//         </nav>
//       </>
//     );
//   }
//     function Button() {
//     return (
//       <Link to='dang-ky'>
//         <button className='btn'>Đăng ký</button>
//       </Link>
//     );
// }

// const MenuItems = [
//     {
//       title: 'Thông tin chuyến bay',
//       path: '/thong-tin-chuyen-bay',
//       cName: 'dropdown-link'
//     },
//     {
//       title: 'Bản tin',
//       path: '/ban-tin',
//       cName: 'dropdown-link'
//     },
//     {
//         title: 'Đăng ký',
//         path: '/dang-ky',
//         cName: 'dropdown-link'
//     },
//     {
//         title: 'Đăng nhập',
//         path: '/dang-nhap',
//         cName: 'dropdown-link'
//     },
// ];

// function Dropdown() {
//     const [click, setClick] = useState(false);
//     const handleClick = () => setClick(!click);
//     return (
//       <>
//         <ul
//           onClick={handleClick}
//           className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
//         >
//           {MenuItems.map((item, index) => {
//             return (
//               <li key={index}>
//                 <Link
//                   className={item.cName}
//                   to={item.path}
//                   onClick={() => setClick(false)}
//                 >
//                   {item.title}
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </>
//     );
// }
  
// export default Navbar;

import Link from 'next/link';
import "../../styles/nav-bar.css";

function Navbar() {
    return (
        <nav className='navbar'>
            <Link href='/' className='navbar-logo'>
                EPIC
                <i className='fab fa-firstdraft' />
            </Link>
            <ul className='nav-menu'>
                <li className='nav-item'>
                    <Link href='/' className='nav-links'>
                        Home
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link href='/services' className='nav-links'>
                        Services
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link href='/products' className='nav-links'>
                        Products
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link href='/contact-us' className='nav-links'>
                        Contact Us
                    </Link>
                </li>
                <li>
                    <Link href='/sign-up' className='nav-links-mobile'>
                        Sign Up
                    </Link>
                </li>
            </ul>
            <Button />
        </nav>
    );
}

function Button() {
    return (
        <Link href='/dang-ky'>
            <button className='btn'>Đăng ký</button>
        </Link>
    );
}

const MenuItems = [
    {
        title: 'Thông tin chuyến bay',
        path: '/thong-tin-chuyen-bay',
        cName: 'dropdown-link'
    },
    {
        title: 'Bản tin',
        path: '/ban-tin',
        cName: 'dropdown-link'
    },
    {
        title: 'Đăng ký',
        path: '/dang-ky',
        cName: 'dropdown-link'
    },
    {
        title: 'Đăng nhập',
        path: '/dang-nhap',
        cName: 'dropdown-link'
    },
];

function Dropdown() {
    return (
        <ul className='dropdown-menu'>
            {MenuItems.map((item, index) => (
                <li key={index}>
                    <Link href={item.path} className={item.cName}>
                        {item.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default Navbar;