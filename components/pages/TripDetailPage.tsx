import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, MapPin, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { useLanguage } from '../../lib/contexts';
import { trips } from '../../lib/data';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface TripDetailPageProps {
  tripId: number;
  onNavigate: (page: string) => void;
}

export const TripDetailPage: React.FC<TripDetailPageProps> = ({ tripId, onNavigate }) => {
  const { t } = useLanguage();
  const trip = trips.find((t) => t.id === tripId);

  if (!trip) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Trip not found</h2>
          <Button onClick={() => onNavigate('trips')}>Back to Trips</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Back Button */}
      <div className="bg-background border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('trips')}
            className="flex items-center text-[rgb(216,167,40)] hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('backToTrips')}
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <section className="relative h-96">
        <ImageWithFallback
          src={trip.image}
          alt={trip.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl text-white mb-4"
            >
              {trip.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-[rgb(216,167,40)] text-white px-6 py-3 rounded-full text-xl"
            >
              {trip.price}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trip Details */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h2 className="text-2xl mb-4">About This Package</h2>
                <p className="text-muted-foreground leading-relaxed">{trip.description}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="text-2xl mb-4">What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trip.includes.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-[rgb(216,167,40)] mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 60, scale: 0.8, rotateY: 20 }}
                animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
                transition={{
                  duration: 1.2,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(216, 167, 40, 0.3)",
                  transition: { duration: 0.5, ease: "easeOut" }
                }}
                className="relative bg-gradient-to-br from-card via-card to-card/80 p-8 rounded-2xl shadow-xl border-2 border-[rgb(216,167,40)]/20 hover:border-[rgb(216,167,40)]/60 transition-all overflow-hidden group sticky top-24"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[rgb(216,167,40)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-[rgb(216,167,40)]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10">
                  <h3 className="text-xl mb-6">Trip Information</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-[rgb(216,167,40)] mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Destination</p>
                        <p>{trip.destination}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-[rgb(216,167,40)] mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Dates</p>
                        <p>{trip.dates}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-[rgb(216,167,40)] mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p>{trip.duration}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-muted-foreground">Price per person</span>
                      <span className="text-2xl text-[rgb(216,167,40)]">{trip.price}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full mb-3"
                    style={{ backgroundColor: 'rgb(216, 167, 40)' }}
                    onClick={() => onNavigate('booking', tripId)}
                  >
                    Book This Trip
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-[rgb(216,167,40)] text-[rgb(216,167,40)]"
                    onClick={() => onNavigate('contact')}
                  >
                    Request More Info
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
