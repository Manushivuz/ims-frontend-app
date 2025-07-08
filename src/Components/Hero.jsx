import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Users, BookOpen, Award } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGetConnected = () => {
    navigate('/signup'); // Navigate to the signup route
  };

  return (
    <div className="pt-16 sm:pt-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-12 sm:py-16 lg:py-20 relative">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 blue-gradient-text leading-tight">
            Trusted by 2M+ students
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 max-w-2xl sm:max-w-3xl mx-auto px-4">
            Expand your skills with our trusted platform, chosen by millions worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <button
              onClick={handleGetConnected} // Attach the click handler
              className="bg-blue-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-md hover:bg-blue-700 transition-colors glow-effect text-sm sm:text-base font-medium">
              Get Connected
            </button>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {[
            {
              icon: <Users className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-blue-500" />,
              title: "Global Community",
              description: "Join millions of learners worldwide",
            },
            {
              icon: <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-blue-500" />,
              title: "Expert-Led Content",
              description: "Learn from industry professionals",
            },
            {
              icon: <Award className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-blue-500" />,
              title: "Verified Skills",
              description: "Earn recognized certifications",
            },
          ].map((feature, index) => (
            <div key={index} className="stats-card p-4 sm:p-6">
              <div className="mb-3 sm:mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
