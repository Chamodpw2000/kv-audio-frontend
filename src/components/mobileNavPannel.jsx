import React from 'react';
import toast from 'react-hot-toast';
import { IoMdClose } from "react-icons/io";
import { MdHome, MdPhotoLibrary, MdBookOnline, MdPhone, MdInfo, MdRestaurantMenu, MdEvent, MdLocalOffer, MdHeadset, MdAccountCircle } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { IoIosLogIn } from "react-icons/io";
import { BiLogIn } from "react-icons/bi";
import { TbLogout2 } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { FaRegUser, FaShoppingCart } from 'react-icons/fa';
import { RiAccountPinBoxLine } from "react-icons/ri";
import { VscFeedback } from 'react-icons/vsc';
import { CgMusicSpeaker } from 'react-icons/cg';



const MobileNavPannel = (props) => {
  const navigate = useNavigate();
  const isOpen = props.isOpen;
  const setOpen = props.setOpen;
  const auth = props.auth;
  const setAuth = props.setAuth;

  function goto(route) {
    setOpen(false);
    navigate(route);
  }
const user = JSON.parse(localStorage.getItem('user'));
  return (
    
    <>
      {isOpen && (
        <div className='w-full h-screen bg-[#00000070] fixed top-0 left-0 z-50'>
          <div className='h-full bg-white w-[calc(100vw-70px)]'>
            <div className='w-full h-[70px] flex items-center bg-accent relative'>
              <img src="/logo.png" alt="logo" className="w-[70px] h-[70px] object-cover" />
              <IoMdClose className='absolute right-5 text-[24px] cursor-pointer' onClick={() => setOpen(false)} />
            </div>

            <div className='p-4'>
              <div className="text-[20px] text-accent m-2 cursor-pointer flex items-center" onClick={() => goto('/')}>
                <MdHome className='mr-2' /> Home
              </div>
              <div className="text-[20px] text-accent m-2 cursor-pointer flex items-center" onClick={() => goto('/home/gallery')}>
                <MdPhotoLibrary className='mr-2' /> Gallery
              </div>
              <div className="text-[20px] text-accent m-2 cursor-pointer flex items-center" onClick={() => goto('/home/mybookings')}>
                <MdBookOnline className='mr-2' /> Booking
              </div>
         

             {!user && <div className="text-[20px] text-accent m-2 cursor-pointer flex items-center" onClick={() => goto('/login')}>
                <BiLogIn className='mr-2' /> Login
              </div>}
              
             {!user && <div className="text-[20px] text-accent m-2 cursor-pointer flex items-center" onClick={() => goto('/login')}>
                <RiAccountPinBoxLine className='mr-2' /> Register
              </div>}



                {user && <div className="text-[20px] text-accent m-2 cursor-pointer flex items-center"  onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setAuth(!auth);
          toast.success("Logged out successfully");
          navigate('/')
          setOpen(false);
        }}>
                <TbLogout2 className='mr-2' /> Logout
              </div>}

              <div className="text-[20px] text-accent m-2 cursor-pointer flex items-center" onClick={() => goto('/home/items')}>
                <MdHeadset className='mr-2' /> Items
              </div>

                  {user && user.role=="customer" && <div className="text-[20px] text-accent m-2 cursor-pointer flex items-center" onClick={() => goto('/home/myprofile')}>
                <MdAccountCircle className='mr-2' /> Profile
              </div>}
                           {user && user.role=="customer" && <div className="text-[20px] text-accent m-2 cursor-pointer flex items-center" onClick={() => goto('/home/booking')}>
                <FaShoppingCart className='mr-2' /> Cart
              </div>}


              {user && user.role=="admin" && <div className="text-[20px] text-accent m-2 cursor-pointer flex items-center" onClick={() => goto('/admin/feedback')}>
                <VscFeedback className='mr-2' /> Feedbacks
              </div>}

                  {user && user.role=="admin" && <div className="text-[20px] text-accent m-2 cursor-pointer flex items-center" onClick={() => goto('/admin/users')}>
                <FaRegUser className='mr-2' /> Users
              </div>}

                      {user && user.role=="admin" && <div className="text-[20px] text-accent m-2 cursor-pointer flex items-center" onClick={() => goto('/admin/items')}>
                <CgMusicSpeaker className='mr-2' /> Items (Admin) 
              </div>}
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavPannel;
