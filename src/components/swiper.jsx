import { useEffect, useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';


import axios from 'axios';
import 'react-loading-skeleton/dist/skeleton.css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import ProductCard from './productCard';
import LoadingProductCard from './loadingProductsCard';






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
