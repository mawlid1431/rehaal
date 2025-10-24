import React from 'react';
import { motion } from 'framer-motion';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { aboutCards } from '../../lib/data';
import { useLanguage } from '../../lib/contexts';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/Assents/main/about_1.jpg)'
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center text-white z-10"
        >
          <h1 className="text-4xl md:text-5xl mb-4 text-white">About Rehaal Travels</h1>
          <div className="w-24 h-1 bg-[rgb(216,167,40)] mx-auto" />
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Rehaal Travels is a trusted Muslim-owned travel agency dedicated to organizing spiritually enriching Umrah and Hajj journeys. Founded with sincerity and guided by Islamic values, we provide a seamless experience that combines faith, comfort, and community.
              </p>
              <p className="text-muted-foreground mb-4">
                Our experienced team has decades of expertise in da'wah and Islamic travel coordination, having guided hundreds of pilgrims to Makkah and Madinah. We've had the honor of facilitating sacred journeys, each one treated with the utmost care and dedication.
              </p>
              <p className="text-muted-foreground">
                From your first inquiry until your return home, we ensure that every step of your pilgrimage is smooth, authentic, and spiritually fulfilling. Through compassion and excellence, we aim to build a travel community where Muslims feel supported, guided, and spiritually inspired throughout their sacred journey.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-96 rounded-xl overflow-hidden shadow-2xl"
            >
              <ImageWithFallback
                src="/Assents/main/about-2.jpg"
                alt="About Rehaal"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl mb-4">Our Vision & Mission</h2>
            <div className="w-24 h-1 bg-[rgb(216,167,40)] mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative bg-gradient-to-br from-card via-card to-[rgb(216,167,40)]/5 p-10 rounded-2xl shadow-2xl border-2 border-[rgb(216,167,40)]/40 overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[rgb(216,167,40)] to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-[rgb(216,167,40)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <h3 className="text-3xl mb-5 text-[rgb(216,167,40)] font-bold relative z-10">{t('ourPromise')}</h3>
              <p className="text-muted-foreground leading-relaxed text-base relative z-10">
                {t('ourPromiseDesc')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative bg-gradient-to-br from-card via-card to-[rgb(216,167,40)]/5 p-10 rounded-2xl shadow-2xl border-2 border-[rgb(216,167,40)]/40 overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[rgb(216,167,40)] to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-bl from-[rgb(216,167,40)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <h3 className="text-3xl mb-5 text-[rgb(216,167,40)] font-bold relative z-10">{t('ourMission')}</h3>
              <p className="text-muted-foreground leading-relaxed text-base relative z-10">
                {t('ourMissionDesc')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Core Values */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl mb-4">Our Core Values</h2>
            <div className="w-24 h-1 bg-[rgb(216,167,40)] mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aboutCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative bg-gradient-to-br from-card via-card to-card/80 p-8 rounded-2xl shadow-xl text-center border-2 border-[rgb(216,167,40)]/20 hover:border-[rgb(216,167,40)]/60 transition-all overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[rgb(216,167,40)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="text-5xl mb-4 relative z-10">{card.icon}</div>
                <h3 className="mb-3 text-lg font-semibold relative z-10">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed relative z-10">{card.description}</p>
                <div className="absolute top-0 right-0 w-20 h-20 bg-[rgb(216,167,40)]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl mb-4">Why Choose Rehaal Travels?</h2>
            <div className="w-24 h-1 bg-[rgb(216,167,40)] mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Decades of Experience',
                description: 'Our team has decades of expertise in da\'wah and Islamic travel coordination, having guided hundreds of pilgrims to Makkah and Madinah.'
              },
              {
                title: 'Danish-Speaking Leaders',
                description: 'Travel with experienced Danish-speaking leaders who are knowledgeable in Islamic teachings and have guided many Umrah/Hajj groups.'
              },
              {
                title: 'Exclusive Umrah Seminars',
                description: 'Pre-departure seminars explaining how to perform Umrah correctly, what to expect, and practical travel tips for pilgrims.'
              },
              {
                title: 'Luxury Accommodation',
                description: '4-5 star hotels within walking distance of the Haram in Makkah and Madinah, designed to let you focus on worship.'
              },
              {
                title: 'Seerah Educational Tours',
                description: 'Guided visits to historical Islamic sites in Makkah and Madinah with reminders and reflections to deepen your spiritual connection.'
              },
              {
                title: 'Flexible Payment Plans',
                description: 'We offer installment payment options with transparent pricing, making your spiritual journey accessible and affordable.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, scale: 0.8, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 1.2,
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{
                  y: -15,
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(216, 167, 40, 0.3)",
                  transition: { duration: 0.5, ease: "easeOut" }
                }}
                className="relative bg-gradient-to-br from-card via-card to-card/80 p-8 rounded-2xl shadow-xl border-2 border-[rgb(216,167,40)]/20 hover:border-[rgb(216,167,40)]/60 transition-all overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[rgb(216,167,40)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h4 className="mb-4 text-xl text-[rgb(216,167,40)] font-bold relative z-10">{item.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed relative z-10">{item.description}</p>
                <div className="absolute top-0 right-0 w-20 h-20 bg-[rgb(216,167,40)]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
