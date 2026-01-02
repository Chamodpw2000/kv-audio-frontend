import React, { useState } from 'react'
import './login.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import { Link } from 'react-router-dom'


const LoginPage = ({ auth, setAuth }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const googleLogin = useGoogleLogin(

        {
            onSuccess: (response) => {

                axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/googlelogin`, {
                    accesToken: response.access_token


                }).then((response) => {

                    toast.success("Login Success")
                    const user = response.data.user
                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("user", JSON.stringify(user))
                    setAuth(!auth);

                    if (user?.role === "admin") {
                        navigate('/admin')
                    }
                    if (user?.role === "customer") {
                        navigate('/')
                    }


                }).catch((e) => {
                    console.log(e);
                })

            }
        }
    );

    function login() {



        const backendurl = import.meta.env.VITE_BACKEND_URL

        axios.post(`${backendurl}/api/users/login`, {
            email: email,
            password: password

        }
        ).then((res) => {

            toast.success("Login Success")
            const user = res.data.user

            localStorage.setItem("token", res.data.token)
            localStorage.setItem("user", JSON.stringify(user))
            if (user.emailVerified == false) {
                navigate('/verify-email')
                return
            }
            if (user?.role === "admin") {
                setAuth(!auth);
                navigate('/admin');
            }
            if (user?.role === "customer") {
                setAuth(!auth);
                navigate('/');
            }

        }
        ).catch((e) => {
            console.log(e),
                toast.error(e.response.data.message || e.response.data.error)

        })



    }


    return (
        <div className='w-full h-screen flex justify-center items-center bg-picture '>

            <div className='w-[400px] h-auto backdrop-blur-xl rounded-2xl flex justify-center items-center flex-col relative py-4'>


                <img src="/logo.png" className='w-[100px] h-[100px]  top-1 object-cover' />

                <input placeholder='Email' className='w-[300px] h-[50px] bg-transparent border-b-2 border-white text-white text-2xl outline-none' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Password' className='w-[300px] h-[50px] bg-transparent border-b-2 border-white text-white text-2xl outline-none' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='w-[300px] h-[50px] bg-[#f0ad38] text-white text-xl my-5 rounded-lg hover:bg-[#ffb12bee]' onClick={login} >Login</button>

                <button className='w-[300px] h-[50px] bg-[#f0ad38] text-white text-xl my-5 rounded-lg hover:bg-[#ffb12bee]' onClick={googleLogin} >Login With Google</button>

                <div className='bottom-4 flex flex-col items-center justify-center gap-2 text-white '>

                 <div> admin@mail.com - 12345</div>  
                 <div>user@mail.com - 123456</div>

                </div>

                <div className='flex flex-col items-center justify-center'>

                    <p className='text-white'>
                       New to KV-Audio?
                    </p>

                    <Link to="/register" className='hover:text-accent font-bold text-white '>
                       Register here !
                    </Link>



                </div>

            </div>


        </div>
    )
}

export default LoginPage