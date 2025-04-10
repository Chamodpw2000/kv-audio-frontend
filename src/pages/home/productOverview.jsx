import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { use } from 'react';
import { useParams } from 'react-router-dom';
import ImageSlider from '../../components/imageSlider';
import { addToCart, loadCart } from '../../utils/Cart.jsx';
import { toast } from 'react-hot-toast';
import ProductFeedbackSlider from '../../components/ProductFeedbackSwiper.jsx';





const ProductOverview = () => {

    const user = JSON.parse(localStorage.getItem('user'));

    const params = useParams();
    const key = params.id;
    // console.log("id", key);

    const [loadingStatus, setLoadingStatus] = useState("loading");
    const [product, setProduct] = useState();
    // console.log(params);

    const [feedbacks, setFeedbacks] = useState([]);


    const getProductReviews = async () => {
        try {
            setLoadingStatus("loading");

            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/${key}`);
            console.log("Reviews are" ,res.data);
            setFeedbacks(res.data);

            setLoadingStatus("loaded");



        } catch (error) {
            console.log(error);



        }
    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`)
            .then((res) => {
                // console.log(res.data);
                setProduct(res.data);
                setLoadingStatus("loaded");

            }).catch((err) => {
                console.log(err);
                setLoadingStatus("error");
            })


        getProductReviews();
    }, [])

    return (
        <div className='w-full flex  justify-center py-5 '
        >


            {
                loadingStatus == "loading" && <div className='w-full h-full flex justify-center items-center'>


                    <div className='w-[70px] h-[70px] border-b-2 rounded-full border-b-accent animate-spin'></div>

                </div>
            }


            {
                loadingStatus == "loaded" && 
                <div className='w-full flex flex-col'>
                <div className=' p-2 w-full  flex flex-col md:flex-row justify-center items-center bg-slate-100'>
                    <h1 className='text-3xl font-bold text-accent text-center my-3 md:hidden pt-[50px]'>{product?.name}</h1>
                    <div className='w-full   h-full  md:w-[49%] md:hidden '>

                        <ImageSlider images={product?.image} />

                    </div>


                    <div className='w-full pt-[100px]   h-full  md:w-[49%] hidden md:block '>

                        <ImageSlider images={product?.image} />

                    </div>
                    <div className='w-full bg-blue-100  flex flex-col items-center md:w-[49%] py-3  '>

                        <h1 className='text-3xl font-bold text-accent hidden md:block m-2'>{product.name}</h1>
                        <p className='text-lg text-slate-800 text-center'>Category: {product.category}</p>


                        <p className='text-lg text-slate-800 text-center'>{product.description}</p>
                        <p className='text-xl text-accent font-bold'>LKR {product.price.toFixed(2)}</p>
                        <div className="mt-4 text-sm text-gray-600">
                            <span className='font-medium'>Dimensions: </span>{product.dimentions}
                        </div>

                        {user?.role == "customer" && <button className='bg-accent text-white px-4 py-2 rounded-md mt-4' onClick={() => {

                            addToCart(product.key, 1);
                            console.log(loadCart(),
                                toast.success("Item added to cart")
                            )
                        }}>Add to Cart</button>}


                        {user?.role == null && <div>


                            <p className='text-lg text-red-500 font-bold my-3 text-center'>
                                Login to Add Items to the cart
                            </p>
                        </div>}


                        {user?.role == "admin" && <div>


                            <p className='text-lg text-red-500 font-bold my-3 text-center'>
                                Only customer accounts can add items to the cart
                            </p>
                        </div>}

                    </div>










                </div>

                <div>
                        
                        
                        <ProductFeedbackSlider feedbacks={feedbacks} />
                    </div>

                </div>



                
            }

            {
                loadingStatus == "error" && <div className='w-full h-full flex justify-center items-center'>

                    <h1 className='text-2xl text-red-500'>Error loading product</h1>

                </div>
            }

        </div >
    )
}

export default ProductOverview