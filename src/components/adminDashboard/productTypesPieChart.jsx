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
import { productTypesPieChartData } from "./data"

export const description = "A simple pie chart"

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
  return (
    <Card className="flex flex-col m-[5%]   lg:w-full  ">
      <CardHeader className="items-center pb-0">
        <CardTitle>Types of Products Available</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 w-full">
        <ChartContainer
          config={chartConfig}
          className="w-full h-full aspect-square max-h-[250px] sm:max-h-[300px] md:max-h-[350px] lg:max-h-[400px] xl:max-h-[450px]"
        >
          <PieChart width="100%" height="100%" className="max-w-[300px]">
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie 
              data={productTypesPieChartData} 
              dataKey="items" 
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius="80%"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default ProductTypesPieChart
