import React from 'react'
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

const HomePage = () => {
    return (
        <>
            <Header />

        
          

            <div className="h-[calc(100vh-100px)] w-full bg-primary">
                <Routes>
                    <Route path="/" element={<h1>Welcome to Home Page</h1>} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="items" element={<Items />} />
                    <Route path="gallery" element={<Gallery />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="product/:id" element={<ProductOverview/>} />
                    <Route path="booking" element={<BookingsPage />} />
                    <Route path="mybookings" element={<Orders />} />



                    


                </Routes>
            </div>
        </>
    )
}

export default HomePage
