import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black text-gray-400 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                         <a href="/" className="flex items-center gap-2 group justify-center md:justify-start mb-4">
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
                        <p className="text-sm">
                            Your one-stop shop for the best skincare deals in the UK. We find the discounts, you get the glow.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/privacy-policy" className="hover:text-pink-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="/terms-conditions" className="hover:text-pink-400 transition-colors">Terms & Conditions</a></li>
                            <li><a href="/affiliate-disclosure" className="hover:text-pink-400 transition-colors">Affiliate Disclosure</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Follow Us</h3>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <a href="#" aria-label="Facebook" className="hover:text-pink-400 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg>
                            </a>
                            <a href="#" aria-label="Instagram" className="hover:text-pink-400 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Skin Dealery. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
