import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import postsData from '../data/posts.json';

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('Latest');
  const [visibleCount, setVisibleCount] = useState(15);

  // Read search param from URL if coming from a post page
  useEffect(() => {
    if (router.query.q) {
      setSearchTerm(router.query.q);
    }
  }, [router.query.q]);

  // Extract unique categories
  const categories = [...new Set(postsData.flatMap(p => p.categories))];

  // Filter & Sort Logic
  const filteredPosts = postsData.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
      post.categories.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesCategory = activeCategory === 'All' || post.categories.includes(activeCategory);
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortOrder === 'Popular') return b.views - a.views;
    return new Date(b.date) - new Date(a.date); // Latest
  });

  return (
    <div>
      <Header 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sort Filter Dropdown */}
        <div className="flex justify-end mb-6">
          <select 
            className="bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-xl outline-none focus:ring-2 focus:ring-pink-300 cursor-pointer transition-shadow hover:shadow-md"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="Latest">🔥 Latest</option>
            <option value="Popular">⭐ Popular</option>
          </select>
        </div>

        {/* Masonry Grid Setup using CSS Columns */}
        {filteredPosts.length > 0 ? (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6">
            {filteredPosts.slice(0, visibleCount).map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-500">No ideas found. Try another search!</h2>
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredPosts.length && (
          <div className="flex justify-center mt-12 mb-8">
            <button 
              onClick={() => setVisibleCount(c => c + 15)}
              className="bg-gray-900 text-white font-bold py-3 px-8 rounded-full hover:bg-pink-600 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Load More Ideas
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
