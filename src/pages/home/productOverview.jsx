import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useParams } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ImageSlider from '../../components/imageSlider';
import LoadingFeedBackCard from '../../components/loadingFeedBackCard.jsx';
import ProductFeedbackSlider from '../../components/ProductFeedbackSwiper.jsx';
import { addToCart, loadCart } from '../../utils/Cart.jsx';

const ProductOverview = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const params = useParams();
    const key = params.id;

    const [loadingStatus, setLoadingStatus] = useState("loading");
    const [product, setProduct] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);
    const [rating, setRating] = useState(0);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [loadingArray, setLoadingArray] = useState([1, 2, 3, 4, 5]);

    const getProductReviews = async () => {
        try {
            setLoadingReviews(true);
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/${key}`);

            setFeedbacks(res.data.reviews || []);
            setRating(res.data.rating || 0);
            setLoadingReviews(false);
        } catch (error) {
            console.log(error);
            setLoadingReviews(false);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`);
                // Ensure product has an image array
                const productData = res.data;
                if (!productData.image) {
                    productData.image = [];
                }
                setProduct(productData);
                setLoadingStatus("loaded");
            } catch (err) {
                console.log(err);
                setLoadingStatus("error");
            }
        };

        fetchData();
        getProductReviews();
    }, [key]);

    return (
        <div className='w-full flex justify-center py-5  lg:mt-[100px]'>
            {
                loadingStatus === "loading" &&
                <div className='w-full h-full px-[7%]'>
                    <Skeleton width="100%" height={700} className="mb-2" />
                    <Swiper
                        className='my-10'
                        spaceBetween={25}
                        slidesPerView={1}
                        breakpoints={{
                            // sm: 640px
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            // md: 768px  
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 25,
                            },
                            // lg: 1024px
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 25,
                            },
                        }}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        modules={[Autoplay, Pagination, Navigation]}
                    >
                        {loadingArray.map((feedback, index) => (
                            <SwiperSlide key={index} className="flex justify-center items-center">
                                <LoadingFeedBackCard />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
            }
            {
                loadingStatus === "loaded" && product &&
                <div className='w-full flex flex-col '>
                    <div className=' w-full flex flex-col lg:flex-row justify-center items-center '>
                        <h1 className='text-3xl font-bold text-accent text-center my-3 lg:hidden md:text-4xl md:pt-[80px] pt-[50px] lg:pt-[50px]'>{product.name}</h1>

                        {/* Mobile image slider */}
                        <div className='w-full h-full lg:w-[49%] md:hidden '>
                            {Array.isArray(product.image) && product.image.length > 0 ? (
                                <ImageSlider images={product.image} />
                            ) : (
                                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                                    <p>No images available</p>
                                </div>
                            )}
                        </div>

                        {/* Desktop image slider */}
                        <div className='w-full pt-[100px] h-full lg:w-[49%] hidden md:block'>
                            {Array.isArray(product.image) && product.image.length > 0 ? (
                                <ImageSlider images={product.image} />
                            ) : (
                                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                                    <p>No images available</p>
                                </div>
                            )}
                        </div>

                        <div className='w-full bg-blue-100 flex flex-col items-center lg:w-[49%] py-3 px-[2%]'>
                            <h1 className='text-3xl font-bold text-accent hidden lg:block m-2 text-center'>{product.name}</h1>
                            <p className='text-lg text-slate-800 text-center'>Category: {product.category}</p>
                            <p className='text-lg text-slate-800 text-center'>{product.description}</p>
                            <p className='text-xl text-accent font-bold'>LKR {product.price?.toFixed(2) || "Price unavailable"}</p>
                            <div className="mt-4 text-sm text-gray-600">
                                <span className='font-medium'>Dimensions: </span>{product.dimentions || "Not specified"}
                            </div>
                            {rating > 0 ?
                                <div className="mt-2 text-sm text-gray-600">
                                    <span className='font-medium'>Rating: </span>{rating.toFixed(2)}
                                </div>
                                : null
                            }
                            {user?.role === "customer" &&
                                <button
                                    className='bg-accent text-white px-4 py-2 rounded-md mt-4'
                                    onClick={() => {
                                        addToCart(product.key, 1);
                        
                                        toast.success("Item added to cart");
                                    }}
                                >
                                    Add to Cart
                                </button>
                            }
                            {user?.role == null &&
                                <div>
                                    <p className='text-lg text-red-500 font-bold my-3 text-center'>
                                        Login to Add Items to the cart
                                    </p>
                                </div>
                            }
                            {user?.role === "admin" &&
                                <div>
                                    <p className='text-lg text-red-500 font-bold my-3 text-center'>
                                        Only customer accounts can add items to the cart
                                    </p>
                                </div>
                            }

                        </div>
                    </div>
                    <div >
                        <ProductFeedbackSlider feedbacks={feedbacks} itemKey={key} />


                    </div>

                </div>
            }


            {
                loadingStatus === "error" &&
                <div className='w-full h-full flex justify-center items-center'>
                    <h1 className='text-2xl text-red-500'>Error loading product</h1>
                </div>
            }

        </div>
    )
}

export default ProductOverview;
