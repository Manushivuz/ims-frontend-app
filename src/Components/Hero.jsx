import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Users, BookOpen, Award } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGetConnected = () => {
    navigate('/signup'); // Navigate to the signup route
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Welcome to IISPPR Intern Hub
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8">
              Your gateway to professional growth and development
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleGetConnected} // Attach the click handler
                className="bg-white text-blue-600 px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold hover:bg-blue-50 transition-all duration-200">
                Get Started
              </button>
              <button className="bg-transparent text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full border border-white hover:bg-white/10 transition-all duration-200">
                Learn More
              </button>
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
