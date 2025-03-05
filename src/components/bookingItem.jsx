import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { removeFromCart, addToCart } from '../utils/Cart.jsx';

const BookingItem = ({ itemKey, qty, refresh }) => {
    const [item, setItem] = useState(null);
    const [status, setStatus] = useState('loading');
    const [quantity, setQuantity] = useState(qty);
    const [cart, setCart] = useState([]);

    const handleIncrement = () => {
        addToCart(itemKey, 1);
        setQuantity(prev => prev + 1);
        refresh();
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            addToCart(itemKey, -1);
            console.log(itemKey);
            console.log(quantity);







            setQuantity(prev => prev - 1);
            refresh();
        }

        else {
            console.log("removinggggg", itemKey);

            removeFromCart(itemKey);
            refresh();
            window.location.reload();


        }


    };

    useEffect(() => {
        if (status === 'loading') {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${itemKey}`)
                .then((res) => {
                    setItem(res.data);
                    setStatus('success');
                })
                .catch((err) => {
                    console.error(err);
                    setStatus('error');
                    removeFromCart(itemKey);
                    refresh();
                });
        }
    }, [status]);

    if (status === 'loading') {
        return <div className='text-accent animate-pulse'>Loading...</div>;
    }
    if (status === 'error') {
        return <div className='text-red-500'>Error loading item.</div>;
    }

    const totalPrice = (item.price * quantity).toFixed(2);

    return (
        <div className='w-full max-w-3xl flex flex-col border border-gray-200 p-6 m-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300'>

            <div onClick={() => {
                setCart(JSON.parse(localStorage.getItem('cart')) || []);


                console.log("cart is", cart);
            }}>

                Show Cart
            </div>

            <div className='flex justify-between items-start'>
                <div className='flex-1'>
                    <h2 className='text-2xl font-bold text-accent mb-2'>{item.name}</h2>
                    <p className='text-gray-600 mb-3'>{item.description}</p>

                    <div className='grid grid-cols-2 gap-4 mb-4'>
                        <div>
                            <p className='text-gray-700'>
                                <span className='font-semibold'>Unit Price:</span> LKR {item.price.toFixed(2)}
                            </p>
                            <div className='flex items-center gap-3 my-2'>
                                <span className='font-semibold'>Quantity:</span>
                                <div className='flex items-center border rounded-lg'>
                                    <button
                                        onClick={handleDecrement}
                                        className='px-3 py-1 text-accent hover:bg-gray-100 rounded-l-lg'
                                    >
                                        -
                                    </button>
                                    <span className='px-4 py-1 border-x'>{quantity}</span>
                                    <button
                                        onClick={handleIncrement}
                                        className='px-3 py-1 text-accent hover:bg-gray-100 rounded-r-lg'
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <p className='text-lg font-bold text-accent mt-2'>
                                Total: LKR {totalPrice}
                            </p>
                        </div>
                        <div>
                            <p className='text-gray-700'>
                                <span className='font-semibold'>Category:</span> {item.category}
                            </p>
                            <p className='text-gray-700'>
                                <span className='font-semibold'>Dimensions:</span> {item.dimentions}
                            </p>
                            <p className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium ${item.availability
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                {item.availability ? 'In Stock' : 'Out of Stock'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-4 gap-3 mt-4'>
                {item.image.map((imgUrl, index) => (
                    <img
                        key={index}
                        src={imgUrl}
                        alt={`${item.name} - Image ${index + 1}`}
                        className='w-full h-24 object-cover rounded-lg shadow-sm hover:opacity-90 transition-opacity duration-300'
                    />
                ))}
            </div>
        </div>
    );
};

export default BookingItem;