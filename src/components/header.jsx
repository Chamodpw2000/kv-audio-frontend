import React, { useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import Orders from '../pages/admin/bookings';
import { GiHamburgerMenu } from "react-icons/gi";
import MobileNavPannel from './mobileNavPannel';


const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [navPannelOpen, setNavPannelOpen] = useState(false);

  return (

    <header className='w-full h-[70px] shadow-xl flex justify-center items-center relative bg-accent text-white'>

      <img src="/logo.png" alt="logo" className="w-[70px] h-[70px] object-cover absolute left-5" />

      <Link to="/home" className='hidden text-[25px] font-bold  m-1'>Home</Link>
      <Link to="/home/contact" className='hidden text-[25px] font-bold m-1' >Contact</Link>
      <Link to="/home/gallery" className='hidden text-[25px] font-bold m-1' >Gallery</Link>
      <Link to="/home/items" className='hidden text-[25px] font-bold m-1' >Items</Link>
      <Link to="/home/mybookings" className='hidden text-[25px] font-bold m-1'  >My Bookings</Link>
      <GiHamburgerMenu className='absolute right-5  text-[24px]' onClick={()=>{setNavPannelOpen(true)}}/>
      <MobileNavPannel isOpen={navPannelOpen} setOpen={setNavPannelOpen}/>



      <Link to="/home/login" className=' hidden text-[25px] font-bold m-1' >Login</Link>
      {
        user?.role === "admin" && <Link to="/admin" className='hidden text-[25px] font-bold m-1' >Admin Dashboard</Link>
      }


      <Link to="/home/booking" className='hidden text-[25px] font-bold m-1 absolute right-5'  ><FaShoppingCart/></Link>



    </header>
  )
}

export default Header