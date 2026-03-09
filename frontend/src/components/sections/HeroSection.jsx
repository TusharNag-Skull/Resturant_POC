import { motion } from 'framer-motion';
import ParticleField from '../ui/ParticleField';
import GoldButton from '../ui/GoldButton';

const HeroSection = ({ heroImage, onReserveClick, onMenuClick }) => {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-deep-black">
            {/* Background Image */}
            {heroImage && (
                <motion.div
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: `url(${heroImage})` }}
                />
            )}

            {/* Overlay vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,5,5,0.2)_0%,rgba(5,5,5,0.8)_60%,rgba(5,5,5,1)_100%)] z-[5]"></div>

            {/* Particle Field */}
            <div className="absolute inset-0 z-10">
                <ParticleField count={60} />
            </div>

            {/* Hero Content */}
            <div className="relative z-20 text-center flex flex-col items-center max-w-4xl px-6">
                <motion.p
                    className="font-accent text-gold text-xs sm:text-sm tracking-[0.3em] uppercase mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 1 }}
                >
                    Since 2008 &middot; Paris
                </motion.p>

                <motion.h1
                    className="font-heading text-6xl sm:text-8xl lg:text-[120px] text-white leading-none mb-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                >
                    Lumière
                </motion.h1>

                <motion.h2
                    className="font-subheading text-3xl sm:text-4xl text-gold italic mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1 }}
                >
                    An Affair to Remember
                </motion.h2>

                <motion.div
                    className="w-[200px] h-[1px] bg-gold relative mb-8 flex justify-center items-center opacity-70"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 0.7 }}
                    transition={{ delay: 0.9, duration: 1 }}
                >
                    {/* Diamond SVG */}
                    <svg className="w-3 h-3 text-gold fill-current absolute" viewBox="0 0 24 24">
                        <path d="M12 0l4 12-4 12-4-12z" />
                    </svg>
                </motion.div>

                <motion.p
                    className="text-text-primary font-body text-base sm:text-lg max-w-xl mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 1 }}
                >
                    Reserve your table for an evening of unparalleled culinary artistry.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    <GoldButton onClick={onReserveClick}>
                        Reserve a Table
                    </GoldButton>
                    <GoldButton variant="ghost" onClick={onMenuClick}>
                        Discover the Menu
                    </GoldButton>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <div className="w-[1px] h-16 bg-[rgba(212,175,55,0.3)] relative overflow-hidden">
                    <motion.div
                        className="w-full h-1/3 bg-gold absolute top-0"
                        animate={{
                            top: ['-30%', '100%'],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
