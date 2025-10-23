import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: {
    id: number;
    name: string;
    rating: number;
    comment: string;
    date: string;
    trip: string;
  };
  delay?: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.8, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{
        y: -15,
        scale: 1.03,
        boxShadow: "0 25px 50px rgba(216, 167, 40, 0.3)",
        transition: { duration: 0.5, ease: "easeOut" }
      }}
      className="relative bg-gradient-to-br from-card via-card to-card/80 p-8 rounded-2xl shadow-xl border-2 border-[rgb(216,167,40)]/20 hover:border-[rgb(216,167,40)]/60 transition-all overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[rgb(216,167,40)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex items-center mb-5 relative z-10">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: delay + i * 0.1, type: "spring", stiffness: 200 }}
          >
            <Star
              className={`w-6 h-6 ${i < testimonial.rating
                ? 'fill-[rgb(216,167,40)] text-[rgb(216,167,40)]'
                : 'text-gray-300'
                }`}
            />
          </motion.div>
        ))}
      </div>

      <p className="text-muted-foreground mb-6 italic text-base leading-relaxed relative z-10">"{testimonial.comment}"</p>

      <div className="border-t border-[rgb(216,167,40)]/20 pt-4 relative z-10">
        <p className="text-base font-semibold">{testimonial.name}</p>
        <p className="text-sm text-muted-foreground mt-1">{testimonial.trip}</p>
        <p className="text-xs text-[rgb(216,167,40)] mt-2">{testimonial.date}</p>
      </div>

      <div className="absolute top-0 right-0 w-20 h-20 bg-[rgb(216,167,40)]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
    </motion.div>
  );
};
