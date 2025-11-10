import { Deal, Retailer, BlogPost } from '../types';

// IMPORTANT: This URL MUST point to your WordPress backend.
const WORDPRESS_URL = 'https://admin.theskindealery.com'; 

const WOOCOMMERCE_API_ENDPOINT = `${WORDPRESS_URL}/wp-json/wc/v3/products`;
const WP_POSTS_API_ENDPOINT = `${WORDPRESS_URL}/wp-json/wp/v2/posts`;

const getRetailerFromUrl = (url: string): Retailer | undefined => {
    if (!url) return undefined;
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('amazon')) return 'Amazon';
    if (lowerUrl.includes('boots')) return 'Boots';
    if (lowerUrl.includes('lookfantastic')) return 'Lookfantastic';
    if (lowerUrl.includes('cultbeauty')) return 'Cult Beauty';
    return undefined;
};

const wooProductToDeal = (product: any): Deal | null => {
    try {
        if (!product.on_sale || !product.sale_price || !product.regular_price) {
            return null;
        }

        const originalPrice = parseFloat(product.regular_price);
        const discountedPrice = parseFloat(product.sale_price);

        if (isNaN(originalPrice) || isNaN(discountedPrice) || originalPrice <= discountedPrice) {
            return null;
        }

        const brandAttribute = product.attributes?.find((attr: any) => attr.name === 'Brand');
        const affiliateUrl = product.external_url || product.permalink || '#';
        const description = product.short_description ? product.short_description.replace(/<[^>]*>?/gm, '') : 'No description available.';

        return {
            id: product.id,
            productName: product.name,
            brand: brandAttribute ? brandAttribute.options?.[0] : undefined,
            category: product.categories?.length > 0 ? product.categories[0].name : 'Uncategorized',
            imageUrl: product.images?.length > 0 ? product.images[0].src : 'https://via.placeholder.com/400',
            originalPrice: originalPrice,
            discountedPrice: discountedPrice,
            discountPercentage: Math.round(((originalPrice - discountedPrice) / originalPrice) * 100),
            retailer: getRetailerFromUrl(affiliateUrl),
            affiliateUrl: affiliateUrl,
            description: description,
        };
    } catch (e) {
        console.error("Failed to process product:", product, e);
        return null;
    }
};

const wpPostToBlogPost = (post: any): BlogPost => {
    return {
        id: post.id,
        title: post.title?.rendered || 'Untitled Post',
        excerpt: post.excerpt?.rendered.replace(/<[^>]*>?/gm, '') || '',
        imageUrl: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/600x400',
        link: post.link,
    };
}

export const apiService = {
  getDeals: async (): Promise<Deal[]> => {
    try {
        const apiUrl = `${WOOCOMMERCE_API_ENDPOINT}?on_sale=true&per_page=100&status=publish`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
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
  
  getBlogPosts: async (): Promise<BlogPost[]> => {
    try {
        const apiUrl = `${WP_POSTS_API_ENDPOINT}?_embed&per_page=3`;
        const response = await fetch(apiUrl);
         if (!response.ok) {
            throw new Error(`Failed to fetch from WordPress Posts. Status: ${response.status}`);
        }
        const posts: any[] = await response.json();
        return posts.map(wpPostToBlogPost);
    } catch (error) {
        console.error("Error in apiService.getBlogPosts:", error);
        return [];
    }
  }
};
