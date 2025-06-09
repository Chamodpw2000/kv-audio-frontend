import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const GalleryImageGrid = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const imagesPerPage = 9;

  useEffect(() => {
    const getFeedbackImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/gallery/feedbackImages`);
        setImages(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching feedback images");
      } finally {
        setLoading(false);
      }
    };

    getFeedbackImages();
  }, []);

  const totalPages = Math.ceil(images.length / imagesPerPage);
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Heading Skeleton */}
        <div className="text-center mb-12">
          <Skeleton width={400} height={40} style={{ margin: '0 auto' }} />
        </div>

        {/* Image Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(9)].map((_, i) => (
            <Skeleton key={i} height={300} borderRadius={12} />
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center items-center mt-8 space-x-2">
          <Skeleton width={80} height={36} borderRadius={8} />
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} width={32} height={32} borderRadius="50%" />
            ))}
          </div>
          <Skeleton width={80} height={36} borderRadius={8} />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-4xl font-bold text-center text-accent mb-12">
        Trusted by Hundreds of Satisfied Customers!
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentImages.map((imageUrl, index) => (
          <div
            key={index}
            className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-full h-full group">
              <img
                src={imageUrl}
                alt={`Gallery image ${indexOfFirstImage + index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-accent text-white hover:bg-secondary'
            }`}
          >
            Previous
          </button>

          <div className="flex space-x-1">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`w-8 h-8 rounded-full ${
                  currentPage === i + 1 ? 'bg-accent text-white' : 'bg-gray-200 hover:bg-accent'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-accent text-white hover:bg-secondary'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryImageGrid;
