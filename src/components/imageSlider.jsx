import React, { useState } from 'react'

const ImageSlider = (props) => {


  const images = props.images;

  const [selectedImage, setSelectedImage] = useState(images[0]||"");



  return (
    <div className='w-full  h-[400px] md:h-full flex flex-col items-center p-2  '>

      <img src={selectedImage} alt="product image" className='w-full md:h-[500px] object-cover h-[300px]' />
      <div className='w-full h-[100px] flex justify-center items-center px-2  '>
        {images.map((image, index) => {
          return <img key={index} src={image} alt="image" className={`w-[50px] h-[50px] my-2 mx-1 object-cover cursor-pointer ${image == selectedImage && "border-4 border-accent"}`} onClick={()=>{setSelectedImage(image)}} />
        })}


      </div>





    </div>
  )
}

export default ImageSlider