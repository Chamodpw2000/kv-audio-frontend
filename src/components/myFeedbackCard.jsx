import React from "react";

const MyReviewCard = ({ review , setModelOpen, setCurrentFeedback , setRating}) => {

  // Default values for null handlingo
  

  
  
  const profilePicture = review?.profilePicture || "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg";
  const name = review?.name || "Anonymous";
  const email = review?.email || "No email provided";
  const rating = Number.isInteger(review?.rating) ? review.rating : 0;
  const comment = review?.comment || "No comment available.";
  const date = review?.date ? new Date(review.date).toLocaleDateString() : "Unknown date";
  const photos = Array.isArray(review?.photos) ? review.photos : [];
  const itemName = review?.itemName || null;

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 border border-gray-200 flex flex-col h-[350px] w-full ">
      {/* Content Container with fixed height and scrollable content if needed */}
      <div className="flex flex-col h-full overflow-hidden">
        {/* Header with Profile Picture */}
        <div className="flex items-center gap-3 mb-2">
          <img
            src={profilePicture}
            alt={name}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 flex-shrink-0"
          />
          
          <div className="flex-1 min-w-0">
            {/* Name & Email */}
            <h3 className="text-lg font-semibold truncate">{name}</h3>
            <p className="text-xs text-gray-500 truncate">{email}</p>
          </div>
        </div>

        {/* Item Name if available */}
        {itemName && (
          <div className="mb-2">
            <h3 className="text-sm font-semibold text-gray-700 truncate">Feedback on - {itemName}</h3>
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(rating)].map((_, index) => (
            <span key={index} className="text-yellow-500">★</span>
          ))}
          {[...Array(5 - rating)].map((_, index) => (
            <span key={index} className="text-gray-300">★</span>
          ))}
        </div>

        {/* Comment with overflow handling */}
        <div className="flex-1 overflow-y-auto mb-2">
          <p className="text-gray-600 text-sm">{comment}</p>
        </div>

        {/* Footer section: Date and Photos */}
        <div className="mt-auto">
          {/* Date */}
          <p className="text-xs text-gray-500 mb-2">{date}</p>

          {/* Review Images */}
          {photos.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`review-${index}`}
                  className="w-12 h-12 rounded-md object-cover border flex-shrink-0"
                />
              ))}
            </div>
          )}
        </div>



        <div>
            <button onClick={()=>{
              setCurrentFeedback(review);
              setRating(review.rating);
              
              setModelOpen(true)}} className="mt-4 block w-full py-2 font-medium text-center text-white bg-secondary rounded-md hover:bg-white hover:text-secondary hover:border-secondary">
                Edit Feedback
            </button>
        </div>
      </div>
    </div>
  );
};

export default MyReviewCard;