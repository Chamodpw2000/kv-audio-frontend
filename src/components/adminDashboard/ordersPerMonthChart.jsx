import React from 'react'

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ordersPerMonthChartData } from './data'
export const description = "A linear line chart"

const chartConfig = {
  orders: {
    label: "Orders",
    color: "#3674B5",
  },
}


const OrdersPerMonthChart = () => {
 return (
    <Card className="m-[5%] lg:w-full">
      <CardHeader>
        <CardTitle className="text-center">Orders Per Month</CardTitle>
        <CardDescription className="text-center">January to   {new Date().toLocaleString('default', { month: 'long' })} in {new Date().getFullYear()}</CardDescription>
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