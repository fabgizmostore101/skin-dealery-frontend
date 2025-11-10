import React from 'react';
import { Filters } from '../types';

interface FilterSidebarProps {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    categories: string[];
    brands: string[];
    retailers: string[];
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters, categories, brands, retailers, isOpen, setIsOpen }) => {

    const handleCategoryChange = (category: string) => {
        setFilters(prev => ({ ...prev, category }));
    };

    const handleCheckboxChange = (type: 'brands' | 'retailers', value: string) => {
        setFilters(prev => {
            const currentValues = prev[type];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(item => item !== value)
                : [...currentValues, value];
            return { ...prev, [type]: newValues };
        });
    };
    
    const filterContent = (
         <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
            <div>
                <h3 className="font-bold text-lg mb-3 border-b pb-2">Category</h3>
                <div className="space-y-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${filters.category === cat ? 'bg-pink-500 text-white font-semibold' : 'hover:bg-pink-100'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-bold text-lg mb-3 border-b pb-2">Brand</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {brands.map(brand => (
                        <label key={brand} className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-pink-500 focus:ring-pink-400"
                                checked={filters.brands.includes(brand)}
                                onChange={() => handleCheckboxChange('brands', brand)}
                            />
                            <span className="text-sm text-gray-700">{brand}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-bold text-lg mb-3 border-b pb-2">Retailer</h3>
                <div className="space-y-2">
                    {retailers.map(retailer => (
                        <label key={retailer} className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-pink-500 focus:ring-pink-400"
                                checked={filters.retailers.includes(retailer)}
                                onChange={() => handleCheckboxChange('retailers', retailer)}
                            />
                            <span className="text-sm text-gray-700">{retailer}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
    
    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block lg:w-64 xl:w-72 flex-shrink-0">
                {filterContent}
            </aside>

            {/* Mobile Drawer */}
            <div className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                 <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}></div>
                 <div className="relative w-72 h-full bg-white p-4 overflow-y-auto">
                    {filterContent}
                 </div>
            </div>
        </>
    );
};

export default FilterSidebar;
