import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardTitle } from '../ui/card'
import { dataForTopCustomers } from './data'

const TopCustomers = () => {
  return (

    <Card className="m-[5%] p-[5%] lg:mx-[2.5%]">
      <CardTitle className="text-center mb-5">Top Customers of the Year</CardTitle>
      <Table>

      <TableHeader>
        <TableRow>
          <TableHead >Name</TableHead>
          <TableHead>#Orders</TableHead>
         
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataForTopCustomers.map((customer) => (
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