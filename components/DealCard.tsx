import React from 'react';
import { Deal } from '../types';
import { AmazonIcon, BootsIcon, CultBeautyIcon, LookfantasticIcon } from './icons';

interface DealCardProps {
    deal: Deal;
}

const RetailerLogo: React.FC<{ retailer?: string }> = ({ retailer }) => {
    switch (retailer) {
        case 'Amazon': return <AmazonIcon className="h-6" />;
        case 'Boots': return <BootsIcon className="h-5" />;
        case 'Lookfantastic': return <LookfantasticIcon className="h-5" />;
        case 'Cult Beauty': return <CultBeautyIcon className="h-5" />;
        default: return <span className="text-sm font-semibold">{retailer || 'Unknown'}</span>;
    }
};

const DealCard: React.FC<DealCardProps> = ({ deal }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="relative h-56 bg-gray-50">
                <a href={deal.affiliateUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-full p-2">
                    <img src={deal.imageUrl} alt={deal.productName} className="w-full h-full object-contain" />
                </a>
                <div className="absolute top-0 right-0 bg-pink-500 text-white font-bold text-sm px-3 py-1 rounded-bl-lg">
                    {deal.discountPercentage}% OFF
                </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-2">
                     <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{deal.brand || 'General'}</p>
                     <RetailerLogo retailer={deal.retailer} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 flex-grow">
                    <a href={deal.affiliateUrl} target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition-colors">
                        {deal.productName}
                    </a>
                </h3>
                
                <div className="flex items-baseline gap-2 mb-4">
                    <p className="text-2xl font-extrabold text-pink-600">£{deal.discountedPrice.toFixed(2)}</p>
                    <p className="text-md text-gray-400 line-through">£{deal.originalPrice.toFixed(2)}</p>
                </div>
                
                <div className="mt-auto space-y-3">
                     <div className="h-24 overflow-hidden">
                        <p className="text-sm text-gray-600">
                           {deal.description}
                        </p>
                    </div>
                    
                    <a
                        href={deal.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-pink-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-600 transition-transform hover:scale-105"
                    >
                        Shop Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DealCard;
