import { motion } from 'framer-motion';

const AmbianceGallery = ({ images }) => {
    // Duplicate images to create an infinite scroll illusion
    const row1 = [...images.slice(0, 4), ...images.slice(0, 4)];
    const row2 = [...images.slice(4, 8), ...images.slice(4, 8)];

    return (
        <section className="py-24 bg-deep-black overflow-hidden relative">
            <div className="container mx-auto px-6 text-center mb-16">
                <h2 className="font-heading text-4xl lg:text-5xl text-gold mb-6 inline-block relative">
                    Our Space
                    <span className="block w-full h-[1px] bg-gold mt-6 opacity-30"></span>
                </h2>
            </div>

            <div className="space-y-8 relative">
                {/* Row 1 - Left to Right */}
                <div className="relative w-full h-[280px] overflow-hidden group">
                    <motion.div
                        className="flex absolute left-0 top-0 space-x-6 w-max"
                        animate={{ x: [0, -window.innerWidth * 1.5] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 40
                        }}
                        whileHover={{ animationPlayState: "paused" }} // note: Framer motion might fight CSS paused state, so we disable on hover natively via css or rely on Framer
                    >
                        {row1.map((img, i) => (
                            <div
                                key={i}
                                className="h-[280px] w-[350px] sm:w-[450px] rounded-lg border border-[rgba(212,175,55,0.2)] bg-cover bg-center shadow-lg"
                                style={{ backgroundImage: `url(${img})` }}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Row 2 - Right to Left */}
                <div className="relative w-full h-[280px] overflow-hidden group">
                    <motion.div
                        className="flex absolute left-0 top-0 space-x-6 w-max"
                        initial={{ x: -window.innerWidth * 1.5 }}
                        animate={{ x: 0 }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 40
                        }}
                    >
                        {row2.map((img, i) => (
                            <div
                                key={i}
                                className="h-[280px] w-[350px] sm:w-[450px] rounded-lg border border-[rgba(212,175,55,0.2)] bg-cover bg-center shadow-lg"
                                style={{ backgroundImage: `url(${img})` }}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AmbianceGallery;
