import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', ...props }) => {
    return (
        <motion.div
            {...props}
            className={`glassmorphism rounded-xl overflow-hidden ${className}`}
            whileHover={{ y: -8, boxShadow: "var(--gold-glow)" }}
        >
            {children}
        </motion.div>
    );
};

export default GlassCard;
