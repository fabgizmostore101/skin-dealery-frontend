import React from 'react';
import { BlogPost } from '../types';

interface BlogSectionProps {
    posts: BlogPost[];
}

const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
    if (!posts || posts.length === 0) {
      return (
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">From The Blog</h2>
            <p className="text-gray-500">No blog posts available yet. Check back soon!</p>
        </div>
      );
    }

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">From The Blog</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {posts.map(post => (
                    <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        <a href={post.link} target="_blank" rel="noopener noreferrer" className="block">
                            <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{post.title}</h3>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                                <span className="font-semibold text-pink-500 hover:text-pink-600">Read More &rarr;</span>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogSection;
