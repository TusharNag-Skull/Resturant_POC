import { motion } from 'framer-motion';

const GoldButton = ({
    children,
    variant = 'filled', // 'filled' | 'ghost'
    size = 'md', // 'sm' | 'md' | 'lg'
    className = '',
    onClick,
    disabled
}) => {
    const baseClasses = "relative overflow-hidden font-accent tracking-[0.2em] uppercase transition-luxury duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";

    const sizeClasses = {
        sm: "px-4 py-2 text-xs",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base w-full",
    };

    const variantClasses = {
        filled: "bg-gold text-deep-black hover:bg-gold-light active:bg-gold-dark shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]",
        ghost: "border border-gold text-gold hover:bg-[rgba(212,175,55,0.1)] active:bg-[rgba(212,175,55,0.2)]",
    };

    return (
        <motion.button
            whileHover={disabled ? {} : { scale: 1.03 }}
            whileTap={disabled ? {} : { scale: 0.97 }}
            className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </motion.button>
    );
};

export default GoldButton;
