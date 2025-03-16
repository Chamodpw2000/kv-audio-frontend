import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import axios from 'axios';
import ProductCard from './productCard';
import ReviewCard from './reviewCard';

const FeedbackSlider = () => {




    const [feedbacks, setFeedbacks] = useState([]);
    // const [state, setState] = useState("loading") // loading, success, error




    useEffect(() => {

        console.log("FeedbackSlider");


        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`)
            .then((res) => {


                console.log(res.data)
                setFeedbacks(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
        , [])






    return (
        <div className="py-4 mx-4">
            <div>
                <Swiper
                    spaceBetween={25}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    loop={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false // This prevents autoplay from stopping on user interaction
                    }}

                    modules={[Autoplay, Pagination, Navigation]} // Include Navigation since you imported it
                >
                    {feedbacks.length === 0 ? (
                        <p className="text-center text-gray-500">No feedback available</p>
                    ) : (
                        feedbacks.map((feedback, index) => (
                            <SwiperSlide key={index} className="flex justify-center items-center">
                                <ReviewCard review={feedback} />
                            </SwiperSlide>
                        ))
                    )}

                </Swiper>
            </div>
        </div>
    );
};

export default FeedbackSlider;
