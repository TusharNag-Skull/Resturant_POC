import { motion } from 'framer-motion';

const Footer = ({ onReserveClick }) => {
    return (
        <footer className="bg-deep-black border-t border-[rgba(212,175,55,0.15)] relative overflow-hidden pt-20 pb-10">
            {/* Subtle particle field in footer */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
                <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[rgba(212,175,55,0.05)] to-transparent"></div>
                {/* We can use CSS particles or just the gradient here to keep it subtle */}
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 mb-16">
                    {/* Brand Col */}
                    <div className="space-y-6">
                        <h2 className="font-heading text-3xl text-gold italic">Lumière</h2>
                        <p className="font-subheading text-text-secondary text-lg italic">
                            An Affair to Remember
                        </p>
                        <p className="text-text-muted text-sm max-w-sm mt-4">
                            Reserve your table for an evening of unparalleled culinary artistry. Every evening at Lumière is a first edition.
                        </p>
                    </div>

                    {/* Links Col */}
                    <div className="space-y-6">
                        <h3 className="font-accent text-gold tracking-widest text-sm uppercase">Explore</h3>
                        <ul className="space-y-3">
                            {['Menu', 'Experience', 'Private Events', 'Gift Cards', 'Careers'].map(link => (
                                <li key={link}>
                                    <a href="#" className="text-text-secondary hover:text-gold transition-colors duration-300">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter / Contact Col */}
                    <div className="space-y-6">
                        <h3 className="font-accent text-gold tracking-widest text-sm uppercase">Join our inner circle</h3>
                        <p className="text-sm text-text-secondary">
                            Subscribe to receive exclusive invitations and culinary updates.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3 mt-4" onSubmit={e => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="bg-[rgba(20,20,20,0.8)] border border-[rgba(212,175,55,0.2)] text-text-primary px-4 py-3 placeholder-text-muted outline-none focus:border-gold transition-colors block w-full"
                            />
                            <button
                                type="submit"
                                className="bg-text-secondary text-deep-black hover:bg-gold px-6 py-3 font-accent tracking-wider uppercase text-sm transition-colors duration-300 sm:w-auto"
                            >
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-[rgba(212,175,55,0.1)] pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-text-muted">
                    <p>© 2026 Lumière Dining. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-gold transition-colors">Terms</a>
                        <a href="/admin" className="hover:text-gold transition-colors">Admin Portal</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
