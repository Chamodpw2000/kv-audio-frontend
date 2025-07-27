import React, { useState } from 'react';
import './register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';



const RegisterPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        
       

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, 
            {
                firstName,
                lastName,
                email,
                password,
                address,
                phone
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then((res)=>{
          
            toast.success("Registered Successfully");
            navigate('/login');
        }).catch((err)=>{
          
            toast.error(err?.response?.data?.error||"An error occured");
        })
    };

    return (
        <div className='w-full min-h-screen flex justify-center items-center bg-picture mt-5 py-5'>
            <div className='w-[400px] h-auto backdrop-blur-xl rounded-2xl flex justify-center items-center flex-col p-2 mt-5'>

                <img src="/logo.png" className='w-[100px] h-[100px] object-cover mb-4' />

                <input
                    placeholder='First Name'
                    className='w-[300px] h-[50px] bg-transparent border-b-2 border-white text-white text-2xl outline-none mb-2'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                
                <input
                    placeholder='Last Name'
                    className='w-[300px] h-[50px] bg-transparent border-b-2 border-white text-white text-2xl outline-none mb-2'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                
                <input
                    placeholder='Email'
                    className='w-[300px] h-[50px] bg-transparent border-b-2 border-white text-white text-2xl outline-none mb-2'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                
                <input
                    type="password"
                    placeholder='Password'
                    className='w-[300px] h-[50px] bg-transparent border-b-2 border-white text-white text-2xl outline-none mb-2'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    placeholder='Address'
                    className='w-[300px] h-[50px] bg-transparent border-b-2 border-white text-white text-2xl outline-none mb-2'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <input
                    placeholder='Phone'
                    className='w-[300px] h-[50px] bg-transparent border-b-2 border-white text-white text-2xl outline-none mb-2'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <button
                    className='w-[300px] h-[50px] bg-[#f0ad38] text-white text-xl my-5 rounded-lg hover:bg-[#ffb12bee]'
                    onClick={handleRegister}
                >
                    Register
                </button>
<div className='flex flex-col items-center justify-center'>

<p className='text-white'> 
    Already have an account?
 </p>

<Link to="/login" className='hover:text-accent font-bold text-white'>
Login here !</Link>
    
</div>


            </div>
        </div>
    );
};

export default RegisterPage;







