import React from 'react';

const POPULAR_BRANDS = ['The Ordinary', 'CeraVe', 'La Roche-Posay', 'Glow Recipe'];

interface HeroProps {
    onPopularBrandClick: (brand: string) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onPopularBrandClick, searchTerm, setSearchTerm }) => {

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Filtering happens on input change, so form submission can be empty.
    };
    
    return (
        <div 
            className="relative bg-cover bg-center text-center text-white py-24 px-4 sm:py-32"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=2070&auto=format&fit=crop')" }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                    Skincare Deals, Simplified.
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mt-4 mb-8">
                    We track the best skincare deals in the UK, so you don't have to. Never miss a discount on your favourite brands again.
                </p>

                <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto mb-6">
                    <div className="relative">
                        <svg aria-hidden="true" className="absolute w-5 h-5 text-gray-400 left-4 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search products, brands..."
                            className="w-full p-4 pl-11 pr-28 rounded-full border border-gray-600 bg-white bg-opacity-20 text-white placeholder-gray-300 focus:ring-pink-500 focus:border-pink-500 focus:bg-opacity-30 transition-colors"
                            aria-label="Search products"
                        />
                        <button
                            type="submit"
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-pink-500 text-white font-semibold py-2.5 px-6 rounded-full hover:bg-pink-600 transition-colors"
                        >
                            Search
                        </button>
                    </div>
                </form>

                <div className="text-sm text-gray-200">
                    <span className="font-semibold text-gray-300">Popular:</span>{' '}
                    {POPULAR_BRANDS.map((brand, index) => (
                        <React.Fragment key={brand}>
                            <button
                                onClick={() => onPopularBrandClick(brand)}
                                className="text-white hover:underline bg-transparent border-none p-0 cursor-pointer"
                            >
                                {brand}
                            </button>
                            {index < POPULAR_BRANDS.length - 1 && ', '}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Hero;
