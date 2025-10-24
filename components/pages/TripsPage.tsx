import React from 'react';
import { motion } from 'framer-motion';
import { TripCard } from '../TripCard';
import { tripsApi } from '../../lib/api';
import { useState, useEffect } from 'react';

interface TripsPageProps {
  onNavigate: (page: string, id?: number) => void;
}

export const TripsPage: React.FC<TripsPageProps> = ({ onNavigate }) => {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const data = await tripsApi.getAll();
      setTrips(data.filter((trip: any) => trip.is_active));
    } catch (error) {
      console.error('Failed to fetch trips:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1720549973451-018d3623b55a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtrYWglMjBrYWFiYSUyMG1vc3F1ZXxlbnwxfHx8fDE3NjEyNDAzMDl8MA&ixlib=rb-4.1.0&q=80&w=1080)'
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center text-white z-10"
        >
          <h1 className="text-4xl md:text-5xl mb-4 text-white">Our Umrah Packages</h1>
          <p className="text-xl text-white/90">Choose the perfect journey for your spiritual needs</p>
        </motion.div>
      </section>

      {/* Trips Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-3 text-center py-12">Loading trips...</div>
            ) : trips.length === 0 ? (
              <div className="col-span-3 text-center py-12">No trips available at the moment.</div>
            ) : (
              trips.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <TripCard
                    trip={trip}
                    onViewDetails={(id) => onNavigate('trip-detail', id)}
                  />
                </motion.div>
              ))
            )}
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
            <h2 className="text-3xl mb-4 text-white">Can't Find What You're Looking For?</h2>
            <p className="text-white/90 mb-6">
              We offer customized packages tailored to your specific needs. Contact us to discuss your requirements.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white dark:bg-gray-900 text-[rgb(216,167,40)] px-8 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-semibold shadow-lg"
            >
              Contact Us
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
