import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  if (!item) return null;

  return (
    <div className="w-[400px] h-[520px] overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl m-5 transform hover:-translate-y-1 flex flex-col">
      {/* Product Image with Fixed Height */}
      <div className="relative h-[240px] overflow-hidden group flex-shrink-0">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={item?.image?.[0] || "/placeholder.jpg"}
          alt={item?.name || "Product Image"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Product Details */}
      <div className="flex-grow px-5 py-4 flex flex-col justify-between">
        <div>
          {/* Title and Badge */}
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
              {item?.name || "No Name Available"}
            </h2>
            <span
              className={`px-2 py-1 text-xs font-bold uppercase rounded-full ${item?.availability
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                }`}
            >
              {item?.availability ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Description */}
          <p className="mt-1 text-gray-600 text-sm line-clamp-2">
            {item?.description || "No description available."}
          </p>

          {/* Price and Metadata */}
          <div className="mt-2 space-y-1 text-sm text-gray-600">
            {item?.category && (
              <div className="flex items-center">
                <svg className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {item?.category}
              </div>
            )}

            {item?.dimensions && (
              <div className="flex items-center">
                <svg className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
                {item?.dimensions}
              </div>
            )}
          </div>
        </div>

        {/* Price & Button */}
        <div className="mt-3 flex flex-col gap-2">
          <div className="flex items-end">
            <span className="text-xl font-bold text-accent">
              {item?.price ? item.price.toFixed(2) : "0.00"}
            </span>
            <span className="ml-1 text-sm text-gray-500">LKR</span>
          </div>

          <Link
            to={item?.key ? `/home/product/${item.key}` : "#"}
            className="w-full py-2 text-sm font-medium text-center text-white bg-secondary rounded-md hover:bg-white hover:text-secondary border border-secondary transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
