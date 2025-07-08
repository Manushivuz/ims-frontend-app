import React from 'react';
import { ClipboardCheck, Clock, Users2, BarChart2, Shield, MessageSquare } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <ClipboardCheck className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />,
      title: 'Task Management',
      description: 'Assign and track intern tasks with ease.'
    },
    {
      icon: <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />,
      title: 'Time Tracking',
      description: 'Monitor attendance and work hours automatically.'
    },
    {
      icon: <Users2 className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />,
      title: 'Team Collaboration',
      description: 'Foster communication between mentors and interns.'
    },
    {
      icon: <BarChart2 className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />,
      title: 'Analytics Dashboard',
      description: 'Comprehensive insights and performance metrics.'
    },
    {
      icon: <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />,
      title: 'Compliance Management',
      description: 'Ensure regulatory compliance and documentation.'
    },
    {
      icon: <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />,
      title: 'Feedback System',
      description: 'Facilitate regular feedback and evaluation.'
    }
  ];

  return (
    <div className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Comprehensive Features
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to run successful internship programs.
          </p>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-sm p-4 sm:p-6"
            >
              <div className="text-3xl sm:text-4xl text-blue-600 mb-3 sm:mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
