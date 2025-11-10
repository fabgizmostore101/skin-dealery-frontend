import React from 'react';
import { Deal } from '../types';
import DealCard from './DealCard';

interface DealGridProps {
    deals: Deal[];
}

const DealGrid: React.FC<DealGridProps> = ({ deals }) => {
    if (deals.length === 0) {
        return (
            <div className="text-center py-16 px-6 bg-white rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-700">No Deals Found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters to find more great skincare deals!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {deals.map(deal => (
                <DealCard key={deal.id} deal={deal} />
            ))}
        </div>
    );
}

export default DealGrid;
