import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
    { text: "An evening that transcended dining. Lumière is art made edible.", name: "Charlotte B.", location: "London" },
    { text: "The private salon experience was flawless. Every detail whispered luxury.", name: "Rajan M.", location: "Dubai" },
    { text: "Three hours passed like thirty minutes. The Chef's Table is unforgettable.", name: "Sophie L.", location: "New York" },
    { text: "The wine pairing was a masterclass in itself.", name: "Thomas K.", location: "Singapore" },
    { text: "Celebrating our anniversary here was the single best decision we made.", name: "Ana & Luis", location: "Madrid" }
];

const TestimonialsCarousel = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-24 bg-deep-black relative overflow-hidden">
            <div className="container mx-auto px-6 text-center">
                <h2 className="font-heading text-4xl lg:text-5xl text-gold mb-16">Voices of Our Guests</h2>

                <div className="max-w-4xl mx-auto min-h-[300px] flex flex-col items-center justify-center relative">
                    <div className="absolute top-0 opacity-10 font-heading text-[120px] text-gold leading-none">“</div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-center mt-12"
                        >
                            <p className="font-subheading text-2xl md:text-3xl text-text-primary italic mb-10 max-w-3xl leading-relaxed">
                                "{testimonials[index].text}"
                            </p>

                            <div className="flex space-x-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-gold fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            <h4 className="font-accent text-gold tracking-widest uppercase text-sm mb-1">{testimonials[index].name}</h4>
                            <p className="font-body text-text-muted text-xs uppercase tracking-wide">{testimonials[index].location}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Progress Bar (resets every 5 seconds) */}
                <div className="max-w-md mx-auto h-[1px] bg-[rgba(212,175,55,0.2)] mt-12 overflow-hidden">
                    <motion.div
                        key={index} // Reset animation on index change
                        className="h-full bg-gold"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5, ease: "linear" }}
                    />
                </div>
            </div>
        </section>
    );
};

export default TestimonialsCarousel;
