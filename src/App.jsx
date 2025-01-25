
import { MdOutlineDashboard } from 'react-icons/md'
import './App.css'
import { TbBrandBooking } from 'react-icons/tb'
import { CgMusicSpeaker } from 'react-icons/cg'
import { FaRegUser } from 'react-icons/fa'
import AdminDashboard from './pages/admin/adminDashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/homePage'

function App() {
//
  return (
<BrowserRouter>

<Routes path="/*" > 

<Route path="/admin/*" element={<AdminDashboard />} />
<Route path="/*" element={<HomePage/> } />
<Route path="/*" element={<h1> 404 Not Found </h1> } />




</Routes>








</BrowserRouter>

   
  )
}

export default App
