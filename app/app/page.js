"use client"; // Client-Side rendering ke liye zaroori hai

import { useState, useEffect } from 'react';
import { FaSearch, FaMoon, FaUserCircle, FaTimes, FaLayerGroup } from 'react-icons/fa';

// --- DATA SECTION ---
const INITIAL_POSTS = [
  {
    id: 1,
    img: "https://www.rogerebert.com/wp-content/uploads/2026/02/MV5BZDVlYWM2YjAtZTUxMS00OWEwLWI4YWMtNmFhMjU3MDY4OGJkXkEyXkFqcGc@._V1_FMjpg_UX1000_-768x1152-jpg.webp",
    title: "Movie Poster 2026",
    desc: "Official poster for the upcoming movie.\n\nDownload: https://tghubfile.pages.dev/",
    categories: ["movie", "art", "wallpaper"]
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600",
    title: "Green Mountains",
    desc: "Nature view.",
    categories: ["nature", "wallpaper"]
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
    title: "Tech Circuit",
    desc: "Modern technology.",
    categories: ["tech", "wallpaper"]
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600",
    title: "Abstract Art",
    desc: "Colorful abstract.",
    categories: ["art", "wallpaper"]
  }
];

export default function Home() {
  const [posts, setPosts] = useState(INITIAL_POSTS); // Main Data
  const [displayPosts, setDisplayPosts] = useState(INITIAL_POSTS); // Filtered Data
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedPost, setSelectedPost] = useState(null); // Modal State
  const [theme, setTheme] = useState('light');

  // Load More Function
  const loadMore = () => {
    // Demo: Adding same posts again with new IDs
    const newPosts = INITIAL_POSTS.map(p => ({ ...p, id: Math.random() }));
    setPosts(prev => [...prev, ...newPosts]);
  };

  // Filter & Search Logic
  useEffect(() => {
    let filtered = posts;

    // Filter by Category
    if (activeFilter !== 'all') {
      filtered = filtered.filter(p => p.categories.includes(activeFilter));
    }

    // Filter by Search
    if (search) {
      filtered = filtered.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    }

    setDisplayPosts(filtered);
  }, [activeFilter, search, posts]);

  // Theme Toggle
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  // Helper: Convert URL to Links
  const formatDesc = (text) => {
    const urlRegex = /((https?:\/\/)|(www\.))[^\s]+/g;
    return text.split(urlRegex).map((part, i) => {
      if (part && part.match(urlRegex)) {
        return <a key={i} href={part} target="_blank" className="text-blue-500 underline">{part}</a>;
      }
      return part;
    });
  };

  return (
    <main>
      {/* HEADER */}
      <header>
        <div className="logo" onClick={() => window.location.reload()}>
          <FaLayerGroup /> PinFlow
        </div>
        <div className="search-bar">
          <FaSearch color="#777" />
          <input 
            type="text" 
            placeholder="Search..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="desktop-nav" style={{display:'flex', gap:'15px'}}>
          <div className="icon-btn" onClick={toggleTheme}><FaMoon /></div>
          <div className="icon-btn"><FaUserCircle /></div>
        </div>
      </header>

      {/* FILTERS */}
      <div className="filter-bar">
        {['all', 'nature', 'tech', 'art', 'movie', 'wallpaper'].map(cat => (
          <div 
            key={cat} 
            className={`chip ${activeFilter === cat ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </div>
        ))}
      </div>

      {/* GRID */}
      <div className="container">
        <div className="masonry">
          {displayPosts.map((post, index) => (
            <div key={index} className="pin" onClick={() => setSelectedPost(post)}>
              <img src={post.img} alt={post.title} loading="lazy" />
            </div>
          ))}
        </div>
        
        <button className="load-btn" onClick={loadMore}>Load More</button>
      </div>

      {/* MODAL */}
      {selectedPost && (
        <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="close-btn" onClick={() => setSelectedPost(null)}>
              <FaTimes />
            </div>
            
            <div className="modal-left">
              <img src={selectedPost.img} alt={selectedPost.title} />
            </div>
            
            <div className="modal-right">
              <h1 className="modal-title">{selectedPost.title}</h1>
              
              <div style={{marginBottom:'15px'}}>
                {selectedPost.categories.map(c => (
                  <span key={c} className="cat-badge">{c}</span>
                ))}
              </div>

              <div className="modal-desc" style={{whiteSpace: 'pre-wrap'}}>
                 {/* Simple link formatting hack for demo */}
                 {selectedPost.desc.split(/\s+/).map((word, i) => 
                    word.startsWith('http') ? 
                    <a key={i} href={word} target="_blank" rel="noopener noreferrer">{word} </a> : 
                    word + ' '
                 )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
