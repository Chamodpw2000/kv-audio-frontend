import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";



import React from 'react'
import toast from "react-hot-toast";

const VerifyEmail = () => {

    const navigate = useNavigate();




    const [otp, setOtp] = useState('')


    const handleVerifyEmail = () => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/verifyEmail`, {
            otp: parseInt(otp)
        },{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res);
            toast.success("Email Verified")
            navigate('/home')
            
        }).catch((e) => {
            console.log(e);
            toast.error("Failed to verify email")
             
        })
        
    }


    const token = localStorage.getItem("token")

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/sendOTP`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res);
            localStorage.setItem("user", JSON.stringify(res.data))
        }).catch((e) => {
            console.log(e);
        })
    })
    return (
        <div>



            <div className='w-full min-h-screen flex justify-center items-center'>
                <div className='w-[400px] h-[400px] bg-white shadow-lg rounded-lg flex flex-col items-center justify-center'>
                    <h1 className='text-3xl font-bold'>Verify Email</h1>
                    <p className='text-lg'>A verification code has been sent to your email address</p>
                    <input type="number" value={otp} onChange={
                        (e) => {
                            setOtp(e.target.value)
                        }
                    } onClick={handleVerifyEmail} className='w-[300px] h-[40px] border border-gray-300 rounded-lg mt-5' placeholder='Enter OTP' />
                    <button className='w-[300px] h-[40px] bg-accent text-white mt-5 rounded-lg'>Verify</button>
                </div>

            </div>
        </div>
    )
}

export default VerifyEmail