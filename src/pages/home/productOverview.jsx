import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { use } from 'react';
import { useParams } from 'react-router-dom';
import ImageSlider from '../../components/imageSlider';
import { addToCart, loadCart } from '../../utils/Cart.jsx';


const ProductOverview = () => {

    const params = useParams();
    const key = params.id;
    console.log("id", key);

    const [loadingStatus, setLoadingStatus] = useState("loading");
    const [product, setProduct] = useState();
    console.log(params);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`)
            .then((res) => {
                console.log(res.data);
                setProduct(res.data);
                setLoadingStatus("loaded");

            }).catch((err) => {
                console.log(err);
                setLoadingStatus("error");
            })
    }, [])

    return (
        <div className='w-full bg-red-300 h-full flex items-center justify-center'
        >


            {
                loadingStatus == "loading" && <div className='w-full h-full flex justify-center items-center'>


                    <div className='w-[70px] h-[70px] border-b-2 rounded-full border-b-accent animate-spin'></div>

                </div>
            }


            {
                loadingStatus == "loaded" && <div className='w-full h-full flex justify-center items-center bg-slate-100'>

                    <div className='w-[49%]   h-full'>

                        <ImageSlider images={product.image} />

                    </div>
                    <div className='w-[49%] bg-blue-100 h-full flex flex-col items-center '>

                        <h1 className='text-3xl font-bold text-accent'>{product.name}</h1>
                        <p className='text-lg text-slate-800'>{product.description}</p>
                        <p className='text-xl text-accent font-bold'>${product.price}</p>
                        <div className="mt-4 text-sm text-gray-600">
                            <span className='font-medium'>Dimensions: </span>{product.dimentions}
                        </div>

                        <button className='bg-accent text-white px-4 py-2 rounded-md mt-4' onClick={() => {
                            addToCart(product.key, 1);
                            console.log(loadCart()
                            )
                        }}>Add to Cart</button>

                    </div>




                </div>
            }

            {
                loadingStatus == "error" && <div className='w-full h-full flex justify-center items-center'>

                    <h1 className='text-2xl text-red-500'>Error loading product</h1>

                </div>
            }

        </div>
    )
}

export default ProductOverview