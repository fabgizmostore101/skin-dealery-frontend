import { Deal, Retailer, BlogPost } from '../types';

// CORRECTED: This now points to your WordPress backend server.
const WORDPRESS_URL = 'https://admin.theskindealery.com'; 

const WOOCOMMERCE_API_ENDPOINT = `${WORDPRESS_URL}/wp-json/wc/v3/products`;
const WP_API_ENDPOINT = `${WORDPRESS_URL}/wp-json/wp/v2`;

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
        productName: product.name || 'Untitled Product',
        brand: brandAttribute ? brandAttribute.options?.[0] : undefined,
        category: product.categories?.[0]?.name || 'Uncategorized',
        imageUrl: product.images?.[0]?.src || 'https://via.placeholder.com/400',
        originalPrice: originalPrice,
        discountedPrice: discountedPrice,
        discountPercentage: Math.round(((originalPrice - discountedPrice) / originalPrice) * 100),
        retailer: getRetailerFromUrl(affiliateUrl),
        affiliateUrl: affiliateUrl,
        description: description,
    };
};

const wpPostToBlogPost = (post: any): BlogPost => {
    const excerpt = post.excerpt?.rendered ? post.excerpt.rendered.replace(/<[^>]*>?/gm, '').trim() : 'No excerpt available.';
    const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || post.jetpack_featured_media_url || 'https://via.placeholder.com/600x400';
    
    return {
        id: post.id,
        title: post.title?.rendered || 'Untitled Post',
        excerpt: excerpt,
        imageUrl: imageUrl,
        link: post.link || '#',
    };
};

const fetchWithUserAgent = async (url: string) => {
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };
    return fetch(url, { headers });
};

export const apiService = {
  getDeals: async (): Promise<Deal[]> => {
    try {
        const apiUrl = `${WOOCOMMERCE_API_ENDPOINT}?on_sale=true&per_page=100&status=publish`;
        const response = await fetchWithUserAgent(apiUrl);
        
        if (!response.ok) {
            console.error(`WooCommerce API Error: ${response.status} ${response.statusText}`);
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
          const apiUrl = `${WP_API_ENDPOINT}/posts?_embed&per_page=3&status=publish`;
          const response = await fetchWithUserAgent(apiUrl);

          if (!response.ok) {
              console.error(`WordPress API Error: ${response.status} ${response.statusText}`);
              throw new Error(`Failed to fetch from WordPress. Status: ${response.status}`);
          }

          const posts: any[] = await response.json();
          return posts.map(wpPostToBlogPost);
      } catch (error) {
          console.error("Error in apiService.getBlogPosts:", error);
          return [];
      }
  },
};