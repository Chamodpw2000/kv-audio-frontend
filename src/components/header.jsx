import React, { useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import Orders from '../pages/admin/bookings';
import { GiHamburgerMenu } from "react-icons/gi";
import MobileNavPannel from './mobileNavPannel';


const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [navPannelOpen, setNavPannelOpen] = useState(false);
  const token = localStorage.getItem('token');

  return (

    <header className='w-full h-[70px] shadow-xl flex justify-center items-center relative bg-accent text-white'>

      <img src="/logo.png" alt="logo" className="w-[70px] h-[70px] object-cover absolute left-5" />
<div className='w-[800px] flex  items-center justify-between'>


<Link to="/home" className='hidden text-[20px]   m-1 md:block'>Home</Link>
      <Link to="/home/contact" className='hidden text-[20px]  m-1  md:block' >Contact</Link>
      <Link to="/home/gallery" className='hidden text-[20px]  m-1  md:block' >Gallery</Link>
      <Link to="/home/items" className='hidden text-[20px]  m-1  md:block' >Items</Link>
      <Link to="/home/mybookings" className='hidden text-[20px]  m-1  md:block'  >My Bookings</Link>
      <GiHamburgerMenu className='absolute right-5  text-[20px] md:hidden' onClick={()=>{setNavPannelOpen(true)}}/>
      <MobileNavPannel isOpen={navPannelOpen} setOpen={setNavPannelOpen}/>



      <Link to="/home/login" className=' hidden text-[20px]  m-1 md:block' >Login</Link>
      {
        user?.role === "admin" && <Link to="/admin" className='hidden text-[20px]  m-1  md:block' >Admin Dashboard</Link>
      }


      <Link to="/home/booking" className='hidden text-[20px] font-bold m-1 absolute right-24  md:block'   ><FaShoppingCart/></Link>

{token!=null && <button className='hidden md:block absolute right-5 text-[20px]' onClick={()=>{
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.href = '/login'
  
}}>Logout</button>}
</div>
     


    </header>
  )
}

export default Header