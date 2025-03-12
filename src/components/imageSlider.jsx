import React, { useState } from 'react'

const ImageSlider = (props) => {


  const images = props.images;

  const [selectedImage, setSelectedImage] = useState(images[0]);



  return (
    <div className='w-full  h-[300px] flex flex-col items-center p-2'>

      <img src={selectedImage} alt="product image" className='w-full  object-cover' />
      <div className='w-full h-[150px] flex justify-center px-2  overflow-scroll '>
        {images.map((image, index) => {
          return <img key={index} src={image} alt="image" className={`w-[150px] h-[100px] my-2 mx-1 object-cover cursor-pointer ${image == selectedImage && "border border-accent"}`} onClick={()=>{setSelectedImage(image)}} />
        })}


      </div>





    </div>
  )
}

export default ImageSlider