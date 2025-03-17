import React from 'react'
import './home.css'
import Slider from '../../components/swiper'
import FeedbackSlider from '../../components/feedbackSwiper'

const Home = () => {
  return (
    <div className='min-h-screen flex flex-col p-3  pt-20'>


      <div className='flex flex-col items-center justify-center bg-picture2 rounded-3xl p-2'>



        <div className='flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-3xl p-5'>
          <h1 className='text-4xl text-white font-bold text-center' >


            Welcome to KV Audio !


          </h1>







        </div>


        <p>   <h2 className='text-xl text-white font-bold text-center' >
          Rent! Celebrate! Repeat!
        </h2></p>








      </div>

      <div>
        <div className='flex flex-col items-center justify-center '>
          <img src="./logo.png" alt="logo" className='h-[100px]' />
        </div>

        <p className='text-center text-2xl font-bold text-accent'>About Us</p>


        <p className='text-center text-lg  p-3'>



          At KV Audio, we provide top-quality party and event rentals to make your celebration unforgettable. From sound systems and lighting to furniture and décor, we’ve got everything you need. Our mission is to make event planning easy with reliable, affordable equipment and exceptional service.
        </p>

      </div>



      <div>

        <p className='text-center text-2xl font-bold text-accent'>Our Services</p>
        <div className='flex flex-col   p-3'>
          <div className='flex flex-col items-center justify-center bg-primary rounded-3xl p-3 m-1'>
            <img src="./sounds.jpg" alt="sound" className='h-[120px] w-[300px] rounded-3xl object-cover' />
            <p className='text-center text-lg font-bold py-2 text-secondary' >Sound Systems</p>
            <p className='text-center text-lg'>Top-quality sound systems for any event</p>
          </div>
          <div className='flex flex-col items-center justify-center bg-primary rounded-3xl p-3 m-2'>
            <img src="./lights.png" alt="light" className='h-[120px] w-[300px] rounded-3xl object-cover' />
            <p className='text-center text-lg font-bold py-2 text-secondary'>Lighting</p>
            <p className='text-center text-lg'>Lighting solutions to set the mood</p>
          </div>
          <div className='flex flex-col items-center justify-center bg-primary rounded-3xl p-3 m-2'>
            <img src="./furnitures.jpg" alt="furniture" className='h-[120px] w-[300px] rounded-3xl object-cover' />
            <p className='text-center text-lg font-bold py-2 text-secondary'>Furniture</p>
            <p className='text-center text-lg'>Stylish and comfortable furniture for your guests</p>
          </div>
          <div className='flex flex-col items-center justify-center bg-primary rounded-3xl p-3 m-2'>
          <img src="./deco.jpg" alt="deco" className='h-[120px] w-[300px] rounded-3xl object-cover' />
            <p className='text-center text-lg font-bold py-2 text-secondary'>Décor</p>
            <p className='text-center text-lg'>Unique and elegant décor to make your event special</p>
          </div>
        </div>


      </div>


      <div>
      <p className='text-center text-2xl font-bold text-accent'>Our Products</p>
      <Slider />
      </div>


<div>

<p className='text-center text-2xl font-bold text-accent'>Customer Feedbacks</p>

<FeedbackSlider />


</div>
      




    </div>
  )
}

export default Home