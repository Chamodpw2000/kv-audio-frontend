import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import axios from 'axios';
import delay from 'delay';
import mediaUpload from '../utils/mediaUpload';
import toast from 'react-hot-toast';
import MyReviewCard from './myFeedbackCard';
import LoadingFeedBackCard from './loadingFeedBackCard';

const StarRating = ({ rating, setRating , setCurrentFeedback}) => {
  const stars = [1, 2, 3, 4, 5];


  return (
    <div className="flex items-center space-x-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => {setRating(star)
            console.log("Star clicked", star);
            setCurrentFeedback((prev) => ({ ...prev, rating: star }));
            
          }}
          className="focus:outline-none"
        >
          <svg
            className={`w-8 h-8 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
      <span className="ml-2 text-sm text-gray-600">
        {rating > 0 ? `${rating} out of 5 stars` : 'Select rating'}
      </span>
    </div>
  );
};

const MyFeedbackSlider = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [modelOpen, setModelOpen] = useState(false);

  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentFeedback, setCurrentFeedback] = useState({});
  const [rating, setRating] = useState(0);

  const [edited, setEdited] = useState(false);
  const loadingArray = [1, 2, 3, 4, 5,6,7,8,9];
  const user = JSON.parse(localStorage.getItem('user'));


  const deleteFeedback = async (id) => {
       setLoading(true);

    console.log(id);
    
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to delete a review.');
      return;
    }

 
    try {
      console.log("Deleting feedback with ID:", id);
      
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Review deleted successfully");
      setEdited(!edited);
      setModelOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('Error deleting review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
    setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/get-my-reviews`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setFeedbacks(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching reviews:", err.response ? err.response.data : err.message);
        setFeedbacks([]);
      }
    };

    fetchFeedbacks();
  }, [edited]);

  useEffect(() => {
    if (modelOpen && currentFeedback?.rating) {
      setRating(currentFeedback.rating);
    }
  }, [modelOpen, currentFeedback]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItem = async () => {

    
    
    if (!rating || !currentFeedback.comment) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to add a review.');
      return;
    }

    setLoading(true);
    try {
      if (!currentFeedback._id) {
        toast.error('No feedback selected for editing.');
        return;
      }

      // Upload images if needed:
      if(productImages.length > 0
      ) {
        console.log("Uploading images", productImages);
        
        
      const imageUrls = await Promise.all([...productImages].map((file) => mediaUpload(file)));
      console.log("Image URLs", imageUrls);
      
      currentFeedback.photos = imageUrls;
    }

    
      setRating(0);
   
      setProductImages([]);
      currentFeedback.isApproves= false;
      console.log("Current Feedback", currentFeedback);
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/update/${currentFeedback._id}`, currentFeedback,{
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Review updated successfully");
      setEdited(!edited);

setModelOpen(false);
    } catch (error) {



      console.error(error);
      toast.error('Error updating review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Mobile View */}
      <div className="md:hidden">
        {!loading &&
        <Swiper
          spaceBetween={25}
          slidesPerView={1}
          loop={feedbacks.length > 1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {feedbacks.length > 0 ? (
            feedbacks.map((feedback, index) => (
              <SwiperSlide key={index} className="flex justify-center items-center">
                <MyReviewCard
                  review={feedback}
                  setModelOpen={() => {
                    setCurrentFeedback(feedback);
                    setModelOpen(true);
                  }}
                  setCurrentFeedback={setCurrentFeedback}
                  setRating={setRating}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide className="flex justify-center items-center">
              <p className="text-center text-gray-500">No feedback available</p>
            </SwiperSlide>
          )}
        </Swiper>}


         {loading &&
        <Swiper
          spaceBetween={25}
          slidesPerView={1}
  breakpoints={{
    // sm: 640px
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    // md: 768px  
    768: {
      slidesPerView: 2,
      spaceBetween: 25,
    },
    // lg: 1024px
    1024: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
  }}
      
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {
            loadingArray.map(( index) => (
              <SwiperSlide key={index} className="flex justify-center items-center">
                
              <LoadingFeedBackCard/>
              </SwiperSlide>
            ))
     
            
          }
        </Swiper>}

        
      </div>

      {/* Desktop View */}

      <div className=" hidden md:block">

        {!loading &&
        <Swiper
          spaceBetween={25}
     slidesPerView={1}
  breakpoints={{
    // sm: 640px
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    // md: 768px  
    768: {
      slidesPerView: 2,
      spaceBetween: 25,
    },
    // lg: 1024px
    1024: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
  }}
          loop={feedbacks.length > 1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {feedbacks.length > 0 ? (
            feedbacks.map((feedback, index) => (
              <SwiperSlide key={index} className="flex justify-center items-center">
                <MyReviewCard
                  review={feedback}
                  setModelOpen={() => {
                    setCurrentFeedback(feedback);
                    setModelOpen(true);
                  }}
                  setCurrentFeedback={setCurrentFeedback}
                  setRating={setRating}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide className="flex justify-center items-center">
              <p className="text-center text-gray-500">No feedback available</p>
            </SwiperSlide>
          )}
        </Swiper>}


         {loading &&
        <Swiper
          spaceBetween={25}
 slidesPerView={1}
  breakpoints={{
    // sm: 640px
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    // md: 768px  
    768: {
      slidesPerView: 2,
      spaceBetween: 25,
    },
    // lg: 1024px
    1024: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
  }}
          loop={feedbacks.length > 1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {
            loadingArray.map((index) => (
              <SwiperSlide key={index} className="flex justify-center items-center">
                
              <LoadingFeedBackCard/>
              </SwiperSlide>
            ))
     
            
          }
        </Swiper>}
      </div>

      {/* Edit Modal */}
      {modelOpen && (
        <div className="fixed inset-0  z-10 bg-black bg-opacity-50 flex justify-center items-center p-[5%] pt-[60px] md:pt-[0px] md:px-[20%] flex-col">
          <div className=' flex flex-col m-5 border-2 border-accent w-full bg-white p-5 rounded-3xl'>
            <h1 className='text-2xl font-bold text-center text-accent'>Edit the Review</h1>
            <p className='text-center my-3'>After editing your review will bent back for the approval !</p>
            <label className='my-2'>Item Id (Optional)
              <input type="text" className='w-full rounded-xl h-[40px] border-2 border-secondary p-2' value={currentFeedback.itemId} name="id" onChange={handleChange} readOnly />
            </label>
            <label className='my-2'>Rating
              <div className="mt-2">
                <StarRating rating={rating} setRating={setRating} setCurrentFeedback={setCurrentFeedback} />
              </div>
            </label>
            <label className='my-2'>Comment
              <textarea className='w-full rounded-xl h-[80px] border-2 border-secondary p-2' value={currentFeedback.comment} name="comment" onChange={handleChange} />
            </label>
            <label className='my-2'>Add Photos
              <input type="file" multiple onChange={(e) => setProductImages(e.target.files)} />
            </label>
            <div className='flex justify-center items-center w-full gap-4 py-2'>
              <button
                className="mt-4 block w-full max-w-[200px] py-2 font-medium text-center text-white bg-secondary rounded-md hover:bg-white hover:text-secondary hover:border-secondary transition-colors border-2"
                onClick={handleAddItem}
                disabled={loading}
              >
                {loading ? 'Editing...' : 'Edit Feedback'}
              </button>
              <button
                className="mt-4 block w-full max-w-[200px] py-2 font-medium text-center text-white bg-red-600 rounded-md hover:bg-white hover:text-red-600 hover:border-red-600 transition-colors border-2"
                onClick={() => setModelOpen(false)

                }
              >
                Cancel
              </button>


                            <button
                className="mt-4 block w-full max-w-[200px] py-2 font-medium text-center text-white bg-red-600 rounded-md hover:bg-white hover:text-red-600 hover:border-red-600 transition-colors border-2"
                onClick={() => deleteFeedback(currentFeedback._id)}
                disabled={loading}
              >{ loading ? 'Deleting...' : 'Delete Feedback'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFeedbackSlider;
