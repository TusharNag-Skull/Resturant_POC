import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import GoldButton from '../ui/GoldButton';

const Navbar = ({ onReserveClick }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // 80% of window height (typical hero roughly)
            setScrolled(window.scrollY > window.innerHeight * 0.8);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#' },
        { name: 'Menu', href: '#menu' },
        { name: 'Experience', href: '#experience' },
        { name: 'Reserve', href: '#reserve', isScrollOnly: true },
        { name: 'About', href: '#about' }
    ];

    const handleLinkClick = (e, href) => {
        if (href === '#reserve') {
            e.preventDefault();
            onReserveClick();
        }
        setMobileMenuOpen(false);
    };

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[rgba(5,5,5,0.95)] backdrop-blur-md py-4 shadow-md' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
                {/* Logo */}
                <div className="font-heading text-2xl lg:text-3xl text-gold font-bold italic tracking-wide">
                    Lumière
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex flex-1 justify-center items-center space-x-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.href)}
                            className="text-text-primary text-xs tracking-[0.2em] uppercase font-accent hover:text-gold transition-colors duration-300 relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="hidden md:flex items-center space-x-6">
                    <GoldButton size="sm" onClick={onReserveClick}>
                        Reserve
                    </GoldButton>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden text-gold focus:outline-none"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute top-full left-0 w-full h-[100vh] bg-[rgba(5,5,5,0.98)] backdrop-blur flex flex-col items-center justify-center space-y-8 pb-32"
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleLinkClick(e, link.href)}
                                className="text-2xl font-heading text-gold tracking-widest uppercase hover:text-white"
                            >
                                {link.name}
                            </motion.a>
                        ))}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <GoldButton onClick={() => { setMobileMenuOpen(false); onReserveClick(); }}>
                                Reserve a Table
                            </GoldButton>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
