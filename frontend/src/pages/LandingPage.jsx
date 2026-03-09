import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import ExperienceNumbers from '../components/sections/ExperienceNumbers';
import ExperienceCarousel from '../components/sections/ExperienceCarousel';
import MenuShowcase from '../components/sections/MenuShowcase';
import AmbianceGallery from '../components/sections/AmbianceGallery';
import BookingCTAInterstitial from '../components/sections/BookingCTAInterstitial';
import TeamSection from '../components/sections/TeamSection';
import TestimonialsCarousel from '../components/sections/TestimonialsCarousel';
import LocationSection from '../components/sections/LocationSection';
import BookingWizard from '../components/booking/BookingWizard';
import { useGeneratedImages } from '../hooks/useGeneratedImages';

const LandingPage = () => {
    const { hero, dishes, ambiance, chefs, badge, loading } = useGeneratedImages();
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    // Custom Cursor state
    const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setCursorPos({ x: e.clientX, y: e.clientY });
        };

        // Add hover detect logic for interactive elements
        const handleMouseOver = (e) => {
            if (e.target.closest('button, a, input, [role="button"]')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    if (loading) {
        return (
            <div className="w-full h-screen bg-deep-black flex items-center justify-center">
                <div className="w-16 h-16 border-t-2 border-b-2 border-gold rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-deep-black relative">
            {/* Custom Cursor */}
            <div
                className={`custom-cursor hidden md:block ${isHovering ? 'hover' : ''}`}
                style={{ left: cursorPos.x, top: cursorPos.y }}
            />

            <Navbar onReserveClick={() => setIsBookingModalOpen(true)} />

            <main>
                <HeroSection
                    heroImage={hero}
                    onReserveClick={() => setIsBookingModalOpen(true)}
                    onMenuClick={() => {
                        document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                />
                <ExperienceNumbers />
                <ExperienceCarousel images={ambiance} />
                <MenuShowcase dishes={dishes} />
                <AmbianceGallery images={ambiance} />
                <BookingCTAInterstitial
                    image={ambiance?.[0]}
                    onReserveClick={() => setIsBookingModalOpen(true)}
                />
                <TeamSection chefs={chefs} />
                <TestimonialsCarousel />
                <LocationSection />
            </main>

            <Footer onReserveClick={() => setIsBookingModalOpen(true)} />

            {/* Booking Modal */}
            {isBookingModalOpen && (
                <BookingWizard onClose={() => setIsBookingModalOpen(false)} />
            )}
        </div>
    );
};

export default LandingPage;
