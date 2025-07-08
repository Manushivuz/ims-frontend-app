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
    <section className="py-12 sm:py-16 lg:py-20 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent)]" />

      {/* Content Wrapper */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold blue-gradient-text mb-3 sm:mb-4">
            Comprehensive Features
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Everything you need to run successful internship programs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="stats-card p-4 sm:p-6 lg:p-8 hover:-translate-y-1 sm:hover:-translate-y-2 transition-transform bg-gray-800 rounded-lg shadow-lg"
            >
              <div className="mb-3 sm:mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
