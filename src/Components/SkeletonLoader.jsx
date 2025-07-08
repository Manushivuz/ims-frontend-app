import React from "react";
import { Skeleton } from "@/Components/ui/skeleton";

const SkeletonLoader = () => {
  return (
    <div className="p-3 sm:p-4 border rounded-lg shadow-sm bg-white">
      {/* Loading Title */}
      <div className="mb-3 sm:mb-4">
        <Skeleton className="h-5 sm:h-6 w-1/2 sm:w-1/3" />
      </div>

      {/* Loading Task Items */}
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="mb-4 sm:mb-6">
          {/* Task Name */}
          <Skeleton className="h-4 sm:h-5 w-1/3 sm:w-1/4 mb-2" />
          {/* Task Description */}
          <Skeleton className="h-3 sm:h-4 w-2/3 sm:w-1/2 mb-2" />
          {/* Task Dates */}
          <div className="flex gap-2 mb-2">
            <Skeleton className="h-3 sm:h-4 w-16 sm:w-20" />
            <Skeleton className="h-3 sm:h-4 w-16 sm:w-20" />
          </div>
          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 sm:h-8 w-16 sm:w-20" />
            <Skeleton className="h-4 sm:h-5 w-12 sm:w-16" />
          </div>
        </div>
      ))}

      {/* Loading Footer Button */}
      <Skeleton className="h-6 sm:h-8 w-28 sm:w-36 mx-auto" />
    </div>
  );
};

export default SkeletonLoader;
