
import { MdOutlineDashboard } from 'react-icons/md'
import './App.css'
import { TbBrandBooking } from 'react-icons/tb'
import { CgMusicSpeaker } from 'react-icons/cg'
import { FaRegUser } from 'react-icons/fa'

function App() {
//
  return (


    <>

   <div className='w-full h-screen flex'> 

    <div className='w-[300px] h-full bg-green-200'>

        <button className="w-full h-[40px] text-[25px] font-bold flex items-center justify-center"> 
          <MdOutlineDashboard className="w-[25px] h-[25px]"/>
          Dashboard</button>

        <button className="w-full h-[40px] text-[25px] font-bold flex items-center justify-center">
          <TbBrandBooking className="w-[25px] h-[25px]"/>
          Bookings</button>



          <button className="w-full h-[40px] text-[25px] font-bold flex items-center justify-center">
            <CgMusicSpeaker className="w-[25px] h-[25px]"/> Items
          </button>

          <button className="w-full h-[40px] text-[25px] font-bold flex items-center justify-center">
            <FaRegUser className="w-[25px] h-[25px]"/> Users
          </button>



        



    </div >

    <div className="w-full bg-slate-300"></div>
    

    
   </div>
      
    </>
  )
}

export default App
