import React from 'react'
import './home.css'
import Slider from '../../components/swiper'
import FeedbackSlider from '../../components/feedbackSwiper'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigator = useNavigate();
  return (
    <div className='min-h-screen flex flex-col   pt-[70px] '>


      <div className="min-h-screen bg-gradient-to-b from-accent to-white pt-10 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:space-x-8 items-center rounded-3xl overflow-hidden ">

            {/* Hero Banner Section */}
            <div className="w-full md:w-1/2  relative overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
              <div className="absolute inset-0 "></div>




              <div className="relative py-24 px-8 flex flex-col items-center justify-center text-center h-full  bg-picture1 ">

                <div className=" bg-black bg-opacity-50 flex items-center justify-center flex-col p-5 rounded-xl">

                  <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight   ">
                    Welcome to KV Audio
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-6"></div>
                  <h2 className="text-2xl text-white  mb-6 font-bold">
                    Rent! Celebrate! Repeat!
                  </h2>
                  <button className="mt-4 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full transform transition hover:scale-105 hover:shadow-lg" onClick={()=>navigator("/home/items")}>
                    Book Now
                  </button>


                </div>

              </div>
            </div>

            {/* About Section */}
            <div className="w-full md:w-1/2 bg-white p-8 md:p-12 rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none">
              <div className="flex justify-center mb-8">
                <img
                  src="./logo.png"
                  alt="KV Audio Logo"
                  className="h-24 md:h-28 object-contain"
                />
              </div>

              <h3 className="text-3xl font-bold text-center text-accent mb-6 hidden md:block">
                About Us
              </h3>
              <h3 className="text-3xl font-bold text-center text-accent md:hidden mb-6">
                About Us
              </h3>

              <p className="text-lg text-slate-600 leading-relaxed text-center mb-8">
                At KV Audio, we provide top-quality party and event rentals to make your celebration unforgettable. From sound systems and lighting to furniture and décor, we've got everything you need. Our mission is to make event planning easy with reliable, affordable equipment and exceptional service.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Premium Quality</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">24/7 Support</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="font-medium">Affordable Pricing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>





      <div className='flex flex-col items-center justify-center px-[5%]'>

        <p className='text-center text-2xl  font-bold text-accent md:text-[60px] md:pb-10'>Our Services</p>
        <div className='flex flex-col md:flex-row   p-3'>
          <div className='flex flex-col items-center justify-center bg-primary rounded-3xl p-3 m-1'>
            <img src="./sounds.jpg" alt="sound" className='h-[120px] md:h-[450px] w-[300px] rounded-3xl object-cover' />
            <p className='text-center text-lg font-bold py-2 text-secondary md:text-3xl' >Sound Systems</p>
            <p className='text-center text-lg'>Top-quality sound systems for any event</p>
          </div>
          <div className='flex flex-col items-center justify-center bg-primary rounded-3xl p-3 m-2'>
            <img src="./lights.png" alt="light" className='h-[120px] md:h-[450px] w-[300px] rounded-3xl object-cover' />
            <p className='text-center text-lg font-bold py-2 text-secondary md:text-3xl'>Lighting</p>
            <p className='text-center text-lg'>Lighting solutions to set the mood to enjoy the event</p>
          </div>
          <div className='flex flex-col items-center justify-center bg-primary rounded-3xl p-3 m-2'>
            <img src="./furnitures.jpg" alt="furniture" className='h-[120px]  md:h-[450px] w-[300px] rounded-3xl object-cover' />
            <p className='text-center text-lg font-bold py-2 text-secondary md:text-3xl'>Furniture</p>
            <p className='text-center text-lg'>Stylish and comfortable furniture for your guests</p>
          </div>
          <div className='flex flex-col items-center justify-center bg-primary rounded-3xl p-3 m-2'>
            <img src="./deco.jpg" alt="deco" className='h-[120px] md:h-[450px] w-[300px] rounded-3xl object-cover' />
            <p className='text-center text-lg font-bold py-2 text-secondary md:text-3xl'>Décor</p>
            <p className='text-center text-lg'>Unique and elegant décor to make your event special</p>
          </div>
        </div>


      </div>


      <div>
        <p className='md:text-[60px] text-center text-2xl font-bold text-accent md:pt-10'>Our Products</p>
        <Slider />
      </div>


      <div>

        <p className='text-center text-2xl font-bold text-accent  md:py-10 md:text-[60px]'>Customer Feedbacks</p>

        <FeedbackSlider />


      </div>





    </div>
  )
}

export default Home