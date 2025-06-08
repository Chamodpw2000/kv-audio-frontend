import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import Skeleton from 'react-loading-skeleton';  
import 'react-loading-skeleton/dist/skeleton.css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import axios from 'axios';
import ProductCard from './productCard';


import { Link } from 'react-router-dom';
import LoadingProductCard from './LoadingProductCard';
const item = {
    name: "Bluetooth Speaker",
    key: "12345",
    category: "Electronics",
    dimensions: "10x5x5 cm",
    description: "High-quality Bluetooth speaker with deep bass and clear sound.",

    price: 15000,
    availability: true,
    image: ["https://cdn.dotpe.in/longtail/store-items/6983279/HawDsdnx.webp"]
};

const Slider = () => {

    const loading = [1,2,3,4,5,6,7,8,9,10];

    const [isLoading, setIsLoading] = useState(true);


    const [products, setProducts] = useState([]);
    // const [state, setState] = useState("loading") // loading, success, error




    useEffect(() => {

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/getProducts`)
            .then((res) => {


                console.log(res.data)
                setProducts(res.data)
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err)
            })
    }
        , [])






    return (
        <div>

            <div className="py-4 mx-4">
                <div className='md:hidden  flex items-center justify-center px-[5%]'>
                  
                  
                  { !isLoading && <Swiper

                        slidesPerView={1}
                        spaceBetween={25}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false // This prevents autoplay from stopping on user interaction
                        }}

                        modules={[Autoplay, Pagination, Navigation]} // Include Navigation since you imported it
                    >
                        {products.map((product, index) => (
                            <SwiperSlide key={index} className="flex justify-center items-center">


                                {

                                    <ProductCard item={product} />
                                }
                            </SwiperSlide>
                        ))}
                    </Swiper>}

                    {
                        isLoading && <Swiper

                        slidesPerView={1}
                        spaceBetween={25}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false // This prevents autoplay from stopping on user interaction
                        }}

                        modules={[Autoplay, Pagination, Navigation]} // Include Navigation since you imported it
                    >
                        {loading.map((product, index) => (
                            <SwiperSlide key={index} className="flex justify-center items-center">


                                {

                                    <LoadingProductCard />
                                }
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    }

                    {}
                </div>
            </div>



            <div className="py-4 mx-4 hidden md:block  items-center justify-center px-[5%]">
                {!isLoading &&






                    <div>
                        <Swiper
                            spaceBetween={25}
                            slidesPerView={4}

                            loop={true}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false // This prevents autoplay from stopping on user interaction
                            }}

                            modules={[Autoplay, Pagination, Navigation]} // Include Navigation since you imported it
                        >
                            {products.map((product, index) => (
                                <SwiperSlide key={index} className="flex justify-center items-center">


                                    {

                                        <ProductCard item={product} />
                                    }
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>}

                {isLoading && <div className='flex items-center justify-center flex-wrap gap-4  px-5'>




 <Swiper
                            spaceBetween={25}
                            slidesPerView={4}

                            loop={true}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false // This prevents autoplay from stopping on user interaction
                            }}

                            modules={[Autoplay, Pagination, Navigation]} // Include Navigation since you imported it
                        >
                            {loading.map((product, index) => (
                                <SwiperSlide key={index} className="flex justify-center items-center">


                                    {

                                        <LoadingProductCard />
                                    }
                                </SwiperSlide>
                            ))}
                        </Swiper>








                   








                </div>}
            </div>
        </div>
    );
};

export default Slider;
