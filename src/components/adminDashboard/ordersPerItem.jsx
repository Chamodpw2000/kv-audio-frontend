import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Button } from "@/components/ui/button"


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
import Selecter from "./selecter"
import Calander from "./calander"
import { useState } from "react"
export const description = "A bar chart"
const chartData = [
  { item: "SND003", orders: 186 },
  { item: "SND004", orders: 305 },
  { item: "SND005", orders: 237 },
  { item: "SND006", orders: 73 },
  { item: "SND007", orders: 209 },
  { item: "SND010", orders: 214 },
]
const chartConfig = {

}

const OrdersPerItem = () => {
  const [selections, setSelections] = useState({
    items: [],
    dateRange: {
      from: null,
      to: null
    }
  });
  return (
    <Card className="m-[5%] lg:m-[2.5%]">
      <CardHeader>
        <CardTitle className="text-center">Orders Per Items</CardTitle>
        <CardDescription className="text-center">January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col xl:flex-row">


        <div className="flex  xl:flex-1 item-center flex-col justify-center gap-y-10 lg:flex-row lg:gap-x-10 lg:w-full ">
          <div className="lg:flex-1 mt-5"><Selecter selections={selections} setSelections={setSelections} /></div>
          <div className="lg:flex-1"><Calander selections={selections} setSelections={setSelections} />

          </div>
        </div>

        <div className="xl:flex xl:flex-1 xl:flex-col ">
          <div className="flex flex-wrap items-center gap-2 md:flex-row justify-center">
            <Button className="my-5" onClick={() => console.log(selections)}>Search Orders</Button>
          </div>
          <ChartContainer config={chartConfig}>



            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="item"
                tickLine={false}
                tickMargin={10}
                axisLine={false}

              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="orders" fill="#3674b5" radius={8} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>

    </Card>
  )
}

export default OrdersPerItem