import { motion } from 'framer-motion';
import ParticleField from '../ui/ParticleField';
import GoldButton from '../ui/GoldButton';

const BookingCTAInterstitial = ({ image, onReserveClick }) => {
    return (
        <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background with parallax effect */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
                style={{ backgroundImage: `url(${image})` }}
            />

            {/* Heavy dark overlay */}
            <div className="absolute inset-0 bg-deep-black opacity-85 z-10" />

            {/* Particles */}
            <div className="absolute inset-0 z-20">
                <ParticleField count={30} speed={0.5} opacity={0.6} />
            </div>

            {/* Content */}
            <div className="relative z-30 flex flex-col items-center text-center px-6 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    {/* Diamond frame SVG */}
                    <svg width="60" height="60" viewBox="0 0 100 100" fill="none" className="mx-auto">
                        <path d="M50 0 L100 50 L50 100 L0 50 Z" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 4" />
                        <circle cx="50" cy="50" r="10" fill="#D4AF37" />
                    </svg>
                </motion.div>

                <motion.h2
                    className="font-heading text-5xl md:text-7xl text-white mb-4 drop-shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 1 }}
                >
                    Your Table Awaits
                </motion.h2>

                <motion.p
                    className="font-subheading text-2xl md:text-3xl text-gold italic mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 1 }}
                >
                    Every evening at Lumière is a first edition
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <GoldButton
                        size="lg"
                        onClick={onReserveClick}
                        className="animate-pulse shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                    >
                        Make Your Reservation
                    </GoldButton>
                </motion.div>
            </div>
        </section>
    );
};

export default BookingCTAInterstitial;
