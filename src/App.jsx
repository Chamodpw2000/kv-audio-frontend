import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/home/homePage'
import AdminDashboard from './pages/admin/adminDashboard'
import Testing from './components/testing'
import LoginPage from './login/login'
import ItemsCard from './components/itemsCard'
import AddItem from './components/addItem'
import RegisterPage from './assets/register/RegisterPage'
import NotFound from './pages/home/notFound'
import BookingsPage from './pages/home/bookingPage'
import { GoogleOAuthProvider } from "@react-oauth/google";
import VerifyEmail from './pages/verifyEmail/verifyEmail'
import Home from './pages/home/home'
import Header from './components/header'

import { useState } from 'react'
import Footer from './components/footer'
function App() {

       const [auth, setAuth] = useState(false)
    return (

     <div>




        <GoogleOAuthProvider clientId="143085653371-a7mme4pqh6d964ctj6rsshbtn7i9siqg.apps.googleusercontent.com">
        <BrowserRouter>
            <Toaster position="top-right" />
            <Header auth={auth} setAuth={setAuth} />
            <Routes>
                <Route path="/admin/*" element={<AdminDashboard />} />
                <Route path="/home/*" element={<HomePage auth={auth} setAuth={setAuth} />} />
                <Route path="/test" element={<Testing />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verify-email" element={<VerifyEmail setAuth={setAuth} auth={auth} />} />


                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound/>} />
            </Routes>

            <Footer />
        </BrowserRouter>

        </GoogleOAuthProvider>
</div>
    )
}

export default App
