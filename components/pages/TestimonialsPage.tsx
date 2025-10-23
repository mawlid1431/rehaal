import React from 'react';
import { motion } from 'framer-motion';
import { TestimonialCard } from '../TestimonialCard';
import { testimonials } from '../../lib/data';

export const TestimonialsPage: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1759994976016-cd0799b2f480?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bXJhaCUyMHBpbGdyaW1hZ2UlMjB0cmF2ZWx8ZW58MXx8fHwxNzYxMjQwMzExfDA&ixlib=rb-4.1.0&q=80&w=1080)'
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center text-white z-10"
        >
          <h1 className="text-4xl md:text-5xl mb-4 text-white">Testimonials</h1>
          <p className="text-xl text-white/90">Hear from our satisfied travelers</p>
        </motion.div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[rgb(216,167,40)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl mb-4 text-white">Ready to Start Your Journey?</h2>
            <p className="text-white/90 mb-6 text-lg">
              Join thousands of satisfied pilgrims who have experienced the journey of a lifetime with Rehaal Travel.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
