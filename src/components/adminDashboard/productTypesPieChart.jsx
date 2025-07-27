import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Pie, PieChart } from "recharts"
import axios from "axios"
import React, { useEffect, useState } from "react"



const chartConfig = {
  sounds: {
    label: "Sounds",
  },
  lighting: {
    label: "Lighting",
    color: "var(--chart-1)",
  },
  furniture: {
    label: "Furniture",
    color: "var(--chart-2)",
  },
  decorations: {
    label: "Decorations",
    color: "var(--chart-3)",
  }
}

const ProductTypesPieChart = () => {
  const [productTypes, setProductTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/analytics/productTypes`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {

        setProductTypes(res.data);
        setLoading(false);
      }).catch((err) => {
        console.error(err);
        setLoading(false);
      });
    } else {

      setLoading(false);
    }
  }, []);
  
  // Convert array data to object for easier access
  const productTypesObject = productTypes.reduce((acc, [type, count]) => {
    acc[type] = count;
    return acc;
  }, {});
  
  const productTypesPieChartData = [
    { type: "sounds", items: productTypesObject["sounds"] || 0, fill: "#4285F4" },
    { type: "lighting", items: productTypesObject["lighting"] || 0, fill: "#F9A825" },
    { type: "furniture", items: productTypesObject["furniture"] || 0, fill: "#FF5722" },
    { type: "decorations", items: productTypesObject["decorations"] || 0, fill: "#00BFAE" },
  ];

  // Filter out items with 0 values for the pie chart
  const filteredChartData = productTypesPieChartData.filter(item => item.items > 0);
  


  if (loading) {
    return (
      <Card className="flex flex-col m-[5%] lg:w-full">
        <CardHeader className="items-center pb-0 ">
          <CardTitle>Types of Products Available</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0 w-full  px-0">
          <div className="flex items-center justify-center h-64">
            <div>Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="flex flex-col m-[5%] lg:w-full">
      <CardHeader className="items-center pb-5 ">
        <CardTitle className="text-2xl">Types of Products Available</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-5 w-full  ">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-x-0">
          {/* Pie Chart */}
          <div className="flex">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square w-full max-w-[350px] h-[350px]"
            >
              <PieChart width={350} height={350}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie 
                  data={filteredChartData.length > 0 ? filteredChartData : [{ type: "No Data", items: 1, fill: "#e5e7eb" }]} 
                  dataKey="items" 
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                />
              </PieChart>
            </ChartContainer>
          </div>

          {/* Custom Legend - Side by side */}
          <div className="flex flex-col gap-3 w-full lg:w-auto lg:min-w-[250px] lg:max-w-[300px]">
            <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center lg:text-left">
              Product Categories
            </h3>
            <div className="flex flex-col gap-3">
              {productTypesPieChartData.map((item, index) => (
                <div 
                  key={item.type} 
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div 
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.fill }}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {item.type}
                      </span>
                      <span className="text-sm font-bold text-gray-900 ml-2">
                        {item.items}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div 
                        className="h-1.5 rounded-full transition-all duration-300"
                        style={{ 
                          backgroundColor: item.fill,
                          width: `${Math.max((item.items / Math.max(...productTypesPieChartData.map(d => d.items))) * 100, 5)}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Total Count */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-blue-700">
                  Total Products
                </span>
                <span className="text-xl font-bold text-blue-900">
                  {productTypesPieChartData.reduce((sum, item) => sum + item.items, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductTypesPieChart
