import React from 'react';

const SuccessStories = () => {
  const stories = [
    {
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
      title: 'From Intern to Tech Lead',
      description: 'Our program helped viral & Shivam transform from an intern to leading a team of 20+ developers.',
      stats: { years: '2', promotion: '3x', impact: '200%' },
    },
    {
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
      title: 'Scaling New Heights',
      description: 'Bhaskar leveraged our mentorship to launch a successful startup within 18 months.',
      stats: { years: '1.5', promotion: '2x', impact: '150%' },
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent)]" />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold blue-gradient-text mb-3 sm:mb-4">Success Stories</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto px-4">Real stories from our successful interns</p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {stories.map((story, index) => (
            <div
              key={index}
              className="stats-card group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
            >
              {/* Story Image */}
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-48 sm:h-56 lg:h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 sm:p-6 lg:p-8 flex flex-col justify-end">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">{story.title}</h3>
                <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">{story.description}</p>

                {/* Story Stats */}
                <div className="flex justify-between text-white">
                  {Object.entries(story.stats).map(([key, value], idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold">{value}</div>
                      <div className="text-xs sm:text-sm text-gray-300 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
