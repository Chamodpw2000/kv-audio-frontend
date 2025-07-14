
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { ordersPerMonthChartData } from './data'
import { useEffect } from "react"
import axios from "axios"
import React from "react"
import { useState } from "react"


const chartConfig = {
  orders: {
    label: "Orders",
    color: "#3674B5",
  },
}


const OrdersPerMonthChart = () => {

  const [ordersPerMonth, setOrdersPerMonth] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/analytics/orderAnalytics`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        console.log("Data is", res.data);
        setOrdersPerMonth(res.data);
        setLoading(false);
      }).catch((err) => {
        console.error(err);
        setLoading(false);
      });
    } else {
      console.log("No token found");
      setLoading(false);
    }
  },[])

  // Convert API data to chart format
  const ordersPerMonthChartData = ordersPerMonth.length > 0 
    ? ordersPerMonth.map(([month, orders]) => ({
        month,
        orders
      })).sort((a, b) => {
        // Sort by month order (Jan, Feb, Mar, etc.)
        const monthOrder = ["January", "February", "March", "April", "May", "June", 
                           "July", "August", "September", "October", "November", "December"];
        return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
      })
    : [
        { month: "January", orders: 0 },
        { month: "February", orders: 0 },
        { month: "March", orders: 0 },
        { month: "April", orders: 0 },
        { month: "May", orders: 0 },
        { month: "June", orders: 0 },
        { month: "July", orders: 0 },
      ];

  console.log("Chart Data:", ordersPerMonthChartData);


 if (loading) {
    return (
      <Card className="m-[5%] lg:w-full">
        <CardHeader>
          <CardTitle className="text-center">Orders Per Month</CardTitle>
          <CardDescription className="text-center">Loading...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div>Loading chart data...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

 return (
    <Card className="m-[5%] lg:w-full">
      <CardHeader>
        <CardTitle className="text-center text-2xl">All Orders Per Month For This Year</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={ordersPerMonthChartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="orders"
              type="linear"
              stroke="var(--color-orders)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>

    </Card>
  )
}

export default OrdersPerMonthChart