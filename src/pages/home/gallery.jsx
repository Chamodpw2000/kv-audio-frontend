import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import GallerySlider from '../../components/gallerySlider';
import GalleryImageGrid from '../../components/gallaryImageGrid';

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/gallery`);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
        toast.error("An error occurred while fetching gallery data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mt-24 flex flex-col items-center justify-center w-full h-full px-4">
      {isLoading ? (
        <div className="w-full ">
          {/* Heading Skeleton */}
          <div className="text-center mb-6">
            <Skeleton width={320} height={40} style={{ margin: '0 auto' }} />
          </div>

          {/* Big Photo Frame Skeleton (for Slider) */}
          <div className="w-full mb-10">
            <Skeleton height={400} borderRadius={16} />
          </div>

        
        </div>
      ) : (
        <div className="w-full ">
          <h3 className="text-4xl font-bold text-center text-accent mb-6">
            See How KV Audio Rocks the Party!
          </h3>

          <div className="mb-10">
            <GallerySlider items={items} />
          </div>

          <GalleryImageGrid />
        </div>
      )}
    </div>
  );
};

export default Gallery;
