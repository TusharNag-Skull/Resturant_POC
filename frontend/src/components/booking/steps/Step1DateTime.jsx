import { useState } from 'react';
import GoldButton from '../../ui/GoldButton';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Step1DateTime = ({ data, update, onNext }) => {
    // Simple calendar logic for current month
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDay = currentMonth.getDay(); // 0 is Sunday

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

    const times = ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'];

    const handleDateSelect = (day) => {
        const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        // Ignore invalid dates
        if (selected < new Date(today.setHours(0, 0, 0, 0))) return;
        if (selected.getDay() === 1) return; // Monday closed

        // Format YYYY-MM-DD
        const isoDate = `${selected.getFullYear()}-${String(selected.getMonth() + 1).padStart(2, '0')}-${String(selected.getDate()).padStart(2, '0')}`;
        update({ date: isoDate, time: null }); // Reset time if date changes
    };

    const isDateSelected = (day) => {
        if (!data.date) return false;
        const d = new Date(data.date);
        return d.getDate() === day && d.getMonth() === currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear();
    };

    const isDateDisabled = (day) => {
        const d = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        return d < new Date(today.setHours(0, 0, 0, 0)) || d.getDay() === 1;
    };

    return (
        <div className="flex flex-col h-full">
            <h2 className="font-heading text-3xl md:text-4xl text-gold italic text-center mb-8">When shall we expect you?</h2>

            <div className="flex-1 flex flex-col md:flex-row gap-12 text-sm justify-center max-w-4xl mx-auto w-full">
                {/* Calendar */}
                <div className="w-full md:w-1/2">
                    <div className="flex justify-between items-center mb-6">
                        <button onClick={prevMonth} className="text-gold hover:text-white transition"><ChevronLeft size={20} /></button>
                        <span className="font-accent text-white tracking-widest uppercase">
                            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </span>
                        <button onClick={nextMonth} className="text-gold hover:text-white transition"><ChevronRight size={20} /></button>
                    </div>

                    <div className="grid grid-cols-7 gap-2 text-center mb-2">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                            <span key={d} className="font-accent text-text-muted text-xs">{d}</span>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-y-3 gap-x-2 text-center relative">
                        {Array(firstDay).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
                        {Array(daysInMonth).fill(null).map((_, i) => {
                            const day = i + 1;
                            const disabled = isDateDisabled(day);
                            const selected = isDateSelected(day);
                            const isToday = day === today.getDate() && currentMonth.getMonth() === today.getMonth();

                            return (
                                <button
                                    key={day}
                                    onClick={() => handleDateSelect(day)}
                                    disabled={disabled}
                                    className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center transition-colors
                    ${disabled ? 'text-text-muted cursor-not-allowed opacity-30' : 'hover:bg-[rgba(212,175,55,0.2)]'}
                    ${selected ? 'bg-gold text-deep-black font-bold hover:bg-gold-light' : 'text-text-primary'}
                    ${isToday && !selected ? 'border border-gold text-gold' : ''}
                  `}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Time Slots */}
                <div className="w-full md:w-1/2">
                    <div className="font-accent text-text-secondary tracking-widest uppercase mb-6 text-center md:text-left">
                        Select Time
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {times.map(t => {
                            const selected = data.time === t;
                            // Mock scarce seats
                            const scarce = t === '19:30' || t === '20:00';
                            return (
                                <button
                                    key={t}
                                    disabled={!data.date}
                                    onClick={() => update({ time: t })}
                                    className={`py-2 px-1 rounded-full relative transition-colors disabled:opacity-30 disabled:cursor-not-allowed border
                    ${selected ? 'bg-gold border-gold text-deep-black font-bold' : 'bg-transparent border-[rgba(212,175,55,0.4)] text-text-primary hover:border-gold'}
                  `}
                                >
                                    {t}
                                    {scarce && !selected && (
                                        <span className="absolute -top-2 -right-2 bg-[#b30047] text-white text-[9px] px-1.5 rounded-full z-10 font-accent uppercase">Last seats</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                    {!data.date && <p className="text-text-muted text-xs mt-6 text-center md:text-left italic">Select a date first</p>}
                </div>
            </div>

            <div className="mt-12 flex justify-center">
                <GoldButton onClick={onNext} disabled={!data.date || !data.time}>
                    Continue &rarr;
                </GoldButton>
            </div>
        </div>
    );
};

export default Step1DateTime;
