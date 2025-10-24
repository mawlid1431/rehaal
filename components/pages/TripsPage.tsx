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
  const [activeFilter, setActiveFilter] = useState<'all' | 'upcoming' | 'past'>('all');

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

  // Categorize trips as upcoming or past
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingTrips = trips.filter(trip => {
    // Use manual category if set, otherwise auto-detect
    if (trip.category) {
      return trip.category === 'upcoming';
    }
    return new Date(trip.end_date) >= today;
  });

  const pastTrips = trips.filter(trip => {
    // Use manual category if set, otherwise auto-detect
    if (trip.category) {
      return trip.category === 'past';
    }
    return new Date(trip.end_date) < today;
  });

  // Filter trips based on active filter
  const getFilteredTrips = () => {
    if (activeFilter === 'upcoming') return upcomingTrips;
    if (activeFilter === 'past') return pastTrips;
    return trips; // 'all'
  };

  const filteredTrips = getFilteredTrips();
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
          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-3 mb-12 flex-wrap"
          >
            <motion.button
              onClick={() => setActiveFilter('all')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={
                activeFilter === 'all'
                  ? 'px-10 py-3.5 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-[rgb(216,167,40)] to-[rgb(186,137,10)] text-white shadow-xl'
                  : 'px-10 py-3.5 rounded-xl font-semibold transition-all duration-300 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-[rgb(216,167,40)] hover:shadow-lg'
              }
            >
              All Trips <span className="ml-2 opacity-75">({trips.length})</span>
            </motion.button>
            <motion.button
              onClick={() => setActiveFilter('upcoming')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={
                activeFilter === 'upcoming'
                  ? 'px-10 py-3.5 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-green-500 to-green-600 text-white shadow-xl'
                  : 'px-10 py-3.5 rounded-xl font-semibold transition-all duration-300 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-green-500 hover:shadow-lg'
              }
            >
              Upcoming <span className="ml-2 opacity-75">({upcomingTrips.length})</span>
            </motion.button>
            <motion.button
              onClick={() => setActiveFilter('past')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={
                activeFilter === 'past'
                  ? 'px-10 py-3.5 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-xl'
                  : 'px-10 py-3.5 rounded-xl font-semibold transition-all duration-300 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-gray-500 hover:shadow-lg'
              }
            >
              Past <span className="ml-2 opacity-75">({pastTrips.length})</span>
            </motion.button>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">Loading trips...</div>
          ) : filteredTrips.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No {activeFilter === 'all' ? '' : activeFilter} trips available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredTrips.map((trip, index) => {
                const isPast = trip.category ? trip.category === 'past' : new Date(trip.end_date) < today;
                return (
                  <motion.div
                    key={trip.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <TripCard
                      trip={trip}
                      onViewDetails={(id) => onNavigate('trip-detail', id)}
                      isPast={isPast}
                    />
                  </motion.div>
                );
              })}
            </div>
          )}
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
