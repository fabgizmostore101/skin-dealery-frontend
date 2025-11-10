import React, { useRef } from 'react';
import { Deal } from '../types';
import DealCard from './DealCard';

interface ProductCarouselProps {
    deals: Deal[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ deals }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    
    if (!deals || deals.length === 0) return null;

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">New Product Listings</h2>
            <div className="relative group">
                <div 
                    ref={containerRef} 
                    className="flex space-x-4 overflow-x-auto snap-x snap-mandatory py-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <style>{`
                        .snap-x::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                    {deals.map((deal) => (
                        <div key={deal.id} className="snap-center w-11/12 sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0">
                            <DealCard deal={deal} />
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => containerRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 shadow-md hover:bg-opacity-100 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Previous Deal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={() => containerRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 shadow-md hover:bg-opacity-100 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Next Deal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ProductCarousel;
