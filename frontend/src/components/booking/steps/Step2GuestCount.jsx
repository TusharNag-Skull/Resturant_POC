import { motion } from 'framer-motion';
import GoldButton from '../../ui/GoldButton';

const Step2GuestCount = ({ data, update, onNext, onPrev }) => {
    const maxGuests = 20;
    const minGuests = 1;

    const increment = () => {
        if (data.guests < maxGuests) update({ guests: data.guests + 1 });
    };

    const decrement = () => {
        if (data.guests > minGuests) update({ guests: data.guests - 1 });
    };

    const getDynamicMessage = (count) => {
        if (count <= 2) return "An intimate experience";
        if (count <= 6) return "A shared celebration";
        if (count <= 12) return "A gathering of distinction";
        return "A grand private affair";
    };

    return (
        <div className="flex flex-col h-full justify-between max-w-2xl mx-auto w-full">
            <div>
                <h2 className="font-heading text-3xl md:text-4xl text-gold italic text-center mb-2">How many guests will be joining?</h2>
                <p className="text-text-muted text-center mb-12">We accommodate parties of 1 to 20 guests</p>

                {/* Big Number Picker */}
                <div className="flex items-center justify-center space-x-12 mb-8">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={decrement}
                        disabled={data.guests <= minGuests}
                        className="w-[52px] h-[52px] rounded-full border border-gold flex items-center justify-center text-gold hover:bg-gold hover:text-deep-black transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gold"
                    >
                        <span className="text-2xl mt-[-2px]">&minus;</span>
                    </motion.button>

                    <div className="w-32 flex justify-center">
                        <motion.span
                            key={data.guests}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: [1, 1.2, 1], opacity: 1 }}
                            className="font-heading text-[96px] text-gold leading-none"
                        >
                            {data.guests}
                        </motion.span>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={increment}
                        disabled={data.guests >= maxGuests}
                        className="w-[52px] h-[52px] rounded-full border border-gold flex items-center justify-center text-gold hover:bg-gold hover:text-deep-black transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gold"
                    >
                        <span className="text-2xl mt-[-2px]">+</span>
                    </motion.button>
                </div>

                <motion.p
                    key={`msg-${data.guests}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center font-subheading text-2xl text-text-primary italic mb-2"
                >
                    {getDynamicMessage(data.guests)}
                </motion.p>

                {data.guests >= 13 && (
                    <p className="text-center text-text-muted text-sm mb-12">
                        Our team will contact you to discuss arrangements
                    </p>
                )}
                {data.guests < 13 && <div className="mb-12" />}

                {/* Visual Slider */}
                <div className="relative w-full max-w-md mx-auto h-2 bg-[rgba(212,175,55,0.2)] rounded-full mb-12">
                    <div
                        className="absolute top-0 left-0 h-full bg-gold rounded-full transition-all duration-300"
                        style={{ width: `${((data.guests - 1) / 19) * 100}%` }}
                    />
                    <input
                        type="range"
                        min={minGuests}
                        max={maxGuests}
                        value={data.guests}
                        onChange={(e) => update({ guests: parseInt(e.target.value) })}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {/* Custom Thumb Visualizer */}
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-gold rotate-45 border border-deep-black shadow-md pointer-events-none transition-all duration-300"
                        style={{ left: `calc(${((data.guests - 1) / 19) * 100}% - 8px)` }}
                    />
                </div>

                {/* Special Requests */}
                <div className="relative max-w-md mx-auto group">
                    <textarea
                        value={data.special_requests}
                        onChange={(e) => {
                            if (e.target.value.length <= 500) update({ special_requests: e.target.value });
                        }}
                        placeholder="Any special requests or occasions? (Optional)"
                        className="w-full bg-[rgba(10,10,10,0.8)] border border-[rgba(212,175,55,0.3)] text-text-primary px-4 py-4 rounded-md outline-none focus:border-gold transition-colors resize-none h-28"
                    />
                    <div className="absolute bottom-3 right-4 text-xs text-text-muted">
                        {data.special_requests?.length || 0}/500
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-between">
                <GoldButton variant="ghost" onClick={onPrev}>
                    &larr; Back
                </GoldButton>
                <GoldButton onClick={onNext}>
                    Continue &rarr;
                </GoldButton>
            </div>
        </div>
    );
};

export default Step2GuestCount;
