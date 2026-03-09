import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import GoldButton from '../ui/GoldButton';

const MenuShowcase = ({ dishes }) => {
    const [activeFilter, setActiveFilter] = useState('All');
    const filters = ['All', 'Starters', 'Mains', 'Desserts', 'Wine Pairing'];

    // Mocking categories since the generator just gives us names
    const categorizedDishes = dishes.map((d, i) => {
        let category = 'Mains';
        if (i === 4) category = 'Desserts';
        if (i === 3 || i === 5) category = 'Starters';
        return { ...d, category, price: 55 + i * 15 }; // Mock prices
    });

    const filteredDishes = activeFilter === 'All'
        ? categorizedDishes
        : categorizedDishes.filter(d => d.category === activeFilter);

    return (
        <section id="menu" className="py-24 bg-[rgba(8,8,8,1)] relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-heading text-4xl lg:text-5xl text-gold mb-4">Culinary Masterworks</h2>
                    <p className="font-subheading text-text-secondary text-2xl italic">A menu designed to tell stories</p>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-6 py-2 rounded-full font-accent text-xs tracking-widest uppercase transition-all duration-300 border ${activeFilter === filter
                                    ? 'bg-gold text-deep-black border-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                                    : 'bg-transparent text-text-secondary border-[rgba(212,175,55,0.3)] hover:border-gold hover:text-gold'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Masonry-style Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
                >
                    <AnimatePresence>
                        {filteredDishes.map((dish, idx) => (
                            <motion.div
                                key={dish.name}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="group relative"
                            >
                                <GlassCard className="h-[400px] flex flex-col relative overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                        style={{ backgroundImage: `url(${dish.src})` }}
                                    />
                                    {/* Subtle Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-[rgba(5,5,5,0.2)] to-transparent group-hover:from-[rgba(10,10,10,0.9)] transition-all duration-500" />

                                    {/* Content (slides up on hover) */}
                                    <div className="absolute inset-x-0 bottom-0 p-6 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">
                                        <div className="flex justify-between items-end mb-2">
                                            <h3 className="font-heading text-2xl text-text-primary drop-shadow-md">{dish.name}</h3>
                                            <span className="font-accent text-gold tracking-widest">€{dish.price}</span>
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mt-4">
                                            <span className="text-xs font-accent text-text-secondary border border-[rgba(212,175,55,0.3)] px-3 py-1 rounded-full uppercase">
                                                {dish.category}
                                            </span>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <div className="flex justify-center">
                    <GoldButton variant="ghost" size="lg" className="max-w-xs">
                        View Full Menu
                    </GoldButton>
                </div>
            </div>
        </section>
    );
};

export default MenuShowcase;
