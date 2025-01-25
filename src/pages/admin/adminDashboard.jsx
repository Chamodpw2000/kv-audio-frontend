import React from 'react'
import { MdOutlineDashboard } from 'react-icons/md'
import { TbBrandBooking } from 'react-icons/tb'
import { CgMusicSpeaker } from 'react-icons/cg'
import { FaRegUser } from 'react-icons/fa'
import { Route, Routes ,Link } from 'react-router-dom'
const AdminDashboard = () => {
    return (
        <div>


            <div className='w-full h-screen flex'>

                <div className='w-[300px] h-full bg-green-200'>

                    <Link to="/admin" className="w-full h-[40px] text-[25px] font-bold flex items-center justify-center">
                        <MdOutlineDashboard className="w-[25px] h-[25px]" />
                        Dashboard</Link>

                    <Link to="/admin/bookings" className="w-full h-[40px] text-[25px] font-bold flex items-center justify-center">
                        <TbBrandBooking className="w-[25px] h-[25px]" />
                        Bookings</Link>


                    <Link to="/admin/items" className="w-full h-[40px] text-[25px] font-bold flex items-center justify-center">
                        <CgMusicSpeaker className="w-[25px] h-[25px]" /> Items
                    </Link>

                    <Link to="/admin/users" className="w-full h-[40px] text-[25px] font-bold flex items-center justify-center">
                        <FaRegUser className="w-[25px] h-[25px]" /> Users
                    </Link>







                </div >

                <div className="w-full bg-slate-300">





                    <Routes path="/*" >
                        <Route path="/" element={<h1> Dashboard </h1>} />

                        <Route path="/bookings" element={<h1> Bookings </h1>} />
                        <Route path="/items" element={<h1> Items </h1>} />
                        <Route path="/users" element={<h1> Users </h1>} />




                    </Routes>
                </div>









            </div>




        </div>
    )
}

export default AdminDashboard