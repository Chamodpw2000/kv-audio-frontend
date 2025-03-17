import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import axios from 'axios';
import ProductCard from './productCard';

const Slider = () => {


    const [products, setProducts] = useState([]);
    // const [state, setState] = useState("loading") // loading, success, error




    useEffect(() => {

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/getProducts`)
            .then((res) => {


                console.log(res.data)
                setProducts(res.data)
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
            </div>
        </div>
    );
};

export default Slider;
