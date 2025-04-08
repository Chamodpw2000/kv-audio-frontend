import React from 'react';

const GalleryCard = ({ item }) => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">

        <div>
            ujefiuwwef wefijweidjweidjwef
        </div>
      {/* Image with overlay */}
      <div className="relative w-full h-full">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/70 flex flex-col justify-end">
          
          {/* Content container */}
          <div className="p-8 md:p-16 text-white max-w-4xl">
            
            {/* Header with logo and number */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center font-bold text-xl md:text-2xl">
                <span className="text-[#f0ad38]">KV</span>
                <span className="text-white mx-0.5">-</span>
                <span className="text-[#3674b5]">AUDIO</span>
              </div>
              <div className="text-4xl md:text-5xl font-extrabold text-[#f0ad38]/30">
                {item.id.toString().padStart(2, '0')}
              </div>
            </div>
            
            {/* Title with underline */}
            <div className="relative mb-8">
              <h2 className="text-2xl md:text-4xl font-bold mb-2 text-white drop-shadow-md">
                {item.title}
              </h2>
              <div className="absolute -bottom-2 left-0 w-20 h-1 bg-[#f0ad38]"></div>
            </div>
            
            {/* Description */}
            <p className="text-base md:text-lg leading-relaxed mb-8 max-w-[90%]">
              {item.description}
            </p>
            
            {/* Footer with tag and button */}
            <div className="flex justify-between items-center mt-6">
              <div className="bg-[#3674b5]/80 px-4 py-2 rounded text-sm font-bold tracking-wider">
                EVENT SHOWCASE
              </div>
              <button className="bg-[#f0ad38] hover:bg-[#e09520] text-white font-bold py-3 px-6 rounded transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#f0ad38]/30">
                BOOK NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
