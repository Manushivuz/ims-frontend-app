import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotiBadge = ({ count }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("/notifications");
      }}
      className="relative text-gray-500 mr-3 sm:mr-5 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors"
    >
      <Bell className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
      {/* Notification Badge */}
      {count > 0 && (
        <>
          <span
            className="absolute -top-0.5 sm:-top-1 left-3 sm:left-4 md:left-7 bg-red-500 text-white text-xs 
            rounded-full w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center font-medium"
          >
            {count > 9 ? "9+" : count}
          </span>
          <span
            className="absolute -top-0.5 sm:-top-1 left-3 sm:left-4 md:left-7 bg-red-500 text-white text-xs 
            rounded-full w-3 h-3 sm:w-4 sm:h-4 animate-ping opacity-75"
          ></span>
        </>
      )}
    </div>
  );
};

export default NotiBadge;
