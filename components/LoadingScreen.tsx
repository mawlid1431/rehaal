import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
    onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => onLoadingComplete(), 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [onLoadingComplete]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#d8a728] via-[#c99821] to-[#b88a1d]"
            >
                <div className="flex flex-col items-center justify-center space-y-8 px-4">
                    {/* Logo with animation */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.43, 0.13, 0.23, 0.96],
                        }}
                        className="relative"
                    >
                        <motion.img
                            src="/Assents/Logos/Lighmode_on.png"
                            alt="Rehaal Travel"
                            className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl"
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        {/* Glow effect */}
                        <motion.div
                            className="absolute inset-0 bg-white/20 rounded-full blur-3xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </motion.div>

                    {/* Slogan */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-center space-y-2"
                    >
                        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                            Rehaal Travel
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 font-light tracking-wide">
                            Your Gateway to Luxury Umrah & Travel Experiences
                        </p>
                    </motion.div>

                    {/* Progress bar */}
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "100%", opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="w-64 md:w-80"
                    >
                        <div className="h-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
                            <motion.div
                                className="h-full bg-white rounded-full shadow-lg"
                                initial={{ width: "0%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="text-center text-white/80 text-sm mt-3 font-light"
                        >
                            {progress < 100 ? 'Loading your journey...' : 'Welcome!'}
                        </motion.p>
                    </motion.div>

                    {/* Decorative elements */}
                    <motion.div
                        className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"
                        animate={{
                            scale: [1.5, 1, 1.5],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1.5,
                        }}
                    />
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
