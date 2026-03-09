import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Step1DateTime from './steps/Step1DateTime';
import Step2GuestCount from './steps/Step2GuestCount';
import Step3ContactInfo from './steps/Step3ContactInfo';
import Step4Review from './steps/Step4Review';
import BookingSuccess from './BookingSuccess';

const BookingWizard = ({ onClose }) => {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
    const [isSuccess, setIsSuccess] = useState(false);
    const [bookingData, setBookingData] = useState({
        date: null,
        time: null,
        guests: 2,
        special_requests: '',
        customer_name: '',
        email: '',
        phone: '',
        phoneCode: '+33',
        reference: ''
    });

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const nextStep = () => {
        setDirection(1);
        setStep(s => Math.min(s + 1, 4));
    };

    const prevStep = () => {
        setDirection(-1);
        setStep(s => Math.max(s - 1, 1));
    };

    const handleUpdate = (data) => {
        setBookingData(prev => ({ ...prev, ...data }));
    };

    const handleConfirm = async () => {
        setDirection(1);
        try {
            // Create E.164 phone string
            const fullPhone = `${bookingData.phoneCode}${bookingData.phone.replace(/^0+/, '')}`;

            const payload = {
                name: bookingData.customer_name,
                email: bookingData.email,
                phone: fullPhone,
                date_time: `${bookingData.date} ${bookingData.time}`,
                guests: bookingData.guests,
                special_request: bookingData.special_requests || null
            };

            const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
            const res = await fetch(`${API_BASE}/api/reservations/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Booking failed');
            const data = await res.json();

            handleUpdate({ reference: data.reference_id });
            setIsSuccess(true);
        } catch (err) {
            console.error(err);
            alert('Error securing reservation. Please try again.');
        }
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 60 : -60,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 60 : -60,
            opacity: 0
        })
    };

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(0,0,0,0.92)] backdrop-blur-md px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="relative w-full max-w-[680px]">

                {/* Progress Bar & Indicators (Hide on Success) */}
                {!isSuccess && (
                    <div className="absolute -top-12 left-0 w-full">
                        <div className="flex justify-between items-center mb-2 px-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className={`w-3 h-3 rotate-45 transition-colors duration-500 ${step >= i ? 'bg-gold' : 'border border-gold opacity-30'}`} />
                            ))}
                        </div>
                        <div className="h-[2px] w-full bg-[rgba(212,175,55,0.2)]">
                            <motion.div
                                className="h-full bg-gold"
                                initial={{ width: 0 }}
                                animate={{ width: `${((step - 1) / 3) * 100}%` }}
                                transition={{ duration: 0.4 }}
                            />
                        </div>
                    </div>
                )}

                {/* Modal Inner Window */}
                <div className="glassmorphism border-gold border-opacity-30 rounded-xl overflow-hidden shadow-2xl relative min-h-[500px] flex flex-col">
                    {/* Close Button */}
                    {!isSuccess && (
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center text-gold border border-transparent hover:border-gold hover:bg-[rgba(212,175,55,0.1)] transition-all"
                        >
                            <X size={20} />
                        </button>
                    )}

                    <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-center p-8 lg:p-12">
                        <AnimatePresence mode="wait" custom={direction}>
                            {isSuccess ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="w-full h-full"
                                >
                                    <BookingSuccess
                                        data={bookingData}
                                        onClose={onClose}
                                    />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={step}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                                    className="w-full absolute inset-0 p-8 lg:p-12 overflow-y-auto custom-scrollbar"
                                >
                                    {step === 1 && (
                                        <Step1DateTime
                                            data={bookingData}
                                            update={handleUpdate}
                                            onNext={nextStep}
                                        />
                                    )}
                                    {step === 2 && (
                                        <Step2GuestCount
                                            data={bookingData}
                                            update={handleUpdate}
                                            onNext={nextStep}
                                            onPrev={prevStep}
                                        />
                                    )}
                                    {step === 3 && (
                                        <Step3ContactInfo
                                            data={bookingData}
                                            update={handleUpdate}
                                            onNext={nextStep}
                                            onPrev={prevStep}
                                        />
                                    )}
                                    {step === 4 && (
                                        <Step4Review
                                            data={bookingData}
                                            onConfirm={handleConfirm}
                                            onPrev={prevStep}
                                        />
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default BookingWizard;
