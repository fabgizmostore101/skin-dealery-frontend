import { BlogPost } from './types';

export const CATEGORIES: string[] = ['Creams', 'Cleansers', 'Serums', 'Sun Protection', 'Essence', 'Exfoliators'];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'The Ultimate Guide to Hyaluronic Acid',
    excerpt: 'Discover why this powerhouse ingredient is a must-have in your skincare routine for hydrated, plump skin.',
    imageUrl: 'https://images.unsplash.com/photo-1608729591152-3a388f4b26da?q=80&w=600&h=400&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 2,
    title: 'Niacinamide: The Secret to a Brighter Complexion',
    excerpt: 'Learn how Niacinamide can transform your skin by tackling everything from pores to uneven skin tone.',
    imageUrl: 'https://images.unsplash.com/photo-1557852643-a757b4a16518?q=80&w=600&h=400&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 3,
    title: 'SPF Explained: Everything You Need to Know',
    excerpt: 'Sunscreen is non-negotiable. We break down the difference between mineral and chemical sunscreens.',
    imageUrl: 'https://images.unsplash.com/photo-1556912922-64abb5d39e29?q=80&w=600&h=400&auto=format&fit=crop',
    link: '#',
  },
];
