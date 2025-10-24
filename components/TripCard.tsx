import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TripCardProps {
  trip: {
    id: string;
    title: string;
    destination: string;
    start_date: string;
    end_date: string;
    duration: string;
    price: number;
    image_url: string;
  };
  onViewDetails: (id: string) => void;
  isPast?: boolean;
}

export const TripCard: React.FC<TripCardProps> = ({ trip, onViewDetails, isPast = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.8, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(216, 167, 40, 0.25)",
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      className="relative bg-gradient-to-br from-card via-card to-card/80 rounded-xl overflow-hidden shadow-lg border-2 border-[rgb(216,167,40)]/20 hover:border-[rgb(216,167,40)]/60 transition-all cursor-pointer group"
      onClick={() => onViewDetails(trip.id)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[rgb(216,167,40)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

      <div className="relative h-36 sm:h-40 overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src={trip.image_url}
            alt={trip.title}
            className={`w-full h-full object-cover ${isPast ? 'grayscale opacity-70' : ''}`}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        {isPast && (
          <div className="absolute top-2 left-2 bg-gray-600 text-white px-2 py-1 rounded-full text-[10px] font-semibold shadow-lg">
            Ended
          </div>
        )}
        <motion.div
          className={`absolute top-2 right-2 ${isPast ? 'bg-gray-500' : 'bg-gradient-to-r from-[rgb(216,167,40)] to-[rgb(186,137,10)]'} text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-lg`}
          whileHover={{ scale: 1.08, rotate: 3 }}
          transition={{ duration: 0.3 }}
        >
          ${trip.price}
        </motion.div>
      </div>

      <div className="p-3 sm:p-4 relative z-20">
        <h3 className="mb-2 text-sm sm:text-base font-semibold line-clamp-1">{trip.title}</h3>

        <div className="space-y-1.5 mb-3">
          <motion.div
            className="flex items-center text-muted-foreground"
            whileHover={{ x: 3 }}
            transition={{ duration: 0.3 }}
          >
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-[rgb(216,167,40)] flex-shrink-0" />
            <span className="text-xs line-clamp-1">{trip.destination}</span>
          </motion.div>
          <motion.div
            className="flex items-center text-muted-foreground"
            whileHover={{ x: 3 }}
            transition={{ duration: 0.3 }}
          >
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-[rgb(216,167,40)] flex-shrink-0" />
            <span className="text-xs line-clamp-1">
              {new Date(trip.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(trip.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </motion.div>
        </div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            className="w-full font-semibold shadow-md hover:shadow-lg text-xs sm:text-sm py-2"
            style={{ backgroundColor: isPast ? 'rgb(107, 114, 128)' : 'rgb(216, 167, 40)' }}
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(trip.id);
            }}
          >
            View Details
          </Button>
        </motion.div>
      </div>

      <div className="absolute top-0 right-0 w-16 h-16 bg-[rgb(216,167,40)]/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
    </motion.div>
  );
};
