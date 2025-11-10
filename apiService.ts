import { Deal, Retailer } from '../types';

// IMPORTANT: This is the final domain for the live WordPress backend.
const WORDPRESS_URL = 'https://theskindealery.com'; 
const WOOCOMMERCE_API_ENDPOINT = `${WORDPRESS_URL}/wp-json/wc/v3/products`;

/**
 * Parses the retailer name from a given URL.
 * @param url - The product's affiliate URL.
 * @returns A Retailer name or undefined.
 */
const getRetailerFromUrl = (url: string): Retailer | undefined => {
    if (!url) return undefined;
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('amazon')) return 'Amazon';
    if (lowerUrl.includes('boots')) return 'Boots';
    if (lowerUrl.includes('lookfantastic')) return 'Lookfantastic';
    if (lowerUrl.includes('cultbeauty')) return 'Cult Beauty';
    return undefined;
};

/**
 * Maps a raw WooCommerce product object to our frontend Deal type.
 * @param product - A WooCommerce product object from the API.
 * @returns A Deal object or null if the product is not a valid deal.
 */
const wooProductToDeal = (product: any): Deal | null => {
    if (!product.on_sale || !product.sale_price || !product.regular_price) {
        return null;
    }

    const originalPrice = parseFloat(product.regular_price);
    const discountedPrice = parseFloat(product.sale_price);

    if (isNaN(originalPrice) || isNaN(discountedPrice) || originalPrice <= discountedPrice) {
        return null;
    }

    const brandAttribute = product.attributes.find((attr: any) => attr.name === 'Brand');
    const affiliateUrl = product.external_url || product.permalink || '#';

    // Strip HTML tags from description
    const description = product.short_description ? product.short_description.replace(/<[^>]*>?/gm, '') : 'No description available.';

    return {
        id: product.id,
        productName: product.name,
        brand: brandAttribute ? brandAttribute.options[0] : undefined,
        category: product.categories.length > 0 ? product.categories[0].name : 'Uncategorized',
        imageUrl: product.images.length > 0 ? product.images[0].src : 'https://via.placeholder.com/400',
        originalPrice: originalPrice,
        discountedPrice: discountedPrice,
        discountPercentage: Math.round(((originalPrice - discountedPrice) / originalPrice) * 100),
        retailer: getRetailerFromUrl(affiliateUrl),
        affiliateUrl: affiliateUrl,
        description: description,
    };
};

export const apiService = {
  /**
   * Fetches all on-sale products from the WooCommerce API.
   * @returns A Promise that resolves to an array of deals.
   */
  getDeals: async (): Promise<Deal[]> => {
    try {
        const apiUrl = `${WOOCOMMERCE_API_ENDPOINT}?on_sale=true&per_page=100&status=publish`;
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            console.error(`WooCommerce API Error: ${response.status} ${response.statusText}`);
            const errorBody = await response.text();
            console.error('Error Body:', errorBody);
            throw new Error(`Failed to fetch from WooCommerce. Status: ${response.status}`);
        }

        const products: any[] = await response.json();
        
        const deals = products.map(wooProductToDeal).filter((deal): deal is Deal => deal !== null);
        
        return deals;
    } catch (error) {
        console.error("Error in apiService.getDeals:", error);
        return [];
    }
  },
};
