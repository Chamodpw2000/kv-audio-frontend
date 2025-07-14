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
import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
export const description = "A bar chart"

const chartConfig = {

}

const OrdersPerItem = () => {

  const [chartData, setChartData] = useState([

  ]);
  
  const [loading, setLoading] = useState(false);
  
  const [selections, setSelections] = useState({
    items: [],
    dateRange: {
      from: null,
      to: null
    }
  });


  const filterOrders = async (selections) => {
    console.log(selections);
    
    // Validation: Check if items are selected
    if (!selections.items || selections.items.length === 0) {
      toast.error("Please select at least one item to search orders");
      return;
    }
    
    // Validation: Check if date range is selected
    if (!selections.dateRange || !selections.dateRange.from || !selections.dateRange.to) {
      toast.error("Please select a date range to search orders");
      return;
    }
    
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/analytics/ordersPerItem`, 
         selections, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Format the response
      console.log("API Response:", response.data);
      
      if (response.data && response.data.analytics) {
        // Create a map of item -> orders from API response
        const apiData = new Map();
        response.data.analytics.forEach(([item, orders]) => {
          apiData.set(item, orders);
        });
        
        // Create chart data that includes ALL selected items (with 0 for missing items)
        const formattedData = selections.items.map(selectedItem => ({
          item: selectedItem,
          orders: apiData.get(selectedItem) || 0
        }));
        
        console.log("Formatted Data:", formattedData);
        setChartData(formattedData);
        
        if (formattedData.length > 0) {
          const totalOrders = formattedData.reduce((sum, item) => sum + item.orders, 0);
          if (totalOrders > 0) {
            toast.success(`Found ${totalOrders} total orders for ${formattedData.length} item(s)`);
          } else {
            toast.info("No orders found for the selected items in the date range");
          }
        } else {
          toast.info("No items selected");
        }
      } else {
        // If no analytics data, still show selected items with 0 orders
        const formattedData = selections.items.map(selectedItem => ({
          item: selectedItem,
          orders: 0
        }));
        
        console.log("No analytics data - showing selected items with 0 orders");
        setChartData(formattedData);
        toast.info("No orders found for the selected items in the date range");
      }

    } catch (error) {
      console.log("Error fetching orders:", error);
      toast.error("Failed to fetch orders. Showing selected items with 0 orders.");
      
      // Show selected items with 0 orders on error
      const fallbackData = selections.items.map(selectedItem => ({
        item: selectedItem,
        orders: 0
      }));
      setChartData(fallbackData);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Card className="m-[5%] lg:m-[2.5%]">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Orders Per Items</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col xl:flex-row">


        <div className="flex  xl:flex-1 item-center flex-col justify-center gap-y-10 lg:flex-row lg:gap-x-10 lg:w-full ">
          <div className="lg:flex-1 mt-5"><Selecter selections={selections} setSelections={setSelections} /></div>
          <div className="lg:flex-1"><Calander selections={selections} setSelections={setSelections} />

          </div>
        </div>

        <div className="xl:flex xl:flex-1 xl:flex-col ">
          <div className="flex flex-wrap items-center gap-2 md:flex-row justify-center">
            <Button 
              className="my-5" 
              onClick={() => filterOrders(selections)}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search Orders"}
            </Button>
          </div>
          <ChartContainer config={chartConfig}>
            {chartData.length > 0 ? (
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="item"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  interval={0}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="orders" fill="#3674b5" radius={8} />
              </BarChart>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <p className="text-lg font-medium">No Data to Display</p>
                  <p className="text-sm">Select items and date range, then click "Search Orders"</p>
                </div>
              </div>
            )}
          </ChartContainer>
        </div>
      </CardContent>

    </Card>
  )
}

export default OrdersPerItem