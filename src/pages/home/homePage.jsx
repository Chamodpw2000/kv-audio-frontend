import React from 'react'
import Header from '../../components/header'
import { Route, Routes } from 'react-router-dom'
import Contact from './contact'
import Items from './items'
import Gallery from './gallery'
import Home from './home'
import NotFound from './notFound'

const HomePage = () => {
    return (
        <>


            <Header />


            <div className='h-[calc(100vh-100px)] w-full bg-blue-100'>

                <Routes path="/*" >




                    <Route path="/" element={<Home/>} />

                    <Route path="/contact" element={<Contact/>} />
                    <Route path="/items" element={<Items/>} />
                    <Route path="/gallery" element={<Gallery/>} />
                    <Route path="/*" element={<NotFound/>} />


                </Routes>

            </div>


        </>








    )
}

export default HomePage