import { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const CountUp = ({ end, duration = 2, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            let startTime;
            let animationFrame;
            const startValue = 0;
            const endValue = typeof end === 'string' ? parseFloat(end.replace(/,/g, '')) : end;

            const updateCount = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = (timestamp - startTime) / (duration * 1000);

                if (progress < 1) {
                    const current = Math.floor(startValue + (endValue - startValue) * progress);
                    setCount(current);
                    animationFrame = requestAnimationFrame(updateCount);
                } else {
                    setCount(endValue);
                }
            };

            animationFrame = requestAnimationFrame(updateCount);
            return () => cancelAnimationFrame(animationFrame);
        }
    }, [end, duration, isInView]);

    const formattedCount = new Intl.NumberFormat().format(count);

    return <span ref={ref}>{formattedCount}{suffix}</span>;
};

const ExperienceNumbers = () => {
    const stats = [
        { num: 16, suffix: "", label: "Years", sub: "Of Culinary Excellence" },
        { num: 3, suffix: "", label: "Stars", sub: "Michelin Recognized" },
        { num: 40000, suffix: "+", label: "Memories", sub: "Created" },
        { num: 98, suffix: "%", label: "Guest Rating", sub: "Satisfaction" },
    ];

    return (
        <section className="bg-deep-black w-full border-y border-[rgba(212,175,55,0.4)] py-16 relative z-30">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-[rgba(212,175,55,0.2)]">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            className="flex flex-col items-center text-center px-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                        >
                            <h3 className="font-heading text-4xl lg:text-5xl text-gold mb-2 flex items-center justify-center space-x-2">
                                <CountUp end={stat.num} suffix={stat.suffix} />
                                <span>{stat.suffix}</span>
                            </h3>
                            <p className="font-accent text-white uppercase tracking-wider text-sm mb-1">{stat.label}</p>
                            <p className="font-body text-text-muted text-xs uppercase tracking-wide">{stat.sub}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceNumbers;
