import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterSidebar from './components/FilterSidebar';
import DealGrid from './components/DealGrid';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ProductCarousel from './components/ProductCarousel';
import BlogSection from './components/BlogSection';
import { apiService } from './services/apiService';
import { Deal, Filters, SortOption, BlogPost } from './types';
import { CATEGORIES } from './constants';

const App: React.FC = () => {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortOption, setSortOption] = useState<SortOption>('discount');
    const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
    
    const [filters, setFilters] = useState<Filters>({
        category: '',
        brands: [],
        retailers: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [fetchedDeals, fetchedPosts] = await Promise.all([
                    apiService.getDeals(),
                    apiService.getBlogPosts()
                ]);
                setDeals(fetchedDeals);
                setBlogPosts(fetchedPosts);
            } catch (err) {
                setError('Failed to fetch data. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const allBrands = useMemo(() => {
        const brandsSet = new Set<string>();
        deals.forEach(deal => {
            if (deal.brand) {
                brandsSet.add(deal.brand);
            }
        });
        return Array.from(brandsSet).sort();
    }, [deals]);

    const allRetailers = useMemo(() => {
        const retailersSet = new Set<string>();
        deals.forEach(deal => {
            if (deal.retailer) {
                retailersSet.add(deal.retailer);
            }
        });
        return Array.from(retailersSet).sort();
    }, [deals]);

    const filteredAndSortedDeals = useMemo(() => {
        let filtered = deals.filter(deal => {
            if (filters.category && deal.category.toLowerCase() !== filters.category.toLowerCase()) {
                return false;
            }
            if (filters.brands.length > 0 && (!deal.brand || !filters.brands.includes(deal.brand))) {
                return false;
            }
            if (filters.retailers.length > 0 && (!deal.retailer || !filters.retailers.includes(deal.retailer))) {
                return false;
            }
            const lowerSearchTerm = searchTerm.toLowerCase();
            if (lowerSearchTerm && 
                !deal.productName.toLowerCase().includes(lowerSearchTerm) &&
                !(deal.brand && deal.brand.toLowerCase().includes(lowerSearchTerm)) &&
                !deal.description.toLowerCase().includes(lowerSearchTerm)
            ) {
                return false;
            }
            return true;
        });

        switch (sortOption) {
            case 'discount':
                filtered.sort((a, b) => b.discountPercentage - a.discountPercentage);
                break;
            case 'priceAsc':
                filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
                break;
            case 'priceDesc':
                filtered.sort((a, b) => b.discountedPrice - a.discountedPrice);
                break;
            default:
                break;
        }

        return filtered.slice(0, 30);
    }, [deals, filters, searchTerm, sortOption]);

    const handleCategoryClick = (category: string) => {
        setFilters(prev => ({ ...prev, category, brands: [], retailers: [] }));
        setSearchTerm('');
    };

    const handlePopularBrandClick = (brand: string) => {
        setFilters({ category: '', brands: [brand], retailers: [] });
        setSearchTerm(brand);
    };
    
    const featuredDeals = useMemo(() => {
        return [...deals].sort((a, b) => b.discountPercentage - a.discountPercentage).slice(0, 10);
    }, [deals]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    return (
        <div className="bg-white min-h-screen">
            <Header categories={CATEGORIES} onCategoryClick={handleCategoryClick} />
            
            <main>
                <Hero 
                    onPopularBrandClick={handlePopularBrandClick} 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm}
                />

                <div className="py-12 space-y-16">
                    <ProductCarousel deals={featuredDeals} />

                    <div className="container mx-auto px-4">
                         <div className="flex flex-col lg:flex-row gap-8">
                             <FilterSidebar 
                                 filters={filters}
                                 setFilters={setFilters}
                                 brands={allBrands}
                                 retailers={allRetailers}
                                 isOpen={isFilterSidebarOpen}
                                 setIsOpen={setIsFilterSidebarOpen}
                             />

                             <div className="flex-1">
                                 <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-3xl font-bold text-gray-800">
                                       Featured Deals
                                    </h2>
                                     
                                    <div className="flex items-center gap-4">
                                        <button 
                                            onClick={() => setIsFilterSidebarOpen(true)}
                                            className="lg:hidden bg-white border border-gray-300 rounded-md p-2 hover:bg-gray-100"
                                            aria-label="Open filters"
                                        >
                                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 12h10m-7 8h4" />
                                            </svg>
                                        </button>
                                        
                                        <div className="relative">
                                             <select 
                                                 value={sortOption}
                                                 onChange={(e) => setSortOption(e.target.value as SortOption)}
                                                 className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                                                 aria-label="Sort deals"
                                             >
                                                 <option value="discount">Sort by Discount</option>
                                                 <option value="priceAsc">Sort by Price: Low to High</option>
                                                 <option value="priceDesc">Sort by Price: High to Low</option>
                                             </select>
                                              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                  <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                              </span>
                                        </div>
                                    </div>
                                 </div>
                                 
                                {filteredAndSortedDeals.length > 0 && <p className="text-gray-600 mb-6">
                                  Showing {filteredAndSortedDeals.length} deals.
                                </p>}

                                <DealGrid deals={filteredAndSortedDeals} />
                             </div>
                         </div>
                    </div>
                    
                    <BlogSection posts={blogPosts} />
                </div>

            </main>

            <Footer />
        </div>
    );
};