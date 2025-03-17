import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";


const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeOrder, setActiveOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/get`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setOrders(response.data);
                console.log(response.data);
                
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        if (loading) {
            fetchOrders();
        }
    }, [loading]);

    function handleOrderStatusChange(orderId, status) {

        

        const token = localStorage.getItem('token');
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/orders/status/${orderId}`, {
            orderStatus: status
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res.data);
            setLoading(true);
        }).catch((err) => {
            console.error(err);})
    }

    return (
        <div className='w-full flex flex-col items-center justify-center p-4'>
            <h2 className='text-xl font-bold mb-4'>Orders</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className='table-auto border-collapse border border-gray-300 w-full max-w-4xl'>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th className='border p-2'>Order ID</th>
                            <th className='border p-2'>Customer Email</th>
                            <th className='border p-2'>Order Date</th>
                            <th className='border p-2'>Total Cost</th>
                            <th className='border p-2'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id} className='text-center cursor-pointer' onClick={() => {
                                setActiveOrder(order);
                                setModalOpen(true);
                            }} >
                                <td className='border p-2'>{order.orderId}</td>
                                <td className='border p-2'>{order.email}</td>
                                <td className='border p-2'>{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td className='border p-2'>${order.totalCost.toFixed(2)}</td>
                                <td className='border p-2'>{order.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

{
  modalOpen && (

    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center'>
      <div className='w-[600px] bg-white p-6 rounded-lg shadow-lg'>
        <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold mb-4'>Order Details</h2>

        <IoIosCloseCircleOutline className='text-red-600 h-[30px] w-[30px] cursor-pointer' onClick={()=>{setModalOpen(false)}}/>





        </div>
        <p><span className='font-bold'>Order ID:</span> {activeOrder.orderId}</p>
        <p><span className='font-bold'>Customer Email:</span> {activeOrder.email}</p>
        <p><span className='font-bold'>Order Date:</span> {new Date(activeOrder.orderDate).toLocaleDateString()}</p>
        <p><span className='font-bold'>Total Cost:</span> ${activeOrder.totalCost.toFixed(2)}</p>
        <p><span className='font-bold'>Status:</span> {activeOrder.orderStatus ? 'Completed' : 'Pending'}</p>
        <p><span className='font-bold'>Days:</span> {activeOrder.days}</p>
        <p><span className='font-bold'>Starting Date:</span> {new Date(activeOrder.startingDate).toLocaleDateString()}</p>
        <p><span className='font-bold'>Ending Date:</span> {new Date(activeOrder.endingDate).toLocaleDateString()}</p>
        
        <h3 className='text-lg font-bold mt-4'>Ordered Items</h3>
        <table className='w-full border-collapse border border-gray-300 mt-2'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='border border-gray-300 px-3 py-2 text-left'>Item</th>
              <th className='border border-gray-300 px-3 py-2 text-left'>Price</th>
              <th className='border border-gray-300 px-3 py-2 text-left'>Quantity</th>
              <th className='border border-gray-300 px-3 py-2 text-left'>Total</th>
              <th className='border border-gray-300 px-3 py-2 text-left'>Image</th>
            </tr>
          </thead>
          <tbody>
            {activeOrder.orderedItems.map((item) => (
              <tr key={item._id} className='border border-gray-300'>
                <td className='border border-gray-300 px-3 py-2'>{item.product.name}</td>
                <td className='border border-gray-300 px-3 py-2'>${item.product.price.toFixed(2)}</td>
                <td className='border border-gray-300 px-3 py-2'>{item.quantity}</td>
                <td className='border border-gray-300 px-3 py-2'>${(item.product.price * item.quantity).toFixed(2)}</td>
                <td className='border border-gray-300 px-3 py-2'>
                  <img src={item.product.image} className='h-[50px] w-[50px] object-cover' alt={item.product.name} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>

        <button className='bg-green-500 text-white px-4 py-2 rounded-md mt-4 mr-4' onClick={() => {handleOrderStatusChange(activeOrder.orderId,"approved")}}>Approve</button>

        <button className='bg-red-500 text-white px-4 py-2 rounded-md mt-4' onClick={() => {handleOrderStatusChange(activeOrder.orderId,"rejected")}}>Reject</button>




        </div>
        
      </div>
    </div>
  )
}

        </div>
    );
};

export default Orders;
