import React from 'react';
import { IoMdClose } from "react-icons/io";
import { MdHome, MdPhotoLibrary, MdBookOnline, MdPhone, MdInfo, MdRestaurantMenu, MdEvent, MdLocalOffer, MdHeadset, MdAccountCircle } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const MobileNavPannel = (props) => {
  const navigate = useNavigate();
  const isOpen = props.isOpen;
  const setOpen = props.setOpen;

  function goto(route) {
    setOpen(false);
    navigate(route);
  }

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
              <div className="text-[20px] text-accent m-2 cursor-pointer flex items-center" onClick={() => goto('/home')}>
                <MdHome className='mr-2' /> Home
              </div>
              <div className="text-[20px] text-accent m-2 cursor-pointer flex items-center" onClick={() => goto('/home/gallery')}>
                <MdPhotoLibrary className='mr-2' /> Gallery
              </div>
              <div className="text-[20px] text-accent m-2 cursor-pointer flex items-center" onClick={() => goto('/home/booking')}>
                <MdBookOnline className='mr-2' /> Booking
              </div>
              <div className="text-[20px] text-accent m-2 cursor-pointer flex items-center" onClick={() => goto('/home/contact')}>
                <MdPhone className='mr-2' /> Contact
              </div>
              <div className="text-[20px] text-accent m-2 cursor-pointer flex items-center" onClick={() => goto('/home/about')}>
                <MdInfo className='mr-2' /> About
              </div>

              <div className="text-[20px] text-accent m-2 cursor-pointer flex items-center" onClick={() => goto('/home/login')}>
                <MdAccountCircle className='mr-2' /> Login
              </div>

              <div className="text-[20px] text-accent m-2 cursor-pointer flex items-center" onClick={() => goto('/home/items')}>
                <MdHeadset className='mr-2' /> Items
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavPannel;
