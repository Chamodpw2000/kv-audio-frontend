import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaShoppingCart } from 'react-icons/fa';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import MobileNavPannel from './mobileNavPannel';

const Header = ({auth, setAuth}) => {

  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  useEffect(() => {

    

    setUser(JSON.parse(localStorage.getItem('user')));
  }, [auth]);
  const [navPannelOpen, setNavPannelOpen] = useState(false);
  const token = localStorage.getItem('token');

  return (
    <header className='w-full h-[70px]  flex justify-center items-center bg-accent text-white fixed
     top-0 left-0 z-50'>
      <img src="/logo.png" alt="logo" className="w-[70px] h-[70px] object-cover absolute left-5 cursor-pointer" onClick={() => navigate('/')} />
      <div className='w-[900px] flex items-center justify-center gap-x-[4%] lg:gap-x-[8%] xl:gap-x-[12%]  2xl:gap-x-[18%] '>
        <Link to="/home/gallery" className='hidden text-[20px] m-1 md:block'>Gallery</Link>
        <Link to="/home/items" className='hidden text-[20px] m-1 md:block'>Items</Link>
        {user?.role=="customer"&&<Link to="/home/mybookings" className='hidden text-[20px] m-1 md:block'>My Bookings</Link>}
        <GiHamburgerMenu className='absolute right-5 text-[20px] md:hidden' onClick={() => { setNavPannelOpen(true) }} />
        <MobileNavPannel isOpen={navPannelOpen} setOpen={setNavPannelOpen} auth={auth} setAuth={setAuth} />

       {user==null && <Link to="/login" className='hidden text-[20px] m-1 md:block'>Login</Link>}
       {user==null && <Link to="/register" className='hidden text-[20px] m-1 md:block'>Register</Link>}

        {user?.role === "admin" && <Link to="/admin" className='hidden text-[20px] m-1 md:block'>Admin Dashboard</Link>}
        {user?.role=="customer"&&<Link to="/home/myprofile" className='hidden text-[20px] m-1 md:block'>My Profile</Link>}

        {user?.role==="customer" &&<Link to="/home/booking" className='hidden text-[20px] font-bold m-1 absolute right-24 md:block'>
          <FaShoppingCart />
        </Link>}
        {token != null && <button className='hidden md:block absolute right-5 text-[20px]' onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setAuth(!auth);
          toast.success("Logged out successfully");
          navigate('/')
        }}>Logout</button>}
      </div>
    </header>
  );
}

export default Header;
