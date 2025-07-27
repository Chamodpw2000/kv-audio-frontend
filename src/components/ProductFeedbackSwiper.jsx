import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import mediaUpload from '../utils/mediaUpload';
import LoadingFeedBackCard from './loadingFeedBackCard';
import ReviewCard from './reviewCard';

const StarRating = ({ rating, setRating }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center space-x-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
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

const ProductFeedbackSlider = ({feedbacks,itemKey,loadingReviews}) => {


  

   

    const user = JSON.parse(localStorage.getItem('user'));

    

  const [modelOpen, setModelOpen] = useState(false);
  const [itemId, setItemId] = useState();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "id") setItemId(value);
    else if (name === "comment") setComment(value);
  };

  const handleAddItem = async () => {
    if (!rating || !comment) {
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
      const imageUrls = await Promise.all([...productImages].map((file) => mediaUpload(file)));
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews`,
        { itemId:itemKey, rating, comment, photos: imageUrls },
        { headers: { Authorization: `Bearer ${token}` } }
      );


   

      toast.success("Review added successfully");
      setItemId('');
      setRating(0);
      setComment('');
      setProductImages([]);
      setModelOpen(false);
     
      // Refresh feedbacks after adding a new one
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`);
   
    } catch (error) {
     
      toast.error(error.response.data.message || 'Failed to add review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

<h1 className='text-3xl font-bold text-accent text-center hidden md:block m-2'>Reviews About this Product ! </h1>
      <div className="py-4 mx-4 md:hidden">
        
        
        
        
        
       {!loadingReviews && <Swiper
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
          loop={feedbacks && feedbacks.length > 1}  // Only enable loop if there are multiple slides
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {feedbacks && feedbacks.length > 0 ? (
            feedbacks.map((feedback, index) => (
              <SwiperSlide key={index} className="flex justify-center items-center">
                <ReviewCard review={feedback} />
              </SwiperSlide>
            ))
          ) : (
            <div className="flex justify-center items-center ">
              <p className="text-center text-gray-500 ">No Reviews Available for this Product</p>
            </div>
          )}
        </Swiper>}

      {loadingReviews && (<Swiper
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
          loop={feedbacks && feedbacks.length > 1}  // Only enable loop if there are multiple slides
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          <LoadingFeedBackCard />
        </Swiper>
        
      )}

       {user?.role=="customer" &&  <button
          className="mt-4 block w-full py-2 font-medium text-center text-white bg-secondary rounded-md hover:bg-white hover:text-secondary hover:border-secondary border-2"
          onClick={() => setModelOpen(true)}
        >
          Add a Review for this Item
        </button>}
      </div>


      <div className="py-4 mx-4 hidden md:block">
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
          loop={feedbacks && feedbacks.length > 1}  // Only enable loop if there are multiple slides
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {feedbacks && feedbacks.length > 0 ? (
            feedbacks.map((feedback, index) => (
              <SwiperSlide key={index} className="flex justify-center items-center">
                <ReviewCard review={feedback} />
              </SwiperSlide>
            ))
          ) : (
              
    <div className="flex justify-center items-center ">
              <p className="text-center text-2xl text-gray-500 m-3">No Reviews Available for this Product</p>
            </div>

        
        
          )}
        </Swiper>

       {user?.role=="customer" &&  <button
          className="mt-4 block w-full py-2 font-medium text-center text-white bg-secondary rounded-md hover:bg-white hover:text-secondary hover:border-secondary border-2"
          onClick={() => setModelOpen(true)}
        >
          Add a Review for this item. 
        </button>}
      </div>

      {modelOpen && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center p-5 flex-col md:mt-10 lg:mt-0">
          <div className='flex flex-col m-5 border-2 border-accent w-full bg-white p-5 rounded-3xl'>
            <h1 className='text-2xl font-bold text-center text-accent'>Add a Review</h1>
            <label className='my-2 mx-0'>Item Id (Optional)
              <input type="text" className='w-full rounded-xl h-[40px] border-2 border-secondary p-2 ' value={itemKey} name="id" onChange={handleChange} readOnly />
            </label>
            <label className='my-2'>Rating
              <div className="mt-2">
                <StarRating rating={rating} setRating={setRating} />
              </div>
            </label>
            <label className='my-2'>Comment
              <textarea className='w-full rounded-xl h-[80px] border-2 border-secondary p-2' value={comment} name="comment" onChange={handleChange} />
            </label>
            <label className='my-2'>Add Photos
              <input type="file" multiple onChange={(e) => setProductImages(e.target.files)} />
            </label>
            <div className='flex justify-center items-center w-full gap-4 py-2'>
              <button
                className="mt-4 block w-full border-2 max-w-[200px] py-2 font-medium text-center text-white bg-secondary rounded-md hover:bg-white hover:text-secondary hover:border-secondary transition-colors"
                onClick={handleAddItem}
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Review'}
              </button>
              <button
                className="mt-4 block border-2 w-full max-w-[200px] py-2 font-medium text-center text-white bg-red-600 rounded-md hover:bg-white hover:text-red-600 hover:border-red-600 transition-colors"
                onClick={() => setModelOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFeedbackSlider;