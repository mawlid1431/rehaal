import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { useLanguage } from '../lib/contexts';
import { heroSlides } from '../lib/data';
import { TypewriterText } from './TypewriterText';

interface HeroSectionProps {
  onBookJourney: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBookJourney }) => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slogans = [
    "Your Gateway to Luxury Umrah & Travel Experiences",
    "Experience the Journey of a Lifetime",
    "Where Faith Meets Comfort and Excellence",
    "Creating Unforgettable Spiritual Memories"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-100">
      {/* Background Images Layer - Crossfade without gap */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 2,
            ease: "easeInOut"
          }}
          className="absolute inset-0"
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroSlides[currentSlide].image})`,
            }}
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{
              duration: 8,
              ease: "linear"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-7xl w-full">
          {/* Typewriter Slogans - Much Bigger */}
          <motion.div
            className="mb-16 min-h-[200px] md:min-h-[280px] lg:min-h-[320px] flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <TypewriterText
              texts={slogans}
              typingSpeed={80}
              deletingSpeed={40}
              pauseTime={2500}
              className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-black px-6 leading-tight"
              style={{
                textShadow: '3px 3px 8px rgba(255, 255, 255, 0.6), -1px -1px 4px rgba(255, 255, 255, 0.3)',
                fontFamily: '"Playfair Display", "Georgia", serif'
              }}
            />
          </motion.div>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          >
            <Button
              size="lg"
              className="text-xl px-12 py-8 font-semibold shadow-2xl hover:scale-105 transition-transform"
              style={{ backgroundColor: 'rgb(216, 167, 40)' }}
              onClick={onBookJourney}
            >
              {t('bookJourney')}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
              ? 'bg-[rgb(216,167,40)] w-8'
              : 'bg-black/50 hover:bg-black/75'
              }`}
          />
        ))}
      </div>
    </div>
  );
};
