import React, { useState, useRef, useEffect } from 'react';

const GalleryCard = ({ item }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isLongDescription, setIsLongDescription] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    // Check if the description is longer than 2 lines
    if (descriptionRef.current) {
      const lineHeight = parseInt(window.getComputedStyle(descriptionRef.current).lineHeight);
      const height = descriptionRef.current.scrollHeight;
      const lines = height / lineHeight;
      setIsLongDescription(lines > 2);
    }
  }, [item.description]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="relative h-[600px] overflow-hidden w-full">
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
          <div className="p-8 md:p-16 text-white w-full">
            {/* Header with logo and number */}
            <div className="flex justify-between items-center mb-6">
            </div>

            {/* Title with underline */}
            <div className="relative mb-8">
              <h2 className="text-2xl md:text-4xl font-bold mb-2 text-white drop-shadow-md">
                {item.title}
              </h2>
              <div className="absolute -bottom-2 left-0 w-20 h-1 bg-[#f0ad38]"></div>
            </div>

            {/* Description with show more/less functionality */}
            <div className="w-full">
              <p 
                ref={descriptionRef}
                className={`text-base md:text-lg leading-relaxed w-full ${showFullDescription ? '' : 'line-clamp-2'}`}
              >
                {item.description}
              </p>
              {isLongDescription && (
                <button 
                  onClick={toggleDescription}
                  className="text-[#f0ad38] mt-2 hover:underline focus:outline-none"
                >
                  {showFullDescription ? 'Show Less' : 'Show More'}
                </button>
              )}
            </div>

            {/* Footer with tag and button */}
            <div className="flex justify-between items-center mt-6">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
