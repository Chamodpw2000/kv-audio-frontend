import React, { useState } from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { Link } from 'react-router-dom';

const ItemsPageAdmin = () => {

    const sampleData = [
        {
          "key": "P001",
          "name": "Wireless Headphones",
          "price": 12000,
          "category": "audio",
          "dimentions": "20cm x 15cm x 10cm",
          "description": "High-quality wireless headphones with noise cancellation.",
          "availability": true,
          "image": ["https://picsum.photos/400"]
        },
        {
          "key": "P002",
          "name": "Smart LED Bulb",
          "price": 2500,
          "category": "lights",
          "dimentions": "10cm x 6cm",
          "description": "Energy-efficient smart LED bulb with remote control.",
          "availability": true,
          "image": ["https://picsum.photos/400"]
        },
        {
          "key": "P003",
          "name": "Bluetooth Speaker",
          "price": 7500,
          "category": "audio",
          "dimentions": "15cm x 10cm x 8cm",
          "description": "Portable Bluetooth speaker with powerful bass.",
          "availability": false,
          "image": ["https://picsum.photos/400"]
        },
        {
          "key": "P004",
          "name": "Desk Lamp",
          "price": 3200,
          "category": "lights",
          "dimentions": "30cm x 15cm x 15cm",
          "description": "Adjustable LED desk lamp with touch control.",
          "availability": true,
          "image": ["https://picsum.photos/400"]
        },
        {
          "key": "P005",
          "name": "Gaming Headset",
          "price": 14500,
          "category": "audio",
          "dimentions": "22cm x 18cm x 12cm",
          "description": "Surround sound gaming headset with microphone.",
          "availability": true,
          "image": ["https://picsum.photos/400"]
        },
        {
          "key": "P006",
          "name": "Smart Ceiling Light",
          "price": 18000,
          "category": "lights",
          "dimentions": "40cm x 40cm x 8cm",
          "description": "Ceiling light with multiple color options and remote control.",
          "availability": true,
          "image": ["https://picsum.photos/400"]
        },
        {
          "key": "P007",
          "name": "Noise Cancelling Earbuds",
          "price": 9600,
          "category": "audio",
          "dimentions": "5cm x 3cm x 2cm",
          "description": "Compact wireless earbuds with active noise cancellation.",
          "availability": false,
          "image": ["https://picsum.photos/400"]
        },
        {
          "key": "P008",
          "name": "Studio Microphone",
          "price": 19500,
          "category": "audio",
          "dimentions": "25cm x 10cm x 8cm",
          "description": "Professional studio microphone with high-fidelity audio recording.",
          "availability": true,
          "image": ["https://picsum.photos/400"]
        },
        {
          "key": "P009",
          "name": "Rechargeable Lantern",
          "price": 4800,
          "category": "lights",
          "dimentions": "18cm x 12cm x 12cm",
          "description": "Portable rechargeable LED lantern for outdoor use.",
          "availability": true,
          "image": ["https://picsum.photos/400"]
        },
        {
          "key": "P010",
          "name": "Home Theater System",
          "price": 55000,
          "category": "audio",
          "dimentions": "45cm x 35cm x 25cm",
          "description": "5.1 channel home theater system with powerful bass.",
          "availability": false,
          "image": ["https://picsum.photos/400"]
        }
      ]


      const [items, setItems] = useState(sampleData)
      


  return (
    <div className='w-full h-full bg-red-100 relative'>

        <Link to='/admin/additem'> 

        <CiCirclePlus className='text-[50px] absolute right-2 bottom-2 hover:text-red-900 hover:text-[70px] cursor-pointer'/>

        
        
        </Link>

        <table>
            <thead>
                
                <th>Key</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Dimentions</th>
                <th>Description</th>
                <th>Availability</th>
                <th>Actions</th>


              
            </thead>

            <tbody>
                {sampleData.map((item) => (
                    <tr key={item.key}>
                        <td>{item.key}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.category}</td>
                        <td>{item.dimentions}</td>
                        <td>{item.description}</td>
                        <td>{item.availability ? 'Available' : 'Not Available'}</td>
                    </tr>
                ))}
            </tbody>
        </table>


        









    </div>
  )
}

export default ItemsPageAdmin