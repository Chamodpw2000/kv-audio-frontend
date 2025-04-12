import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import MobileNavPannel from './mobileNavPannel';

const Header = ({auth}) => {

  const props = useParams(auth)

 

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  useEffect(() => {

    setUser(JSON.parse(localStorage.getItem('user')));
  }, [auth]);
  const [navPannelOpen, setNavPannelOpen] = useState(false);
  const token = localStorage.getItem('token');

  return (
    <header className='w-full h-[70px]  flex justify-center items-center bg-accent text-white fixed
     top-0 left-0 z-50'>
      <img src="/logo.png" alt="logo" className="w-[70px] h-[70px] object-cover absolute left-5" />
      <div className='w-[800px] flex items-center justify-between'>
        <Link to="/" className='hidden text-[20px] m-1 md:block'>Home</Link>
        <Link to="/home/gallery" className='hidden text-[20px] m-1 md:block'>Gallery</Link>
        <Link to="/home/items" className='hidden text-[20px] m-1 md:block'>Items</Link>
        {user?.role=="customer"&&<Link to="/home/mybookings" className='hidden text-[20px] m-1 md:block'>My Bookings</Link>}
        <GiHamburgerMenu className='absolute right-5 text-[20px] md:hidden' onClick={() => { setNavPannelOpen(true) }} />
        <MobileNavPannel isOpen={navPannelOpen} setOpen={setNavPannelOpen} />

       {user==null && <Link to="/home/login" className='hidden text-[20px] m-1 md:block'>Login</Link>}
       {user==null && <Link to="/home/register" className='hidden text-[20px] m-1 md:block'>Register</Link>}

        {user?.role === "admin" && <Link to="/admin" className='hidden text-[20px] m-1 md:block'>Admin Dashboard</Link>}
        {user?.role=="customer"&&<Link to="/home/myprofile" className='hidden text-[20px] m-1 md:block'>My Profile</Link>}

        {user?.role==="customer" &&<Link to="/home/booking" className='hidden text-[20px] font-bold m-1 absolute right-24 md:block'>
          <FaShoppingCart />
        </Link>}
        {token != null && <button className='hidden md:block absolute right-5 text-[20px]' onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/';
        }}>Logout</button>}
      </div>
    </header>
  );
}

export default Header;
