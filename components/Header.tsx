import React, { useState } from 'react';

interface HeaderProps {
    categories: string[];
    onCategoryClick: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({ categories, onCategoryClick }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="bg-black shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Left: Logo */}
                <div className="flex-1 flex justify-start">
                     <a href="/" className="flex items-center gap-2 group">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7 text-pink-400 group-hover:text-pink-500 transition-colors"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10 2C5 5, 5 15, 10 18C15 15, 15 5, 10 2Z" />
                        </svg>
                        <span
                            className="text-2xl font-bold text-white group-hover:text-pink-400 transition-colors"
                            style={{ fontFamily: 'Georgia, serif' }}
                        >
                            Skin Dealery
                        </span>
                    </a>
                </div>

                {/* Center: Desktop Navigation */}
                <nav className="hidden md:flex flex-1 justify-center items-center space-x-6 lg:space-x-8">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => onCategoryClick(category)}
                            className="relative group text-white font-bold text-lg uppercase tracking-wider py-2 whitespace-nowrap"
                        >
                            {category}
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                        </button>
                    ))}
                </nav>

                {/* Right: Mobile Menu Button */}
                <div className="flex-1 flex justify-end">
                    <button
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <nav className="md:hidden bg-black border-t border-gray-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => {
                                    onCategoryClick(category);
                                    setIsMobileMenuOpen(false);
                                }}
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-bold text-white hover:text-pink-400 hover:bg-gray-800"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    );
}

export default Header;
