/**
 * Static high-quality images from Unsplash to replace canvas placeholders.
 */

// 1. Restaurant Hero Image Generator
export const generateHeroImage = () => {
    // High quality moody restaurant interior
    return 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1920&auto=format&fit=crop';
};

// 2. Dish Card Image Generator (6 unique)
export const generateDishImages = () => {
    const dishes = [
        { name: 'Pan-Seared Wagyu', src: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop' },
        { name: 'Lobster Thermidor', src: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?q=80&w=800&auto=format&fit=crop' }, // Valid lobster image
        { name: 'Black Truffle Risotto', src: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop' }, // Valid Risotto/Pasta
        { name: 'Foie Gras Torchon', src: 'https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=800&auto=format&fit=crop' },
        { name: 'Valrhona Soufflé', src: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?q=80&w=800&auto=format&fit=crop' }, // Valid chocolate dessert
        { name: 'Oysters Rockefeller', src: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop' }, // Valid oysters image
    ];

    return dishes;
};

// 3. Ambiance Gallery Generator (8 unique)
export const generateAmbianceImages = () => {
    return [
        'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1505826759037-406b40feb4cd?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?q=80&w=800&auto=format&fit=crop'
    ];
};

// 4. Team Portrait Generator (3 unique)
export const generateChefPortraits = () => {
    const chefs = [
        { name: 'Chef Étienne Moreau', src: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600&auto=format&fit=crop' },
        { name: 'Chef Isabelle Laurent', src: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=600&auto=format&fit=crop' },
        { name: 'Chef Marco Bellini', src: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=600&auto=format&fit=crop' } // Valid Pastry Chef / Baker Portrait
    ];
    return chefs;
};

// 5. Award Badge Generator (SVG)
export const generateStarBadge = () => {
    const svg = `
<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
  <circle cx="60" cy="60" r="56" fill="none" stroke="#D4AF37" stroke-width="2" stroke-dasharray="4 4" />
  <circle cx="60" cy="60" r="50" fill="none" stroke="#D4AF37" stroke-width="1" />
  <path d="M60 25 L65 45 L85 45 L68 57 L75 75 L60 63 L45 75 L52 57 L35 45 L55 45 Z" fill="#D4AF37" />
  <path d="M35 55 L38 65 L48 65 L40 71 L43 80 L35 74 L27 80 L30 71 L22 65 L32 65 Z" fill="#D4AF37" transform="scale(0.6) translate(10, 30)" />
  <path d="M85 55 L88 65 L98 65 L90 71 L93 80 L85 74 L77 80 L80 71 L72 65 L82 65 Z" fill="#D4AF37" transform="scale(0.6) translate(80, 30)" />
  <text x="60" y="100" font-family="Montserrat, sans-serif" font-size="10" fill="#F5F0E8" text-anchor="middle" letter-spacing="2">EST. 2008</text>
</svg>`;

    return `data:image/svg+xml;base64,${btoa(svg)}`;
};
