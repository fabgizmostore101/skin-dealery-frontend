import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-pink-500 mx-auto"></div>
                <h2 className="text-2xl font-semibold text-pink-700 mt-4">Loading Deals...</h2>
                <p className="text-gray-500">Finding the best prices for you!</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
