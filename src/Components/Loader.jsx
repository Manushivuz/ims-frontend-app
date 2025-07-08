import React from "react";

const Loader = ({
  size = "medium",
  type = "spinner",
  text = "Loading...",
  fullScreen = false,
  overlay = false,
  color = "primary",
  containerClassName = "",
}) => {
  // Size variants mapping
  const sizeMap = {
    small: "w-3 h-3 sm:w-4 sm:h-4",
    medium: "w-6 h-6 sm:w-8 sm:h-8",
    large: "w-10 h-10 sm:w-12 sm:h-12",
  };

  // Color variants mapping
  const colorMap = {
    primary: "border-blue-600",
    secondary: "border-gray-600",
    success: "border-green-600",
    danger: "border-red-600",
    warning: "border-yellow-600",
  };

  // Loading spinner component
  const Spinner = () => (
    <div
      className={`
      ${sizeMap[size]} 
      border-2 sm:border-4 
      border-t-transparent 
      rounded-full 
      animate-spin 
      ${colorMap[color]}
    `}
    />
  );

  // Pulse dots component
  const PulseDots = () => (
    <div className="flex space-x-1 sm:space-x-2">
      {[1, 2, 3].map((dot) => (
        <div
          key={dot}
          className={`
            ${
              size === "small"
                ? "w-1.5 h-1.5 sm:w-2 sm:h-2"
                : size === "large"
                ? "w-3 h-3 sm:w-4 sm:h-4"
                : "w-2 h-2 sm:w-3 sm:h-3"
            }
            rounded-full
            bg-current
            animate-pulse
          `}
        />
      ))}
    </div>
  );

  // Progress bar component
  const ProgressBar = () => (
    <div className="w-full max-w-xs sm:max-w-md h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
      <div className={`h-full ${colorMap[color]} animate-loading-bar`} />
    </div>
  );

  // Content wrapper for consistent spacing
  const ContentWrapper = ({ children }) => (
    <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-4">
      {children}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {overlay && <div className="absolute inset-0 bg-black/50" />}
        <ContentWrapper>
          {type === "spinner" && <Spinner />}
          {type === "dots" && <PulseDots />}
          {type === "progress" && <ProgressBar />}
          {text && (
            <p
              className={`text-${color === "primary" ? "blue" : color}-600 
              ${
                size === "small"
                  ? "text-xs sm:text-sm"
                  : size === "large"
                  ? "text-base sm:text-lg"
                  : "text-sm sm:text-base"
              } font-medium`}
            >
              {text}
            </p>
          )}
        </ContentWrapper>
      </div>
    );
  }

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${containerClassName}`}
    >
      <ContentWrapper>
        {type === "spinner" && <Spinner />}
        {type === "dots" && <PulseDots />}
        {type === "progress" && <ProgressBar />}
        {text && (
          <p
            className={`text-${color === "primary" ? "blue" : color}-600 
            ${
              size === "small"
                ? "text-xs sm:text-sm"
                : size === "large"
                ? "text-base sm:text-lg"
                : "text-sm sm:text-base"
            } font-medium`}
          >
            {text}
          </p>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Loader;
