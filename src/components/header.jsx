import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
   
    <header className='w-full h-[100px] shadow-xl flex justify-center items-center relative'>

        <img src="/logo.png" alt="logo" className="w-[100px] h-[100px] object-cover absolute left-5" />

        <Link to="/home" className='text-[25px] font-bold  m-1'>Home</Link>
        <Link to="/home/contact" className='text-[25px] font-bold m-1' >Contact</Link>
        <Link to="/home/gallery" className='text-[25px] font-bold m-1' >Gallery</Link>
        <Link to="/home/items" className='text-[25px] font-bold m-1' >Items</Link>

    </header>
  )
}

export default Header