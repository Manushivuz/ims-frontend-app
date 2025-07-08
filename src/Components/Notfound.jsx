import { FileQuestion, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useTitle from "./useTitle";

export function NotFound() {
  const navigate = useNavigate();
  useTitle('Not Found')
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-3 sm:px-4">
      <div className="max-w-sm sm:max-w-lg w-full text-center">
        <div className="mb-6 sm:mb-8">
          <FileQuestion className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 text-indigo-500 mx-auto animate-pulse" />
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4">404</h1>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
          Page Not Found
        </h2>

        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-2">
          Oops! It seems like the intern{` you're`} looking for is on a coffee
          break. The page {`you're`} trying to access {`doesn't`} exist or has
          been moved.
        </p>

        <div className="space-y-3 sm:space-y-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-full sm:w-auto mx-auto px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base font-medium"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Go Back
          </button>

          <div>
            <button 
              onClick={() => navigate("/")} 
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base font-medium"
            >
              Go To Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
