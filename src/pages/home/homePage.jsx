import React, { useState } from 'react'
import Header from '../../components/header'
import { Route, Routes } from 'react-router-dom'
import Contact from './contact'
import Items from './items'
import Gallery from './gallery'
import NotFound from './notFound'
import LoginPage from '../../login/login'
import ProductOverview from './productOverview'
import BookingsPage from './bookingPage'
import Orders from '../admin/bookings'
import Home from './home'
import Footer from '../../components/footer'
import RegisterPage from '../../assets/register/RegisterPage'
import Profile from './profile'

const HomePage = () => {

    const [auth, setAuth] = useState(false)
    return (
        <>
            <Header auth={auth}/>

        
          

            <div className="h-full w-full bg-primary">
                <Routes>

                    <Route path="/" element={< Home/>} />

                    <Route path="items" element={<Items />} />
                    <Route path="gallery" element={<Gallery />} />
                    <Route path="login" element={<LoginPage setAuth={setAuth} auth={auth} />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="product/:id" element={<ProductOverview/>} />
                    <Route path="booking" element={<BookingsPage />} />
                    <Route path="mybookings" element={<Orders />} />
                    <Route path="register" element={<RegisterPage setAuth={setAuth} auth={auth} />} />
                    <Route path="myprofile" element={<Profile />} />



                </Routes>
            </div>

            <Footer />
        </>
    )
}

export default HomePage
