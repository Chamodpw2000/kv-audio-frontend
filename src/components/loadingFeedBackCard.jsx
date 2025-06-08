
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const LoadingFeedBackCard = () => {
  return (
    <div>

<div className="bg-white shadow-lg rounded-xl p-4 border border-gray-200 flex flex-col h-72 w-full  ">
      {/* Content Container with fixed height and scrollable content if needed */}
      <div className="flex flex-col h-full overflow-hidden">
        {/* Header with Profile Picture */}
        <div className="flex items-center gap-3 mb-2">
          <Skeleton circle width={48} height={48} className="flex-shrink-0" />

          <div className="flex-1 min-w-0">
            {/* Name & Email */}
            <h3 className="text-lg font-semibold truncate"><Skeleton width={100} /></h3>
            <p className="text-xs text-gray-500 truncate"><Skeleton width={80} /></p>
          </div>
        </div>

        {/* Item Name if available */}

          <div className="mb-2">
            <h3 className="text-sm font-semibold text-gray-700 truncate"><Skeleton width={120} /></h3>
          </div>
      
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Skeleton width={100} />
        </div>

        {/* Comment with overflow handling */}
        <div className="flex-1 overflow-y-auto mb-2">
          <p className="text-gray-600 text-sm"><Skeleton count={3} /></p>
        </div>

        {/* Footer section: Date and Photos */}
        <div className="mt-auto">
          {/* Date */}
          <p className="text-xs text-gray-500 mb-2"><Skeleton width={80} /></p>

          {/* Review Images */}
         
            <div className="flex gap-2 overflow-x-auto pb-1">
              {[...Array(3)].map((_, idx) => (
                <Skeleton key={idx} width={48} height={48} className="rounded-md object-cover flex-shrink-0" />
              ))} 
            
            </div>
       
        </div>
      </div>
    </div>
    </div>
  )
}

export default LoadingFeedBackCard