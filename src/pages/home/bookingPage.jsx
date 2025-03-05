import React, { useState } from 'react'
import { loadCart } from '../../utils/Cart'
import BookingItem from '../../components/bookingItem';

const BookingsPage = () => {
    const [cart, setCart] = useState(loadCart())
    function reloadCart() {
        setCart(loadCart());
    }

    // console.log("cart", cart);
    // console.log("local", localStorage.getItem('cart'));
    
    
    return (
        <div className='wifull h-full flex flex-col items-center'>


            <h1>
            Bookings Page
            </h1>  

            <div className="w-full flex flex-col items-center p-5">
                
            {
                cart.orderedItems.map((item) => {
                    return <BookingItem itemKey={item.key} qty={item.qty} refresh={reloadCart} />
                    
                })
            }    
            </div>  




        </div>
    )
}

export default BookingsPage