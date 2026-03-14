import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Header({ searchTerm, setSearchTerm, activeCategory, setActiveCategory, categories }) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    const val = e.target.value;
    if (setSearchTerm) {
      setSearchTerm(val);
    } else {
      // If we are on a post page, redirect to home with query
      router.push(`/?q=${val}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer hover:animate-beat">
              <div className="w-10 h-10 bg-gradient-to-tr from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="ml-3 font-extrabold text-2xl tracking-tight text-gray-900 hidden sm:block">PinClone</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl px-6">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search by title, tag, or category..."
                value={searchTerm || ''}
                onChange={handleSearch}
                className="w-full bg-gray-100 hover:bg-gray-200 focus:bg-white text-gray-900 rounded-full pl-12 pr-4 py-3 outline-none focus:ring-4 focus:ring-pink-100 transition-all border border-transparent focus:border-pink-300"
              />
              <svg className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-hover:text-pink-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <button 
            className="md:hidden p-2 text-gray-500 hover:text-pink-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Category Pills & Filters (Only visible on Home) */}
        {categories && (
          <div className={`md:flex items-center justify-between pb-4 ${isMobileMenuOpen ? 'block' : 'hidden md:flex'}`}>
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {['All', ...categories].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                    activeCategory === cat 
                    ? 'bg-gray-900 text-white shadow-md transform scale-105' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
