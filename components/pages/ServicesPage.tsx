import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Hotel, FileCheck, Bus, MapPin, BookOpen, GraduationCap, HeadphonesIcon, CreditCard, Users, Shield, Clock } from 'lucide-react';
import { Button } from '../ui/button';

interface ServicesPageProps {
    onNavigate: (page: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
    const services = [
        {
            icon: <Plane className="w-8 h-8" />,
            title: 'Flight Booking',
            description: 'Complete flight arrangements from Denmark to Saudi Arabia with trusted airlines. We handle all booking details to ensure comfortable and convenient travel for your sacred journey.'
        },
        {
            icon: <Hotel className="w-8 h-8" />,
            title: '4-5 Star Hotels',
            description: 'Luxury accommodation close to Haram in Makkah and Madinah. Stay in premium hotels within walking distance of the holy sites, allowing you to focus on worship without logistical concerns.'
        },
        {
            icon: <FileCheck className="w-8 h-8" />,
            title: 'Visa Issuance',
            description: 'Seamless visa processing and arrangements. We handle all visa formalities and documentation, making the process hassle-free so you can prepare spiritually for your journey.'
        },
        {
            icon: <Bus className="w-8 h-8" />,
            title: 'Ground Transport',
            description: 'Comfortable local transportation throughout your journey. Air-conditioned buses and vehicles for all transfers between airports, hotels, and holy sites.'
        },
        {
            icon: <MapPin className="w-8 h-8" />,
            title: 'Seerah Tours',
            description: 'Guided visits to historical and religious sites in Makkah and Madinah. Learn about Islamic history while visiting significant locations from the life of Prophet Muhammad (PBUH).'
        },
        {
            icon: <BookOpen className="w-8 h-8" />,
            title: 'Spiritual Guidance',
            description: 'Exclusive Umrah preparation seminars and learning sessions. Our knowledgeable guides provide religious insights and support throughout your sacred journey.'
        },
        {
            icon: <GraduationCap className="w-8 h-8" />,
            title: 'Educational Sessions',
            description: 'Pre-departure seminars to prepare you spiritually and practically. Learn the correct way to perform Umrah rituals, what to expect, and essential travel tips.'
        },
        {
            icon: <HeadphonesIcon className="w-8 h-8" />,
            title: '24/7 Support',
            description: 'On-ground assistance from Danish and Arabic-speaking leaders. Round-the-clock support during your journey so you can focus on your spiritual experience with peace of mind.'
        },
        {
            icon: <CreditCard className="w-8 h-8" />,
            title: 'Flexible Payment Plans',
            description: 'Affordable installment options with transparent pricing. We offer flexible payment plans to make your spiritual journey accessible without financial stress.'
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: 'Group Coordination',
            description: 'Travel with a supportive, faith-driven community. We create a family-like atmosphere where travelers support and uplift one another throughout the journey.'
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: 'Halal Guarantee',
            description: 'All services operate in accordance with Islamic principles. We ensure halal practices throughout the journey, from food to accommodations and activities.'
        },
        {
            icon: <Clock className="w-8 h-8" />,
            title: 'Complete Travel Management',
            description: 'End-to-end service from inquiry to return. We handle every detail of your pilgrimage, ensuring a smooth, authentic, and spiritually fulfilling experience.'
        }
    ];

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative h-96 flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=2071)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
                <div className="absolute inset-0 bg-black/60" />
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative text-center text-white z-10 px-4"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 text-white font-bold">Our Services</h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                        Complete Umrah & Hajj Travel Solutions
                    </p>
                    <div className="w-32 h-1 bg-[rgb(216,167,40)] mx-auto mt-6" />
                </motion.div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl mb-4">What We Offer</h2>
                        <div className="w-24 h-1 bg-[rgb(216,167,40)] mx-auto mb-6" />
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            From your first inquiry until your return home, we ensure that every step of your pilgrimage is smooth, authentic, and spiritually fulfilling.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 60, scale: 0.8, rotateX: -15 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    duration: 1.2,
                                    delay: index * 0.1,
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
                                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[rgb(216,167,40)]/20 to-[rgb(186,137,10)]/10 text-[rgb(216,167,40)] mb-6 relative z-10"
                                    whileHover={{ scale: 1.2, rotate: 360 }}
                                    transition={{ duration: 0.8, type: "spring", stiffness: 150 }}
                                >
                                    {service.icon}
                                </motion.div>

                                <h3 className="text-xl mb-4 font-bold relative z-10">{service.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                                    {service.description}
                                </p>

                                <div className="absolute top-0 right-0 w-20 h-20 bg-[rgb(216,167,40)]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1720549973451-018d3623b55a?q=80&w=2071)',
                        }}
                    />
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl mb-6 font-bold bg-gradient-to-r from-[rgb(216,167,40)] via-[rgb(255,200,87)] to-[rgb(216,167,40)] bg-clip-text text-transparent">
                            Don't Miss This Opportunity
                        </h2>
                        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[rgb(216,167,40)] to-transparent mx-auto mb-8" />

                        <p className="text-xl md:text-2xl mb-8 text-white leading-relaxed">
                            Start Your Spiritual Journey Today
                        </p>
                        <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
                            Every moment is precious. Let us help you fulfill your dream of visiting the House of Allah with comfort, guidance, and peace of mind.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    size="lg"
                                    className="text-lg px-12 py-8 text-white font-semibold shadow-2xl hover:shadow-[rgb(216,167,40)]/50 transition-all"
                                    style={{ backgroundColor: 'rgb(216, 167, 40)' }}
                                    onClick={() => onNavigate('trips')}
                                >
                                    View Our Packages →
                                </Button>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="text-lg px-12 py-8 border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all"
                                    onClick={() => onNavigate('contact')}
                                >
                                    Contact Us Today
                                </Button>
                            </motion.div>
                        </div>

                        <p className="text-sm text-[rgb(216,167,40)] mt-8 font-semibold">
                            ✓ Flexible Payment Plans  •  ✓ Expert Guidance  •  ✓ Complete Support
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};
