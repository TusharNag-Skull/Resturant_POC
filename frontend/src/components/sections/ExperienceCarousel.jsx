import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const experiences = [
    {
        title: "The Dining Room",
        desc: "Where golden light meets culinary poetry",
        index: 0
    },
    {
        title: "The Wine Cellar",
        desc: "1,200 labels from the world's finest estates",
        index: 1
    },
    {
        title: "The Private Salon",
        desc: "Exclusive gatherings, flawlessly orchestrated",
        index: 2
    },
    {
        title: "The Chef's Table",
        desc: "An intimate window into our kitchen's soul",
        index: 3
    },
    {
        title: "The Garden Terrace",
        desc: "Al fresco dining under Parisian stars",
        index: 4
    }
];

const ExperienceCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % experiences.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [isHovered]);

    const handleNext = () => setCurrentIndex((prev) => (prev + 1) % experiences.length);
    const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length);

    // Helper to determine position in 3D space
    const getCardStyles = (index) => {
        const diff = (index - currentIndex + experiences.length) % experiences.length;

        // 0: center, 1: right1, 2: right2, 3: left2, 4: left1 (for 5 items)
        let translateX = 0;
        let scale = 1;
        let zIndex = 0;
        let opacity = 1;
        let rotateY = 0;

        if (diff === 0) {
            translateX = 0; scale = 1; zIndex = 30; opacity = 1; rotateY = 0;
        } else if (diff === 1) {
            translateX = '100%'; scale = 0.8; zIndex = 20; opacity = 0.6; rotateY = -15;
        } else if (diff === 2) {
            translateX = '180%'; scale = 0.6; zIndex = 10; opacity = 0.2; rotateY = -30;
        } else if (diff === 3) {
            translateX = '-180%'; scale = 0.6; zIndex = 10; opacity = 0.2; rotateY = 30;
        } else if (diff === 4) {
            translateX = '-100%'; scale = 0.8; zIndex = 20; opacity = 0.6; rotateY = 15;
        }

        return { translateX, scale, zIndex, opacity, rotateY };
    };

    return (
        <section id="experience" className="py-24 bg-deep-black overflow-hidden relative">
            <div className="container mx-auto px-6 text-center mb-16">
                <h2 className="font-heading text-4xl lg:text-5xl text-gold mb-6">The Lumière Experience</h2>
                <div className="w-24 h-[1px] bg-gold mx-auto opacity-50 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border border-gold bg-deep-black"></div>
                </div>
            </div>

            <div
                className="relative w-full max-w-6xl mx-auto h-[500px] flex justify-center items-center perspective-[1200px]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {experiences.map((exp, i) => {
                    const style = getCardStyles(i);
                    const bgImg = images[i] || '';

                    return (
                        <motion.div
                            key={exp.title}
                            className="absolute w-[300px] sm:w-[400px] h-[450px] shadow-2xl"
                            initial={false}
                            animate={{
                                x: style.translateX, // use x string
                                scale: style.scale,
                                zIndex: style.zIndex,
                                opacity: style.opacity,
                                rotateY: style.rotateY
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 300,
                                damping: 30
                            }}
                            style={{
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            <GlassCard className="w-full h-full flex flex-col pointer-events-none">
                                <div
                                    className="h-[60%] w-full bg-cover bg-center border-b border-[rgba(212,175,55,0.2)]"
                                    style={{ backgroundImage: `url(${bgImg})` }}
                                />
                                <div className="h-[40%] p-6 flex flex-col justify-center items-center text-center bg-surface-dark">
                                    <h3 className="font-heading text-2xl text-gold mb-2">{exp.title}</h3>
                                    <p className="font-subheading text-text-primary italic text-lg">{exp.desc}</p>
                                </div>
                            </GlassCard>
                        </motion.div>
                    );
                })}

                {/* Controls */}
                <button
                    className="absolute left-4 lg:left-12 z-40 w-12 h-12 rounded-full border border-gold text-gold flex items-center justify-center hover:bg-[rgba(212,175,55,0.1)] transition-colors"
                    onClick={handlePrev}
                >
                    <ChevronLeft />
                </button>
                <button
                    className="absolute right-4 lg:right-12 z-40 w-12 h-12 rounded-full border border-gold text-gold flex items-center justify-center hover:bg-[rgba(212,175,55,0.1)] transition-colors"
                    onClick={handleNext}
                >
                    <ChevronRight />
                </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center space-x-4 mt-8">
                {experiences.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2 h-2 rotate-45 transition-colors duration-300 ${idx === currentIndex ? 'bg-gold' : 'border border-[rgba(212,175,55,0.5)]'
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default ExperienceCarousel;
