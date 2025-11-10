export type Retailer = 'Amazon' | 'Boots' | 'Lookfantastic' | 'Cult Beauty';
export type SortOption = 'discount' | 'priceAsc' | 'priceDesc';

export interface Deal {
  id: number;
  productName: string;
  brand?: string; // Brand may not always be available
  category: string;
  imageUrl: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  retailer?: Retailer; // Retailer may not always be available
  affiliateUrl: string;
  description: string;
}

export interface Filters {
    category: string;
    brands: string[];
    retailers: string[];
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  link: string;
}
