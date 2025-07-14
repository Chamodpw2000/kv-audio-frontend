import OrdersPerItem from '@/components/adminDashboard/ordersPerItem'
import OrdersPerMonthChart from '@/components/adminDashboard/ordersPerMonthChart'
import ProductTypesPieChart from '@/components/adminDashboard/productTypesPieChart'
import TopCustomers from '@/components/adminDashboard/topCustomers'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='overflow-x-hidden'>

        <div className='flex flex-col 2xl:flex-row w-full'>
            <div className='lg:flex lg:flex-1 w-full'>
                <ProductTypesPieChart />
            </div>
            <div className='lg:flex lg:flex-1 w-full'>
                <OrdersPerMonthChart />
            </div>
        </div>



<OrdersPerItem />

<TopCustomers/>




    </div>
  )
}

export default Dashboard