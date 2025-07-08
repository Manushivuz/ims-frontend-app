import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      company: 'TechCorp',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=50&h=50&fit=crop',
      quote: 'IISPPR has transformed how we manage our intern program. The platform is intuitive and powerful.',
      author: 'Bhaskar',
      role: 'HR Director'
    },
    {
      company: 'InnovateHub',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=50&h=50&fit=crop',
      quote: 'The analytics and tracking features have helped us improve our internship program significantly.',
      author: 'Shivam',
      role: 'Technical Lead'
    },
    {
      company: 'Future Labs',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=50&h=50&fit=crop',
      quote: "Best investment we've made for our internship program. The results speak for themselves.",
      author: 'Viral',
      role: 'Program Manager'
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent)]" />
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold blue-gradient-text mb-3 sm:mb-4">
            Trusted by Leading Companies
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            See what our partners say about their experience
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="stats-card p-4 sm:p-6 lg:p-8 hover:-translate-y-1 sm:hover:-translate-y-2 transition-transform"
            >
              <div className="flex items-center mb-4 sm:mb-6">
                <img
                  src={testimonial.logo}
                  alt={testimonial.company}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4"
                />
                <div>
                  <h3 className="font-semibold text-white text-sm sm:text-base">{testimonial.company}</h3>
                </div>
              </div>
              <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">"{testimonial.quote}"</p>
              <div className="border-t border-gray-800 pt-3 sm:pt-4">
                <p className="font-semibold text-white text-sm sm:text-base">{testimonial.author}</p>
                <p className="text-gray-400 text-xs sm:text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Testimonials;