import React from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingProductCard = () => {
  return (
    <div>



         <div className="w-full h-[520px] overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl  transform hover:-translate-y-1 flex flex-col">
                        {/* Product Image with Fixed Height */}
                        <div className="relative h-[240px] overflow-hidden group flex-shrink-0">
                            <Skeleton height="100%" width="100%" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-grow px-5 py-4 flex flex-col justify-between">
                            <div>
                                {/* Title and Badge */}
                                <div className="flex justify-between items-start">
                                    <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                                        <Skeleton width={150} />
                                    </h2>
                                 <Skeleton width={80} height={20} className="bg-gray-200 rounded-full" />
                                </div>

                                {/* Description */}
                                <p className="mt-1 text-gray-600 text-sm line-clamp-2">
                                    <Skeleton count={2} />
                                </p>

                                {/* Price and Metadata */}
                                <div className="mt-2 space-y-1 text-sm text-gray-600">
                    
                                        <div className="flex items-center">
                                 
                                            <Skeleton width={100} />
                                        </div>
                                    

                                    
                                        <div className="flex items-center">
                            
                                            <Skeleton width={100} />
                                        </div>
                          
                                </div>
                            </div>

                            {/* Price & Button */}
                            <div className="mt-3 flex flex-col gap-2">
                                <div className="flex items-end">
                                    <Skeleton width={80} height={24} />
                                   
                                </div>

                                <Skeleton width={"100%"} height={40} className="bg-indigo-600 text-white rounded-lg" />
                            </div>
                        </div>
                    </div>


    </div>
  )
}

export default LoadingProductCard