import { useEffect } from 'react';
import { motion } from 'framer-motion';
import GoldButton from '../ui/GoldButton';
import ParticleField from '../ui/ParticleField';

const BookingSuccess = ({ data, onClose }) => {

    const name = data.customer_name ? data.customer_name.split(' ')[0] : 'Guest';

    return (
        <div className="flex flex-col items-center justify-center h-full max-w-xl mx-auto w-full text-center relative overflow-hidden py-12">
            {/* Background ascending particles for success feel */}
            <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
                <ParticleField count={40} speed={0.8} />
            </div>

            <div className="z-10 w-full">
                {/* Animated Checkmark SVG */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                    className="w-24 h-24 mx-auto mb-8 rounded-full border border-[rgba(212,175,55,0.3)] shadow-[0_0_40px_rgba(212,175,55,0.2)] flex items-center justify-center bg-[rgba(212,175,55,0.05)]"
                >
                    <svg className="w-12 h-12 text-gold" viewBox="0 0 24 24" fill="none">
                        <motion.path
                            d="M5 13L9 17L19 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                        />
                    </svg>
                </motion.div>

                <motion.h2
                    className="font-heading text-4xl sm:text-5xl text-gold mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    Reservation Confirmed
                </motion.h2>

                <motion.p
                    className="font-subheading text-2xl text-text-primary italic mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    Bonsoir, {name}. We eagerly await your arrival.
                </motion.p>

                {/* Reference Number Pill */}
                <motion.div
                    className="inline-block border border-gold rounded-full px-8 py-4 bg-[rgba(212,175,55,0.1)] mb-10"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                >
                    <span className="font-accent text-xs text-text-secondary uppercase tracking-widest block mb-2">Reference Number</span>
                    <span className="font-mono text-2xl text-gold tracking-widest">{data.reference || "LUM-XXXXXX"}</span>
                </motion.div>

                {/* WhatsApp Notice */}
                <motion.div
                    className="flex items-center justify-center space-x-3 text-sm text-text-muted mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>A confirmation has been sent to {data.phoneCode} {data.phone}</span>
                </motion.div>

                <motion.div
                    className="flex flex-col sm:flex-row justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                >
                    <GoldButton variant="ghost" onClick={() => alert("Added to calendar (mock)")}>
                        Add to Calendar
                    </GoldButton>
                    <GoldButton onClick={onClose}>
                        Return to Home
                    </GoldButton>
                </motion.div>
            </div>

        </div>
    );
};

export default BookingSuccess;
