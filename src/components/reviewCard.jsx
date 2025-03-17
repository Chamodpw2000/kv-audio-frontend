import React from "react";

const ReviewCard = ({ review }) => {
  // Default values for null handling
  const profilePicture = review?.profilePicture || "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg";
  const name = review?.name || "Anonymous";
  const email = review?.email || "No email provided";
  const rating = Number.isInteger(review?.rating) ? review.rating : 0;
  const comment = review?.comment || "No comment available.";
  const date = review?.date ? new Date(review.date).toLocaleDateString() : "Unknown date";
  const photos = Array.isArray(review?.photos) ? review.photos : [];
  const itemName = review?.itemName || "Unknown item";

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 border border-gray-200 flex flex-col md:flex-row gap-4">
      {/* Profile Picture */}
      <img
        src={profilePicture}
        alt={name}
        className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
      />

      {/* Review Details */}
      <div className="flex-1">
        {/* Name & Email */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">{email}</p>
        </div>




        {/* Name & Email */}
        <div className="flex items-center justify-between">
          <h3 className="text-md font-semibold">Feedback on - {itemName}</h3>
          
        </div>


        

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          {[...Array(rating)].map((_, index) => (
            <span key={index} className="text-yellow-500">★</span>
          ))}
          {[...Array(5 - rating)].map((_, index) => (
            <span key={index} className="text-gray-300">★</span>
          ))}
        </div>

        {/* Comment */}
        <p className="text-gray-600 mt-2">{comment}</p>

        {/* Date */}
        <p className="text-xs text-gray-500 mt-2">{date}</p>

        {/* Review Images */}
        {photos.length > 0 && (
          <div className="mt-3 flex gap-2">
            {photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`review-${index}`}
                className="w-16 h-16 rounded-md object-cover border"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
