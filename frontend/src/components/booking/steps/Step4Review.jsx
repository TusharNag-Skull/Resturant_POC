import { useState } from 'react';
import { motion } from 'framer-motion';
import GoldButton from '../../ui/GoldButton';

const Step4Review = ({ data, onConfirm, onPrev }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleConfirm = async () => {
        setIsSubmitting(true);
        await onConfirm();
        setIsSubmitting(false); // only needed if err
    };

    const getDynamicMessage = (count) => {
        if (count <= 2) return "An intimate experience";
        if (count <= 6) return "A shared celebration";
        if (count <= 12) return "A gathering of distinction";
        return "A grand private affair";
    };

    // Format date nicely
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return new Intl.DateTimeFormat('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(d);
    };

    return (
        <div className="flex flex-col h-full justify-between max-w-xl mx-auto w-full">
            <div>
                <h2 className="font-heading text-3xl md:text-4xl text-gold italic text-center mb-2">Your Reservation</h2>
                <p className="text-text-muted text-center mb-8">Please review the details below</p>

                {/* Summary Card */}
                <div className="glassmorphism p-6 sm:p-8 relative">
                    {/* Top Ornament */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-deep-black px-2">
                        <svg width="24" height="24" viewBox="0 0 100 100" fill="none">
                            <path d="M50 0 L100 50 L50 100 L0 50 Z" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 4" />
                            <circle cx="50" cy="50" r="10" fill="#D4AF37" />
                        </svg>
                    </div>

                    <div className="space-y-6 mt-4 mb-4 text-sm sm:text-base">
                        <div className="flex justify-between border-b border-[rgba(212,175,55,0.1)] pb-3">
                            <span className="text-text-secondary flex items-center gap-2"><span>📅</span> Date</span>
                            <span className="font-heading text-gold text-lg">{formatDate(data.date)}</span>
                        </div>
                        <div className="flex justify-between border-b border-[rgba(212,175,55,0.1)] pb-3">
                            <span className="text-text-secondary flex items-center gap-2"><span>⏰</span> Time</span>
                            <span className="font-heading text-gold text-lg">{data.time}</span>
                        </div>
                        <div className="flex justify-between border-b border-[rgba(212,175,55,0.1)] pb-3">
                            <span className="text-text-secondary flex items-center gap-2"><span>👥</span> Guests</span>
                            <span className="text-text-primary text-right">
                                <span className="font-bold text-gold">{data.guests}</span> <br />
                                <span className="text-xs text-text-muted italic">{getDynamicMessage(data.guests)}</span>
                            </span>
                        </div>
                        <div className="flex justify-between border-b border-[rgba(212,175,55,0.1)] pb-3">
                            <span className="text-text-secondary flex items-center gap-2"><span>👤</span> Name</span>
                            <span className="text-text-primary">{data.customer_name}</span>
                        </div>
                        <div className="flex justify-between border-b border-[rgba(212,175,55,0.1)] pb-3 text-right">
                            <span className="text-text-secondary flex items-center gap-2"><span>✉️</span> Contact</span>
                            <span className="text-text-primary">
                                {data.email} <br />
                                <span className="text-text-muted text-sm">{data.phoneCode} {data.phone}</span>
                            </span>
                        </div>
                        {data.special_requests && (
                            <div className="flex flex-col border-[rgba(212,175,55,0.1)] pt-2">
                                <span className="text-text-secondary flex items-center gap-2 mb-2"><span>💬</span> Special Requests</span>
                                <span className="text-text-primary italic bg-[rgba(10,10,10,0.5)] p-3 rounded-md text-sm">"{data.special_requests}"</span>
                            </div>
                        )}
                    </div>

                    <p className="text-center text-xs text-text-muted mt-8 italic">
                        Your reference: LUM-XXXXXX <br className="sm:hidden" />(generated upon confirmation)
                    </p>

                    {/* Bottom Ornament */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-deep-black px-2">
                        <svg width="24" height="24" viewBox="0 0 100 100" fill="none">
                            <path d="M50 0 L100 50 L50 100 L0 50 Z" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 4" />
                            <circle cx="50" cy="50" r="10" fill="#D4AF37" />
                        </svg>
                    </div>
                </div>

                <p className="text-center text-xs text-text-muted mt-8">
                    Free cancellation up to 24 hours before your reservation
                </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <GoldButton variant="ghost" onClick={onPrev} disabled={isSubmitting} className="sm:w-1/3">
                    &larr; Back
                </GoldButton>
                <GoldButton onClick={handleConfirm} disabled={isSubmitting} className="sm:w-2/3">
                    {isSubmitting ? (
                        <span className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-deep-black border-t-transparent rounded-full animate-spin" />
                            <span>Securing your table...</span>
                        </span>
                    ) : "Confirm Reservation"}
                </GoldButton>
            </div>
        </div>
    );
};

export default Step4Review;
