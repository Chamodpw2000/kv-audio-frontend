import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import axios from 'axios'
import React, { useEffect } from 'react'
import { Card, CardTitle } from '../ui/card'

const TopCustomers = () => {
  const [data, setData] = React.useState([]);

  useEffect(() => {

    async function fetchData() {
      const responce = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/analytics/topCustomers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      // Transform backend response to match table format
      const formattedData = responce.data.map((customer) => ({
        name: customer.name,
        orders: customer.count,
      }));
      setData(formattedData);

    }

    fetchData();
  }, [])
  return (

    <Card className="m-[5%] p-[5%] lg:mx-[2.5%]">
      <CardTitle className="text-center mb-5 text-2xl">Top Customers of the Year</CardTitle>
      <Table>

      <TableHeader>
        <TableRow>
          <TableHead >Name</TableHead>
          <TableHead>#Orders</TableHead>
         
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((customer) => (
          <TableRow key={customer.name}>
            <TableCell className="font-medium">{customer.name}</TableCell>
            <TableCell>{customer.orders}</TableCell>
          </TableRow>
        ))}
      </TableBody>

    </Table>

    </Card>
  )
}

export default TopCustomers