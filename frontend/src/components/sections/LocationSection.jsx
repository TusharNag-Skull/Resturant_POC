import { motion } from 'framer-motion';

const LocationSection = () => {
    return (
        <section className="py-24 bg-deep-black relative">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 item-center">

                    {/* Left Column - Info */}
                    <motion.div
                        className="flex flex-col justify-center"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="font-heading text-4xl lg:text-5xl text-gold mb-8">Find Us</h2>

                        <div className="mb-10 text-text-primary text-lg">
                            <p className="font-body mb-2">8 Rue de la Paix</p>
                            <p className="font-body">75002 Paris, France</p>
                        </div>

                        <div className="mb-12">
                            <ul className="space-y-4">
                                <li className="flex justify-between border-l-2 border-gold pl-4 py-1">
                                    <span className="font-accent tracking-wider text-sm text-text-muted">Mon – Thu</span>
                                    <span className="font-body text-text-secondary">18:00 – 23:00</span>
                                </li>
                                <li className="flex justify-between border-l-2 border-gold pl-4 py-1">
                                    <span className="font-accent tracking-wider text-sm text-text-muted">Fri – Sat</span>
                                    <span className="font-body text-text-secondary">17:30 – 00:00</span>
                                </li>
                                <li className="flex justify-between border-l-2 border-gold pl-4 py-1">
                                    <span className="font-accent tracking-wider text-sm text-text-muted">Sunday</span>
                                    <span className="font-body text-text-secondary">18:00 – 22:00</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-4 text-text-secondary font-body">
                            <p className="hover:text-gold transition-colors cursor-pointer">+33 1 XX XX XX XX</p>
                            <p className="hover:text-gold transition-colors cursor-pointer">reservations@lumiere-dining.com</p>
                        </div>

                        <div className="mt-12 flex flex-wrap gap-4">
                            {['Instagram', 'Facebook', 'TripAdvisor'].map(social => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-12 h-12 rounded-full border border-gold text-gold flex items-center justify-center hover:bg-gold hover:text-deep-black transition-colors duration-300 relative group"
                                >
                                    {/* Just use first letter for icon stub */}
                                    <span className="font-accent text-lg font-bold">{social[0]}</span>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column - Map Placeholder */}
                    <motion.div
                        className="relative h-[400px] lg:h-full min-h-[500px] border border-gold rounded-sm overflow-hidden group shadow-[0_0_30px_rgba(212,175,55,0.1)]"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="absolute inset-0 bg-[#0d0d0d] bg-[linear-gradient(rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            {/* Map Pin */}
                            <motion.div
                                className="mb-4 text-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            >
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                            </motion.div>
                            <div className="bg-[rgba(5,5,5,0.8)] border border-[rgba(212,175,55,0.4)] px-6 py-3 backdrop-blur-md">
                                <p className="font-heading text-gold text-xl">Paris, France</p>
                                <p className="font-body text-text-muted text-sm mt-1">Get Directions</p>
                            </div>
                        </div>

                        {/* Edge fade */}
                        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(5,5,5,1)] pointer-events-none"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default LocationSection;
