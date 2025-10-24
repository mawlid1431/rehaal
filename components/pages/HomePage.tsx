import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSection } from '../HeroSection';
import { TripCard } from '../TripCard';
import { TestimonialCard } from '../TestimonialCard';
import { Button } from '../ui/button';
import { useLanguage } from '../../lib/contexts';
import { servicesApi, tripsApi, testimonialsApi } from '../../lib/api';
import { useState, useEffect } from 'react';

interface HomePageProps {
  onNavigate: (page: string, id?: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [currentBgSlide, setCurrentBgSlide] = React.useState(0);
  const [aboutCards, setAboutCards] = useState<any[]>([]);
  const [trips, setTrips] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const motivationalBackgrounds = [
    'https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=2071',
    'https://images.unsplash.com/photo-1720549973451-018d3623b55a?q=80&w=2071',
    'https://images.unsplash.com/photo-1733895422344-672960e0de80?q=80&w=2071',
    'https://images.unsplash.com/photo-1759994976016-cd0799b2f480?q=80&w=2071'
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgSlide((prev) => (prev + 1) % motivationalBackgrounds.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesData, tripsData, testimonialsData] = await Promise.all([
        servicesApi.getAll(),
        tripsApi.getAll(),
        testimonialsApi.getAll()
      ]);
      setAboutCards(servicesData);
      setTrips(tripsData.filter((trip: any) => trip.is_active));
      setTestimonials(testimonialsData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToTrips = () => {
    const element = document.getElementById('trips-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection onBookJourney={scrollToTrips} />

      {/* About Rehaal Rejser Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl mb-4">{t('welcomeTitle')}</h2>
            <div className="w-24 h-1 bg-[rgb(216,167,40)] mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('welcomeDesc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {loading ? (
              <div className="col-span-3 text-center py-8">Loading services...</div>
            ) : (
              aboutCards.slice(0, 3).map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 60, scale: 0.8, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 1.2,
                    delay: index * 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{
                    y: -15,
                    scale: 1.05,
                    boxShadow: "0 25px 50px rgba(216, 167, 40, 0.3)",
                    transition: { duration: 0.5, ease: "easeOut" }
                  }}
                  className="relative bg-gradient-to-br from-card via-card to-card/80 p-8 rounded-2xl shadow-xl text-center border-2 border-[rgb(216,167,40)]/20 hover:border-[rgb(216,167,40)]/60 transition-all overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgb(216,167,40)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div
                    className="text-5xl mb-4 relative z-10"
                    whileHover={{ scale: 1.3, rotate: 360 }}
                    transition={{ duration: 1, type: "spring", stiffness: 150 }}
                  >
                    {card.icon}
                  </motion.div>
                  <h3 className="mb-3 text-lg font-semibold relative z-10">{card.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed relative z-10">{card.description}</p>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[rgb(216,167,40)]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                </motion.div>
              ))
            )}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => onNavigate('about')}
              className="border-[rgb(216,167,40)] text-[rgb(216,167,40)] hover:bg-[rgb(216,167,40)] hover:text-white"
            >
              {t('viewMore')}
            </Button>
          </div>
        </div>
      </section>

      {/* Our Services Preview Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl mb-4">Our Services</h2>
            <div className="w-24 h-1 bg-[rgb(216,167,40)] mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('completePackageDesc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[
              { icon: '✈️', titleKey: 'flights', descKey: 'flightsDesc' },
              { icon: '🏨', titleKey: 'luxuryHotels', descKey: 'luxuryHotelsDesc' },
              { icon: '🛂', titleKey: 'visaProcessing', descKey: 'visaProcessingDesc' },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, scale: 0.8, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 1.2,
                  delay: index * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{
                  y: -15,
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(216, 167, 40, 0.3)",
                  transition: { duration: 0.5, ease: "easeOut" }
                }}
                className="relative bg-gradient-to-br from-card via-card to-card/80 p-8 rounded-2xl shadow-xl text-center border-2 border-[rgb(216,167,40)]/20 hover:border-[rgb(216,167,40)]/60 transition-all overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[rgb(216,167,40)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div
                  className="text-6xl mb-5 relative z-10 filter drop-shadow-lg"
                  whileHover={{ scale: 1.3, rotate: 360 }}
                  transition={{ duration: 1, type: "spring", stiffness: 150 }}
                >
                  {service.icon}
                </motion.div>
                <h4 className="mb-3 font-bold text-xl relative z-10">{t(service.titleKey)}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{t(service.descKey)}</p>
                <div className="absolute top-0 right-0 w-20 h-20 bg-[rgb(216,167,40)]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => onNavigate('services')}
              className="border-[rgb(216,167,40)] text-[rgb(216,167,40)] hover:bg-[rgb(216,167,40)] hover:text-white"
            >
              {t('viewMore')}
            </Button>
          </div>
        </div>
      </section>

      {/* Trips Preview Section */}
      <section id="trips-section" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl mb-4">{t('tripsPreviewTitle')}</h2>
            <div className="w-24 h-1 bg-[rgb(216,167,40)] mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {loading ? (
              <div className="col-span-3 text-center py-8">Loading trips...</div>
            ) : trips.length === 0 ? (
              <div className="col-span-3 text-center py-8">No trips available at the moment.</div>
            ) : (
              trips.slice(0, 3).map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onViewDetails={(id) => onNavigate('trip-detail', id)}
                />
              ))
            )}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => onNavigate('trips')}
              className="border-[rgb(216,167,40)] text-[rgb(216,167,40)] hover:bg-[rgb(216,167,40)] hover:text-white"
            >
              {t('viewMore')}
            </Button>
          </div>
        </div>
      </section>

      {/* Why Rehaal Rejser - Statistics Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl mb-4">{t('whyChooseTitle')}</h2>
            <div className="w-24 h-1 bg-[rgb(216,167,40)] mx-auto mb-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -80, scale: 0.8, rotateY: -30 }}
              whileInView={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 30px 60px rgba(216, 167, 40, 0.3)",
                transition: { duration: 0.6, ease: "easeOut" }
              }}
              className="relative bg-gradient-to-br from-card via-card to-[rgb(216,167,40)]/5 p-10 rounded-2xl shadow-2xl border-2 border-[rgb(216,167,40)]/40 hover:border-[rgb(216,167,40)] transition-all overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[rgb(216,167,40)] to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-[rgb(216,167,40)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <motion.h3
                className="text-3xl mb-5 text-[rgb(216,167,40)] font-bold relative z-10"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                {t('ourMission')}
              </motion.h3>
              <p className="text-muted-foreground leading-relaxed text-base relative z-10">
                {t('ourMissionDesc')}
              </p>
              <motion.div
                className="absolute -top-20 -left-20 w-40 h-40 bg-[rgb(216,167,40)]/20 rounded-full blur-3xl"
                animate={{ scale: [1, 1.3, 1], x: [0, 20, 0], y: [0, 20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80, scale: 0.8, rotateY: 30 }}
              whileInView={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 30px 60px rgba(216, 167, 40, 0.3)",
                transition: { duration: 0.6, ease: "easeOut" }
              }}
              className="relative bg-gradient-to-br from-card via-card to-[rgb(216,167,40)]/5 p-10 rounded-2xl shadow-2xl border-2 border-[rgb(216,167,40)]/40 hover:border-[rgb(216,167,40)] transition-all overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[rgb(216,167,40)] to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-bl from-[rgb(216,167,40)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <motion.h3
                className="text-3xl mb-5 text-[rgb(216,167,40)] font-bold relative z-10"
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                {t('ourPromise')}
              </motion.h3>
              <p className="text-muted-foreground leading-relaxed text-base relative z-10">
                {t('ourPromiseDesc')}
              </p>
              <motion.div
                className="absolute -bottom-20 -right-20 w-40 h-40 bg-[rgb(216,167,40)]/20 rounded-full blur-3xl"
                animate={{ scale: [1, 1.3, 1], x: [0, -20, 0], y: [0, -20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { number: '500+', labelKey: 'satisfiedPilgrims', icon: '👥' },
              { number: '15+', labelKey: 'yearsExperience', icon: '⭐' },
              { number: '100%', labelKey: 'halalGuarantee', icon: '✅' },
              { number: '24/7', labelKey: 'supportDuringTrip', icon: '🤝' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, scale: 0.6, rotateX: -30 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 1.2,
                  delay: index * 0.2,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
                whileHover={{
                  y: -15,
                  scale: 1.12,
                  boxShadow: "0 25px 50px rgba(216, 167, 40, 0.4)",
                  transition: { duration: 0.6, type: "spring", stiffness: 250 }
                }}
                className="relative bg-gradient-to-br from-[rgb(216,167,40)]/10 via-card to-card p-8 rounded-2xl shadow-xl hover:shadow-2xl text-center border-2 border-[rgb(216,167,40)]/50 hover:border-[rgb(216,167,40)] transition-all overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[rgb(216,167,40)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div
                  className="text-4xl mb-3 relative z-10 filter drop-shadow-lg"
                  whileHover={{ scale: 1.5, rotate: 360 }}
                  transition={{ duration: 1, type: "spring", stiffness: 150 }}
                >
                  {stat.icon}
                </motion.div>
                <motion.div
                  className="text-4xl mb-3 font-extrabold relative z-10 bg-gradient-to-r from-[rgb(216,167,40)] to-[rgb(186,137,10)] bg-clip-text text-transparent"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: index * 0.2 + 0.6, type: "spring", stiffness: 120 }}
                >
                  {stat.number}
                </motion.div>
                <p className="text-muted-foreground">{t(stat.labelKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Preview Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl mb-4">{t('testimonialsPreviewTitle')}</h2>
            <div className="w-24 h-1 bg-[rgb(216,167,40)] mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {loading ? (
              <div className="col-span-3 text-center py-8">Loading testimonials...</div>
            ) : testimonials.length === 0 ? (
              <div className="col-span-3 text-center py-8">No testimonials available yet.</div>
            ) : (
              testimonials.slice(0, 3).map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  delay={index * 0.1}
                />
              ))
            )}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => onNavigate('testimonials')}
              className="border-[rgb(216,167,40)] text-[rgb(216,167,40)] hover:bg-[rgb(216,167,40)] hover:text-white"
            >
              {t('viewMore')}
            </Button>
          </div>
        </div>
      </section>

      {/* Motivational Call to Action Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBgSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-in-out scale-105"
              style={{
                backgroundImage: `url(${motivationalBackgrounds[currentBgSlide]})`,
              }}
            />
          </motion.div>
        </AnimatePresence>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight font-bold bg-gradient-to-r from-[rgb(216,167,40)] via-[rgb(255,200,87)] to-[rgb(216,167,40)] bg-clip-text text-transparent">
              {t('spiritualJourneyWaits')}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[rgb(216,167,40)] to-transparent mx-auto mb-8" />

            <p className="text-xl md:text-2xl mb-6 text-white leading-relaxed font-medium">
              {t('quranVerse')}
            </p>
            <p className="text-lg text-[rgb(216,167,40)] mb-10 italic font-semibold">
              {t('quranReference')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-[rgb(216,167,40)]/20 to-[rgb(186,137,10)]/10 backdrop-blur-sm p-6 rounded-xl border-2 border-[rgb(216,167,40)]/40 hover:border-[rgb(216,167,40)] transition-all"
              >
                <div className="text-5xl mb-3">🕋</div>
                <h3 className="text-xl mb-2 text-[rgb(216,167,40)] font-bold">{t('umrahAllYear')}</h3>
                <p className="text-white">{t('umrahAllYearDesc')}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-[rgb(216,167,40)]/20 to-[rgb(186,137,10)]/10 backdrop-blur-sm p-6 rounded-xl border-2 border-[rgb(216,167,40)]/40 hover:border-[rgb(216,167,40)] transition-all"
              >
                <div className="text-5xl mb-3">🌙</div>
                <h3 className="text-xl mb-2 text-[rgb(216,167,40)] font-bold">{t('ramadanSpecials')}</h3>
                <p className="text-white">{t('ramadanSpecialsDesc')}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-[rgb(216,167,40)]/20 to-[rgb(186,137,10)]/10 backdrop-blur-sm p-6 rounded-xl border-2 border-[rgb(216,167,40)]/40 hover:border-[rgb(216,167,40)] transition-all"
              >
                <div className="text-5xl mb-3">👨‍👩‍👧‍👦</div>
                <h3 className="text-xl mb-2 text-[rgb(216,167,40)] font-bold">{t('familyPackages')}</h3>
                <p className="text-white">{t('familyPackagesDesc')}</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <p className="text-2xl md:text-3xl mb-8 text-[rgb(216,167,40)] font-extrabold">
                {t('dontPostpone')}
              </p>
              <p className="text-lg text-white mb-8 max-w-3xl mx-auto font-medium">
                {t('motivationText')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="text-lg px-10 py-7 text-white font-semibold shadow-2xl hover:shadow-[rgb(216,167,40)]/50 transition-all"
                  style={{ backgroundColor: 'rgb(216, 167, 40)' }}
                  onClick={() => onNavigate('trips')}
                >
                  {t('seeAllTrips')}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-7 border-2 border-white text-white hover:bg-white hover:text-gray-900"
                  onClick={() => onNavigate('contact')}
                >
                  {t('contactUsNow')}
                </Button>
              </div>

              <p className="text-sm text-[rgb(216,167,40)] mt-6 font-semibold">
                ✓ {t('flexiblePayment')}  •  ✓ {t('earlyBooking')}  •  ✓ {t('groupDiscounts')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl mb-4">📞</div>
              <h3 className="text-xl mb-2">{t('callUs')}</h3>
              <p className="text-muted-foreground mb-3">{t('callUsDesc')}</p>
              <Button
                variant="link"
                className="text-[rgb(216,167,40)]"
                onClick={() => onNavigate('contact')}
              >
                {t('seeContactInfo')}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-5xl mb-4">❓</div>
              <h3 className="text-xl mb-2">{t('faqTitle')}</h3>
              <p className="text-muted-foreground mb-3">{t('faqDesc')}</p>
              <Button
                variant="link"
                className="text-[rgb(216,167,40)]"
                onClick={() => onNavigate('faq')}
              >
                {t('readFaq')}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-5xl mb-4">📸</div>
              <h3 className="text-xl mb-2">{t('galleryTitle')}</h3>
              <p className="text-muted-foreground mb-3">{t('galleryDesc')}</p>
              <Button
                variant="link"
                className="text-[rgb(216,167,40)]"
                onClick={() => onNavigate('gallery')}
              >
                {t('visitGallery')}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
