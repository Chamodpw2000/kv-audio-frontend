import React from 'react'
import { IoMdClose } from "react-icons/io";


const MobileNavPannel = (props) => {
    const isOpen = props.isOpen;
    const setOpen = props.setOpen;
  return (
<> {isOpen && <div className='w-full h-screen bg-[#00000070]  fixed top-0 left-0'>
<div className='h-full bg-white w-[calc(100vw-70px)] '>
<div className='w-full h-[70px] flex items-center bg-accent relative'>
<img src="/logo.png" alt="logo" className="w-[70px] h-[70px] object-cover" />
<IoMdClose className='absolute right-5 text-[24px]' onClick={()=>{setOpen(!isOpen)}}/>

</div>
</div>
</div>}


    </>
  )
}

export default MobileNavPannel