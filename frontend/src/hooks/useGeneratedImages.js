import { useState, useEffect } from 'react';
import {
    generateHeroImage,
    generateDishImages,
    generateAmbianceImages,
    generateChefPortraits,
    generateStarBadge
} from '../utils/imageGenerator';

export const useGeneratedImages = () => {
    const [images, setImages] = useState({
        hero: null,
        dishes: [],
        ambiance: [],
        chefs: [],
        badge: null,
        loading: true
    });

    useEffect(() => {
        let mounted = true;

        const generateAll = async () => {
            // Offload to macro task to avoid blocking main thread completely on mount
            setTimeout(() => {
                if (!mounted) return;

                try {
                    const hero = generateHeroImage();
                    const dishes = generateDishImages();
                    const ambiance = generateAmbianceImages();
                    const chefs = generateChefPortraits();
                    const badge = generateStarBadge();

                    setImages({
                        hero,
                        dishes,
                        ambiance,
                        chefs,
                        badge,
                        loading: false
                    });
                } catch (error) {
                    console.error("Error generating images:", error);
                    setImages(prev => ({ ...prev, loading: false }));
                }
            }, 0);
        };

        generateAll();

        return () => {
            mounted = false;
        };
    }, []);

    return images;
};
