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
}

export const TripCard: React.FC<TripCardProps> = ({ trip, onViewDetails }) => {
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
        y: -15,
        scale: 1.03,
        boxShadow: "0 25px 50px rgba(216, 167, 40, 0.3)",
        transition: { duration: 0.5, ease: "easeOut" }
      }}
      className="relative bg-gradient-to-br from-card via-card to-card/80 rounded-2xl overflow-hidden shadow-xl border-2 border-[rgb(216,167,40)]/20 hover:border-[rgb(216,167,40)]/60 transition-all cursor-pointer group"
      onClick={() => onViewDetails(trip.id)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[rgb(216,167,40)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

      <div className="relative h-56 overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src={trip.image_url}
            alt={trip.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <motion.div
          className="absolute top-4 right-4 bg-gradient-to-r from-[rgb(216,167,40)] to-[rgb(186,137,10)] text-white px-5 py-2 rounded-full font-semibold shadow-lg"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          ${trip.price}
        </motion.div>
      </div>

      <div className="p-6 relative z-20">
        <h3 className="mb-4 text-xl font-semibold">{trip.title}</h3>

        <div className="space-y-3 mb-6">
          <motion.div
            className="flex items-center text-muted-foreground"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.3 }}
          >
            <MapPin className="w-5 h-5 mr-3 text-[rgb(216,167,40)]" />
            <span className="text-sm">{trip.destination}</span>
          </motion.div>
          <motion.div
            className="flex items-center text-muted-foreground"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Calendar className="w-5 h-5 mr-3 text-[rgb(216,167,40)]" />
            <span className="text-sm">{new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}</span>
          </motion.div>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            className="w-full font-semibold shadow-lg hover:shadow-xl"
            style={{ backgroundColor: 'rgb(216, 167, 40)' }}
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(trip.id);
            }}
          >
            View Details
          </Button>
        </motion.div>
      </div>

      <div className="absolute top-0 right-0 w-20 h-20 bg-[rgb(216,167,40)]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
    </motion.div>
  );
};
