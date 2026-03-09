import { motion } from 'framer-motion';

const TeamSection = ({ chefs }) => {
    const titles = ["Executive Chef", "Chef de Cuisine", "Pastry Chef"];
    const tags = [
        ["Classical French", "Sauce Master"],
        ["Modernist Art", "Foraging"],
        ["Chocolate Sculpting", "Sugar Art"]
    ];
    const bios = [
        "A visionary of modern gastronomy with roots in traditional haute cuisine. 25 years redefining Parisian dining.",
        "Driven by the seasonal bounty of the French countryside, translating raw nature into perfect compositions.",
        "Architects delicate masterpieces that balance sweetness, texture, and unexpected savory notes."
    ];

    return (
        <section className="py-24 bg-surface-dark relative border-y border-[rgba(212,175,55,0.1)]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="font-heading text-4xl lg:text-5xl text-gold mb-4">The Artisans</h2>
                    <p className="font-subheading text-text-secondary text-2xl italic">Masters of their craft</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    {chefs.map((chef, idx) => (
                        <motion.div
                            key={idx}
                            className="flex flex-col items-center text-center group"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: idx * 0.2, duration: 0.8 }}
                        >
                            {/* Portrait container with rotating ring */}
                            <div className="relative w-48 h-48 mb-8">
                                <div className="absolute inset-0 rounded-full border-2 border-dashed border-gold opacity-50 transition-transform duration-[10s] ease-linear group-hover:rotate-180" />
                                <div className="absolute inset-2 rounded-full border border-[rgba(212,175,55,0.3)] transition-transform duration-[15s] ease-linear group-hover:-rotate-180" />
                                <div
                                    className="absolute inset-4 rounded-full bg-cover bg-center border border-[rgba(13,13,13,1)] shadow-xl overflow-hidden"
                                    style={{ backgroundImage: `url(${chef.src})` }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-deep-black to-transparent opacity-60"></div>
                                </div>
                            </div>

                            <h3 className="font-heading text-3xl text-text-primary mb-2 transition-colors duration-300 group-hover:text-gold">{chef.name}</h3>
                            <p className="font-accent text-gold text-xs tracking-widest uppercase mb-4">{titles[idx]}</p>

                            <p className="font-body text-text-muted text-sm leading-relaxed mb-6 max-w-sm">
                                {bios[idx]}
                            </p>

                            <div className="flex flex-wrap justify-center gap-2">
                                {tags[idx].map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-[rgba(212,175,55,0.05)] border border-[rgba(212,175,55,0.2)] text-gold text-xs rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
