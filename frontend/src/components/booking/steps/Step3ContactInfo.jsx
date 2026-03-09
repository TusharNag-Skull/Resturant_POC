import { useState } from 'react';
import GoldButton from '../../ui/GoldButton';
import { Lock, CheckCircle2 } from 'lucide-react';

const Step3ContactInfo = ({ data, update, onNext, onPrev }) => {
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    const validatePhone = (phone) => {
        // Basic numeric check since E.164 is appended later
        return phone.replace(/[^0-9]/g, '').length >= 7;
    };

    const handleNext = () => {
        const newErrors = {};
        if (!data.customer_name || data.customer_name.length < 2) {
            newErrors.name = "Please enter your full name";
        }
        if (!validateEmail(data.email)) {
            newErrors.email = "Please enter a valid email";
        }
        if (!validatePhone(data.phone)) {
            newErrors.phone = "Please enter a valid phone number";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            onNext();
        }
    };

    return (
        <div className="flex flex-col h-full justify-between max-w-xl mx-auto w-full">
            <div>
                <h2 className="font-heading text-3xl md:text-4xl text-gold italic text-center mb-10">How shall we reach you?</h2>

                <div className="space-y-8">
                    {/* Name Field */}
                    <div className="relative group">
                        <label className="block font-accent text-xs tracking-widest uppercase text-text-secondary mb-2">Full Name</label>
                        <input
                            type="text"
                            value={data.customer_name}
                            onChange={(e) => update({ customer_name: e.target.value })}
                            placeholder="As it appears on your reservation"
                            className="w-full bg-transparent border-b border-[rgba(212,175,55,0.3)] text-text-primary px-0 py-2 outline-none focus:border-gold transition-colors placeholder:text-text-muted"
                        />
                        {/* Animated Underline Effect */}
                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-focus-within:w-full" />
                        {errors.name && <p className="text-[#b30047] text-xs mt-1 animate-pulse">{errors.name}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="relative group">
                        <label className="block font-accent text-xs tracking-widest uppercase text-text-secondary mb-2">Email Address</label>
                        <div className="relative">
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => update({ email: e.target.value })}
                                placeholder="your@email.com"
                                className="w-full bg-transparent border-b border-[rgba(212,175,55,0.3)] text-text-primary px-0 py-2 outline-none focus:border-gold transition-colors placeholder:text-text-muted pr-8"
                            />
                            {validateEmail(data.email) && (
                                <CheckCircle2 size={18} className="absolute right-0 top-1/2 -translate-y-1/2 text-success" />
                            )}
                        </div>
                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-focus-within:w-full" />
                        {errors.email && <p className="text-[#b30047] text-xs mt-1 animate-pulse">{errors.email}</p>}
                    </div>

                    {/* WhatsApp Field */}
                    <div className="relative group">
                        <label className="flex items-center space-x-2 font-accent text-xs tracking-widest uppercase text-whatsapp mb-2">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            <span>WhatsApp Number</span>
                        </label>
                        <div className="flex space-x-2">
                            <select
                                value={data.phoneCode}
                                onChange={e => update({ phoneCode: e.target.value })}
                                className="bg-transparent border-b border-[rgba(212,175,55,0.3)] text-text-primary outline-none focus:border-gold pb-2 w-20 appearance-none text-center"
                            >
                                <option value="+33" className="bg-surface-dark">+33 🇫🇷</option>
                                <option value="+1" className="bg-surface-dark">+1 🇺🇸</option>
                                <option value="+44" className="bg-surface-dark">+44 🇬🇧</option>
                                <option value="+49" className="bg-surface-dark">+49 🇩🇪</option>
                                <option value="+81" className="bg-surface-dark">+81 🇯🇵</option>
                                <option value="+91" className="bg-surface-dark">+91 🇮🇳</option>
                            </select>
                            <input
                                type="tel"
                                value={data.phone}
                                onChange={(e) => update({ phone: e.target.value })}
                                placeholder="6 12 34 56 78"
                                className="w-full bg-transparent border-b border-[rgba(212,175,55,0.3)] text-text-primary px-0 py-2 outline-none focus:border-gold transition-colors placeholder:text-text-muted"
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-focus-within:w-full" />
                        <p className="text-[10px] text-text-muted mt-2 italic flex items-center space-x-1">
                            <span>Your confirmation will be sent here via WhatsApp</span>
                        </p>
                        {errors.phone && <p className="text-[#b30047] text-xs mt-1 animate-pulse">{errors.phone}</p>}
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-center space-x-2 text-xs text-text-muted border-t border-[rgba(212,175,55,0.1)] pt-6">
                    <Lock size={12} className="text-gold" />
                    <span>Your details are encrypted and never shared.</span>
                </div>
            </div>

            <div className="mt-8 flex justify-between">
                <GoldButton variant="ghost" onClick={onPrev}>
                    &larr; Back
                </GoldButton>
                <GoldButton onClick={handleNext}>
                    Continue &rarr;
                </GoldButton>
            </div>
        </div>
    );
};

export default Step3ContactInfo;
