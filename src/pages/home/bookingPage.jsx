import React, { useEffect, useState } from 'react';
import { formatDate, loadCart } from '../../utils/Cart';
import BookingItem from '../../components/bookingItem';
import axios from 'axios';
import { toast } from 'react-hot-toast';


const BookingsPage = () => {
    const [cart, setCart] = useState(loadCart());
    const [startDate, setStartDate] = useState(formatDate(new Date()));
    const [endDate, setEndDate] = useState(formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000)));

    const [total, setTotal] = useState(0);
    const handleBookingCreation = () => {
        const cart = loadCart();
        cart.startingDate = startDate;
        cart.endingDate = endDate;
        cart.days = calculateDays();
        
        const token = localStorage.getItem('token');
        console.log(cart);
        
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, cart, {

            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res)=>{
            console.log(res.data);
            localStorage.removeItem('cart');
            setCart(loadCart());
            toast.success('Booking Placed Successfully');
        }).catch((err)=>{
            console.error(err);
            toast.error('Failed to place booking');
        })
    };

    function calculateTotal(){
        const cartInfo = loadCart();
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`,{

           cartInfo
        }).then((res)=>{
            console.log(res.data);
            setTotal(res.data.totalCost);

        }).catch((err)=>{
            console.error(err);

        })
        
    }

    function reloadCart() {

        setCart(loadCart());
        calculateTotal();
        
    }

    useEffect(()=>{

        calculateTotal();


    },[]);

    const calculateDays = () => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = end - start;
        return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center p-5 bg-red-100">
            <div className="max-w-2xl w-full flex flex-col items-center bg-white p-5 rounded-lg shadow-lg">
                <h1 className="text-xl font-bold">Bookings Page</h1>

                {/* Date Input Section */}
                <div className="w-full flex flex-col items-center p-5 gap-4">
                    <label className="flex flex-col items-center">
                        Start Date:
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border p-2 rounded w-full"
                        />
                    </label>
                    <label className="flex flex-col items-center">
                        End Date:
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border p-2 rounded w-full"
                        />
                    </label>
                    <p className="text-lg font-semibold">Number of Days: {calculateDays()}</p>
                </div>

                {/* Booking Items */}
                <div className="w-full flex flex-col items-center p-5">
                    {cart.orderedItems.length > 0 ? (
                        cart.orderedItems.map((item) => (
                            <BookingItem key={item.key} itemKey={item.key} qty={item.qty} refresh={reloadCart} />
                        ))
                    ) : (
                        <p className="text-gray-500">No items in cart</p>
                    )}
                </div>

                {/* Booking Button */}
                <div>
                    <p className="text-lg font-semibold">Total: LKR {calculateDays()*total}</p>
                </div>


                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3"
                    onClick={handleBookingCreation}
                >
                    Place Booking
                </button>
            </div>
        </div>
    );
};

export default BookingsPage;
