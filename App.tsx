import { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, MessageSquare, Clock, Tag, X, ChevronLeft, ChevronRight, Share2, Bookmark, Folder, Compass, Sparkles } from 'lucide-react';

// --- Sample Data Types ---
interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  formattedDate: string;
  excerpt: string;
  content: string;
  image: string;
  gallery: string[];
  category: string;
  tags: string[];
  readingTime: string;
}

// --- Sample Posts ---
const SAMPLE_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Ultimate Guide to Alpine Trekking and Hidden Lakes',
    slug: 'alpine-trekking-hidden-lakes',
    date: '2026-02-15',
    formattedDate: 'February 15, 2026',
    excerpt: 'Discover the untouched beauty of the Swiss Alps, from turquoise glacier lakes to misty morning trails. This comprehensive guide covers everything you need to know about trekking the high passes.',
    content: `## The Majesty of the Swiss Alps

There is something profoundly humbling about standing at the foot of a giant, ancient mountain. The Swiss Alps offer some of the most spectacular, accessible, and yet challenging trekking routes in the world. 

Whether you are an experienced alpinist or a casual weekend hiker, the trails here offer rewards far beyond the physical effort required to traverse them.

### Finding the Turquoise Lakes

One of the highlights of high-altitude trekking is stumbling upon glacier-fed lakes. These water bodies, often nestled in cirques carved by ancient ice, possess an ethereal turquoise or emerald hue caused by "rock flour"—fine particles of silt suspended in the water.

*   **Lake Oeschinen:** Often cited as the most beautiful mountain lake in Switzerland. Surrounded by sheer cliffs, its water is cold, deep, and impossibly blue.
*   **The Bachalpsee:** A classic reflection of the Schreckhorn peaks can be seen here on a calm morning.
*   **Gelmersee:** Reached by one of the steepest funicular railways in Europe, this lake is a gateway to high-alpine climbing.

### Gear Up for Success

You cannot underestimate the weather in the mountains. A sunny morning can turn into a freezing blizzard by afternoon. Layering is your best defense:

1.  **Base Layer:** Moisture-wicking merino wool.
2.  **Mid Layer:** Insulating fleece or lightweight down.
3.  **Outer Layer:** GORE-TEX or similar waterproof and windproof shell.

Don't forget broken-in hiking boots, trekking poles (your knees will thank you), and a quality navigation system.

### Leaving No Trace

As we explore these pristine environments, it is our duty to protect them. The principles of Leave No Trace are paramount:
- Pack out all trash.
- Stay on designated trails to prevent erosion.
- Respect wildlife from a distance.

The mountains are calling, and we must go—but we must go responsibly.`,
    image: '/images/travel.jpg',
    gallery: [
      '/images/travel.jpg',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1483728642387-6c3bed6c9365?auto=format&fit=crop&w=800&q=80',
    ],
    category: 'Travel',
    tags: ['adventure', 'trekking', 'alps', 'hiking'],
    readingTime: '8 min read',
  },
  {
    id: '2',
    title: 'Aesthetic Brunch Culture: The Art of the Perfect Flatlay',
    slug: 'aesthetic-brunch-culture-flatlay',
    date: '2026-02-18',
    formattedDate: 'February 18, 2026',
    excerpt: 'Brunch is more than just a meal; it is a visual subculture. Learn how to style, shoot, and enjoy the ultimate aesthetic weekend brunch setup.',
    content: `## The Rise of the Social Brunch

The weekend brunch has evolved from a simple late-morning meal into a full-scale cultural and visual phenomenon. It combines culinary art with interior design, lighting, and community. 

To create the perfect aesthetic brunch experience, one must consider both the taste and the presentation.

### Master the Flatlay Photograph

The "Flatlay" or overhead shot has become the standard for food documentation. It flattens the scene, turning a table of food into a geometric composition. Here are some secrets to mastering it:

-   **Natural Light:** Always sit near a window. Side-lighting creates soft shadows and brings out the texture of sourdough and latte art.
-   **Composition:** Use the rule of thirds. Place your main dish off-center and balance it with smaller elements like espresso cups, cutlery, or a folded linen napkin.
-   **Variety of Shapes:** Mix circular plates with rectangular menus, tall glasses, and organic shapes like scattered berries.

### Menu Highlights

A true aesthetic brunch menu often centers around a few modern classics:

1.  **The Avocado Toast:** Topped with poached eggs, chili flakes, microgreens, and a drizzle of hot honey.
2.  **Shakshuka:** A vibrant skillet of spiced tomatoes and baked eggs.
3.  **The Perfect Latte:** Whether oat, almond, or dairy, the velvety microfoam and intricate tulip art are non-negotiable.

Food should feed both the body and the soul. By taking a moment to appreciate the visual beauty of our meals, we practice a form of culinary mindfulness.`,
    image: '/images/food.jpg',
    gallery: [
      '/images/food.jpg',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80',
    ],
    category: 'Lifestyle',
    tags: ['food', 'photography', 'brunch', 'aesthetic'],
    readingTime: '5 min read',
  },
  {
    id: '3',
    title: 'Neon and Plants: Designing the Ultimate Cozy Cyberpunk Workspace',
    slug: 'neon-plants-cozy-cyberpunk-workspace',
    date: '2026-02-20',
    formattedDate: 'February 20, 2026',
    excerpt: 'Can industrial neon co-exist with lush green indoor plants? Explore the beautiful synthesis of cyber-aesthetics and natural elements in home office design.',
    content: `## Synthwave Meets Biophilia

The cyberpunk aesthetic is often characterized by dystopian, rainy cityscapes dominated by neon mega-corporations. However, the modern "cozy cyberpunk" movement flips this on its head, blending futuristic neon lighting with warm, natural, biophilic elements like indoor plants.

This design trend creates an incredibly inspiring and soothing environment for developers, designers, and creatives.

### The Color Palette

The core of cozy cyberpunk is contrast. You want to balance the electric artificiality of LEDs with the organic warmth of nature.

*   **Primary Hues:** Deep purples, electric blues, and magenta.
*   **Organic Counterbalance:** Rich forest greens from Monstera Deliciosa, Pothos, and Snake Plants.
*   **Neutral Base:** Matte black tech gear set against warm wooden table tops.

### Lighting as Architecture

In a workspace, lighting shouldn't just illuminate; it should define the space.

1.  **Diffused Background Light:** Use RGBIC LED strips behind the desk and monitor to cast a soft, eye-friendly glow on the wall.
2.  **Spotlighting Plants:** Angle a warm Edison bulb towards your plants. The neon casting shadows through the leaves creates a dramatic, cinematic effect.
3.  **The Mechanical Keyboard:** Customize your keyboard with semi-translucent keycaps to let the RGB shine through like miniature neon signs.

### Curating the Vibe

Finally, complete the sensory experience with sound and aroma. A lo-fi or synthwave playlist on high-quality studio monitors, paired with the scent of sandalwood or rain-forest incense, turns a normal desk into a personalized sanctuary.`,
    image: '/images/tech.jpg',
    gallery: [
      '/images/tech.jpg',
      'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
    ],
    category: 'Design',
    tags: ['tech', 'workspace', 'cyberpunk', 'interior'],
    readingTime: '6 min read',
  },
  {
    id: '4',
    title: 'Scandinavian Minimalism: Curating a Capsule Wardrobe',
    slug: 'scandinavian-minimalism-capsule-wardrobe',
    date: '2026-02-22',
    formattedDate: 'February 22, 2026',
    excerpt: 'Reduce decision fatigue and elevate your personal style by adopting a neutral, high-quality Scandinavian-inspired capsule wardrobe.',
    content: `## The Philosophy of Less

The Scandinavian approach to fashion is defined by three words: effortless, functional, and minimal. In a world of fast fashion and overconsumption, curating a capsule wardrobe is an act of defiance and a commitment to sustainability.

By owning fewer, higher-quality items that all coordinate, you save time, money, and mental energy every single morning.

### The Foundation of Neutrals

A Scandinavian capsule wardrobe leans heavily on neutral colors. These colors are timeless, easy to mix-and-match, and look expensive regardless of the price point.

*   **Core Colors:** Cream, beige, camel, grey, white, and black.
*   **The Silhouette:** Oversized tailoring balanced with fitted base layers. Think wide-leg wool trousers paired with a fitted ribbed turtleneck.

### Choosing Materials

Quality over quantity. When you only have 30-40 items in your wardrobe, each one gets worn frequently. Invest in natural fibers:

1.  **Heavy Wool:** For coats and blazers. It drapes beautifully and keeps you warm.
2.  **Organic Cotton:** For crisp white shirts and t-shirts.
3.  **Linen:** For summer breeziness.
4.  **Cashmere and Silk:** For luxury layer items.

### Footwear & Accessories

Keep your accessories to a minimum, but ensure they make a statement. A structured leather tote bag, a pair of clean white leather sneakers, and classic black loafers are all you need to complete any outfit in your capsule.

Minimalism isn't about restriction; it's about liberation. It's making space for the things that truly matter by clearing out the clutter.`,
    image: '/images/fashion.jpg',
    gallery: [
      '/images/fashion.jpg',
      'https://images.unsplash.com/photo-1434389677669-e08b4cab31b0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
    ],
    category: 'Fashion',
    tags: ['style', 'minimalism', 'fashion', 'sustainable'],
    readingTime: '7 min read',
  },
  {
    id: '5',
    title: 'The Hidden Architectural Gems of Kyoto',
    slug: 'hidden-architectural-gems-kyoto',
    date: '2026-02-25',
    formattedDate: 'February 25, 2026',
    excerpt: 'Beyond the famous Golden Pavilion, Kyoto houses breathtaking quiet temples and modernist architectural masterpieces that most tourists miss.',
    content: `## Kyoto Beyond the Tour Bus

Kyoto is the cultural heart of Japan, famous for its thousands of classical Buddhist temples, gardens, imperial palaces, and traditional wooden houses. However, there is a side to Kyoto's architecture that remains hidden in plain sight, away from the bustling crowds of Kinkaku-ji and Fushimi Inari.

### The Integration of Modern and Traditional

Kyoto contains fascinating examples of contemporary architects paying homage to traditional forms.

-   **Kyoto Station (Hiroshi Hara):** A masterpiece of futuristic architecture with its massive steel-and-glass matrix roof that reflects the sky and city.
-   **The Garden of Fine Arts (Tadao Ando):** An outdoor museum utilizing Ando’s signature raw concrete and rushing water, creating a serene, subterranean gallery for classical art replicas.

### Subdued Temples and Zen Gardens

For a quieter, more meditative experience, seek out these architectural marvels:

1.  **Honen-in:** Hidden in the forest near the Philosopher's Path. Its moss-covered thatched gate feels like stepping back 400 years in time.
2.  **Shoden-ji:** A dry landscape garden (Karesansui) that uses the distant Mt. Hiei as "borrowed scenery" (shakkei), framing the mountain perfectly between pruned azalea bushes and the temple wall.

Walking through Kyoto is a lesson in temporal layering. Wooden townhouses stand next to concrete minimalism, creating a dialogue between the past and the future.`,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1528360983277-13d40fceddc9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80',
    ],
    category: 'Travel',
    tags: ['japan', 'architecture', 'kyoto', 'design'],
    readingTime: '7 min read',
  },
  {
    id: '6',
    title: 'The Science of Espresso Extraction',
    slug: 'science-espresso-extraction',
    date: '2026-02-27',
    formattedDate: 'February 27, 2026',
    excerpt: 'Delve into the chemistry and physics of pulling the perfect shot of espresso, from grind size to yield and pressure profiling.',
    content: `## The Alchemic Golden Liquid

Brewing espresso is a precise science masked as an art form. To extract the perfect 30ml of liquid from 18g of finely ground coffee, you must manipulate multiple physical variables.

### The Big Three: Temperature, Pressure, and Time

Espresso extraction involves hot water under high pressure passing through a compacted bed of ground coffee.

-   **Pressure:** Standard espresso machines use 9 bars of atmospheric pressure. This pressure emulsifies the natural oils in the coffee, creating the "crema" – that beautiful, aromatic foam on top of the shot.
-   **Temperature:** Water should be between 90°C and 95°C (195°F - 205°F). Too hot, and you burn the coffee, extracting bitter, harsh compounds. Too cool, and the shot tastes sour and thin.
-   **Time:** A typical shot should take between 25 and 32 seconds to run. 

### Variables to Adjust

If your espresso tastes bad, you are either over-extracting or under-extracting.

1.  **Under-extracted (Sour, watery, fast run times):** Your grind is too coarse. Grind finer to increase resistance.
2.  **Over-extracted (Bitter, dry, slow run times):** Your grind is too fine. Water is getting trapped and pulling out unwanted woody flavors. Grind coarser.

Understanding the science allows you to systematically fix any bad shot and achieve consistency. Welcome to the rabbit hole of specialty coffee.`,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507133769004-106c0460925e?auto=format&fit=crop&w=800&q=80',
    ],
    category: 'Lifestyle',
    tags: ['coffee', 'science', 'lifestyle', 'barista'],
    readingTime: '6 min read',
  },
];

const ALL_CATEGORIES = ['All', 'Travel', 'Lifestyle', 'Design', 'Fashion'];
const ALL_TAGS = Array.from(new Set(SAMPLE_POSTS.flatMap(p => p.tags)));

function Layout({ children }: { children: React.ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/?search=${searchTerm}`);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans tracking-tight flex flex-col">
      {/* Header */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter text-neutral-900 group">
            <Sparkles className="w-6 h-6 text-pink-500 group-hover:rotate-12 transition-transform" />
            VISTA<span className="text-pink-500">.</span>
          </Link>

          <form onSubmit={handleSearch} className="relative hidden md:flex flex-1 max-w-sm mx-8">
            <input
              type="text"
              placeholder="Search posts, tags..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-100 focus:bg-white rounded-full text-sm outline-none transition-all duration-200 border border-transparent focus:border-neutral-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-neutral-400" />
          </form>

          <div className="flex items-center gap-4">
            <Link to="/?category=Travel" className="hidden sm:block text-sm font-medium text-neutral-600 hover:text-neutral-900">Travel</Link>
            <Link to="/?category=Design" className="hidden sm:block text-sm font-medium text-neutral-600 hover:text-neutral-900">Design</Link>
            <button className="bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-xl font-black tracking-tighter text-white mb-4">
              <Sparkles className="w-5 h-5 text-pink-500" />
              VISTA.
            </div>
            <p className="text-sm leading-relaxed">
              A modern aesthetic curation of thoughts on design, lifestyle, travel, and minimalism.
            </p>
          </div>
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              {ALL_CATEGORIES.slice(1).map(cat => (
                <li key={cat}><Link to={`/?category=${cat}`} className="hover:text-white transition-colors">{cat}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Top Tags</h3>
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.slice(0, 8).map(tag => (
                <Link key={tag} to={`/?search=${tag}`} className="text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-2 py-1 rounded">
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Newsletter</h3>
            <div className="flex flex-col space-y-2">
              <input type="email" placeholder="Email Address" className="bg-neutral-800 text-white text-sm p-2 rounded outline-none" />
              <button className="bg-pink-500 text-white text-sm p-2 rounded hover:bg-pink-600 transition-colors">Join</button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-neutral-800 text-center text-xs">
          &copy; {new Date().getFullYear()} Vista Press. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function HomePage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'All';
  const [visiblePosts, setVisiblePosts] = useState(4); // Load more mechanism

  const filteredPosts = useMemo(() => {
    return SAMPLE_POSTS.filter(post => {
      const matchesSearch = search === '' || 
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));

      const matchesCategory = category === 'All' || post.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const displayedPosts = filteredPosts.slice(0, visiblePosts);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center items-center">
        {ALL_CATEGORIES.map(cat => (
          <Link
            key={cat}
            to={cat === 'All' ? '/' : `/?category=${cat}`}
            className={`text-sm font-medium px-4 py-1.5 rounded-full transition-colors ${
              (cat === 'All' && category === 'All') || category === cat
                ? 'bg-neutral-900 text-white'
                : 'bg-neutral-200/70 hover:bg-neutral-200 text-neutral-700'
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* Masonry / Pinterest Grid using Tailwind Columns */}
      {displayedPosts.length > 0 ? (
        <motion.div 
          layout
          className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5"
        >
          {displayedPosts.map(post => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="break-inside-avoid mb-5 group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-neutral-100"
            >
              <Link to={`/blog/${post.slug}`}>
                <div className="relative overflow-hidden bg-neutral-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold text-neutral-800 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Folder className="w-3.5 h-3.5 text-pink-500" />
                    {post.category}
                  </div>
                </div>
              </Link>
              <div className="p-5">
                <Link to={`/blog/${post.slug}`}>
                  <h3 className="text-base font-bold text-neutral-900 hover:text-pink-500 transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                </Link>
                <p className="mt-2 text-sm text-neutral-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-neutral-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readingTime}
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="text-neutral-400 hover:text-red-500 transition-colors">
                      <Heart className="w-4.5 h-4.5" />
                    </button>
                    <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
                      <Share2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-20">
          <p className="text-neutral-500 text-lg">No posts found matching that criteria.</p>
        </div>
      )}

      {/* Load More Button */}
      {visiblePosts < filteredPosts.length && (
        <div className="flex justify-center mt-12 mb-8">
          <button
            onClick={() => setVisiblePosts(prev => prev + 4)}
            className="bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-800 font-medium px-6 py-2.5 rounded-full shadow-sm hover:shadow transition-all"
          >
            Load more posts
          </button>
        </div>
      )}
    </div>
  );
}

function PostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const post = SAMPLE_POSTS.find(p => p.slug === slug);

  // Auto scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (post) {
      // Fake likes and comments from local storage
      const savedLikes = localStorage.getItem(`blog-likes-${post.id}`);
      const liked = localStorage.getItem(`blog-liked-${post.id}`);
      const savedComments = localStorage.getItem(`blog-comments-${post.id}`);

      setLikes(savedLikes ? parseInt(savedLikes) : Math.floor(Math.random() * 200) + 50);
      setHasLiked(liked === 'true');
      setComments(savedComments ? JSON.parse(savedComments) : [
        { id: 'c1', author: 'Alex Thorne', text: 'This was an incredibly detailed and beautifully written article! Can’t wait to read more.', date: '2 days ago' },
        { id: 'c2', author: 'Maya Lin', text: 'Stunning imagery. I am absolutely bookmarking this for my next trip!', date: '1 day ago' }
      ]);
    }
  }, [post]);

  const handleLike = () => {
    if (!post) return;
    const newLiked = !hasLiked;
    const newLikesCount = newLiked ? likes + 1 : likes - 1;

    setLikes(newLikesCount);
    setHasLiked(newLiked);

    localStorage.setItem(`blog-likes-${post.id}`, newLikesCount.toString());
    localStorage.setItem(`blog-liked-${post.id}`, newLiked.toString());
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || !commentName.trim() || !commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: commentName,
      text: commentText,
      date: 'Just now',
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem(`blog-comments-${post.id}`, JSON.stringify(updatedComments));

    setCommentName('');
    setCommentText('');
  };

  if (!post) {
    return (
      <div className="text-center py-24">
        <h2 className="text-3xl font-bold mb-4">Post not found</h2>
        <Link to="/" className="text-pink-500 hover:underline">Go back home</Link>
      </div>
    );
  }

  const relatedPosts = SAMPLE_POSTS.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
    >
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm font-medium text-neutral-500 hover:text-neutral-900 mb-6 transition-colors">
        <ChevronLeft className="w-4 h-4" />
        Back to blog
      </button>

      {/* Article Header */}
      <header className="mb-10 text-center">
        <span className="bg-pink-100 text-pink-600 text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
          {post.category}
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
          {post.title}
        </h1>
        <div className="mt-6 flex items-center justify-center gap-4 text-sm text-neutral-500">
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readingTime}</span>
          <span>&middot;</span>
          <span>{post.formattedDate}</span>
        </div>
      </header>

      {/* Featured Image */}
      <div className="rounded-2xl overflow-hidden shadow-lg mb-12">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[400px] object-cover"
        />
      </div>

      {/* Article Body */}
      <article className="prose prose-neutral max-w-none prose-lg md:prose-xl prose-p:leading-relaxed prose-p:text-neutral-700 prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-neutral-900 prose-a:text-pink-600 prose-a:no-underline hover:prose-a:underline">
        {post.content.split('\n\n').map((block, idx) => {
          if (block.startsWith('# ')) {
            return <h1 key={idx}>{block.replace('# ', '')}</h1>;
          } else if (block.startsWith('## ')) {
            return <h2 key={idx}>{block.replace('## ', '')}</h2>;
          } else if (block.startsWith('### ')) {
            return <h3 key={idx}>{block.replace('### ', '')}</h3>;
          } else if (block.startsWith('- ') || block.startsWith('* ')) {
            const listItems = block.split('\n');
            return (
              <ul key={idx}>
                {listItems.map((li, i) => <li key={i}>{li.replace(/^[-*]\s+/, '')}</li>)}
              </ul>
            );
          } else if (block.match(/^\d+\./)) {
            const listItems = block.split('\n');
            return (
              <ol key={idx}>
                {listItems.map((li, i) => <li key={i}>{li.replace(/^\d+\.\s+/, '')}</li>)}
              </ol>
            );
          } else {
            return <p key={idx}>{block}</p>;
          }
        })}
      </article>

      {/* Image Gallery - Pinterest-Style Grid & Lightbox Trigger */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
          <Compass className="w-5 h-5 text-pink-500" /> Image Gallery
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {post.gallery.map((img, index) => (
            <div
              key={index}
              className="cursor-pointer group relative overflow-hidden rounded-xl h-48 sm:h-64 bg-neutral-100"
              onClick={() => setLightboxIndex(index)}
            >
              <img src={img} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="text-white text-xs font-semibold bg-neutral-900/60 px-3 py-1.5 rounded-full">Zoom View</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Effect */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4"
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 text-white hover:text-neutral-400 p-2"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative w-full max-w-4xl h-[70vh] flex items-center justify-center">
              <img
                src={post.gallery[lightboxIndex]}
                alt="Lightbox View"
                className="max-w-full max-h-full object-contain"
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex - 1 + post.gallery.length) % post.gallery.length);
                }}
                className="absolute left-2 text-white p-2 bg-neutral-900/50 rounded-full hover:bg-neutral-800"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex + 1) % post.gallery.length);
                }}
                className="absolute right-2 text-white p-2 bg-neutral-900/50 rounded-full hover:bg-neutral-800"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tags and Social Action */}
      <div className="mt-12 pt-6 border-t border-neutral-200 flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <Link to={`/?search=${tag}`} key={tag} className="text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-full flex items-center gap-1">
              <Tag className="w-3 h-3 text-neutral-400" /> {tag}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button onClick={handleLike} className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${hasLiked ? 'text-red-500' : 'text-neutral-500 hover:text-red-500'}`}>
            <Heart className={`w-5 h-5 ${hasLiked ? 'fill-current' : ''}`} />
            {likes}
          </button>
          <button className="flex items-center gap-1.5 text-sm font-semibold text-neutral-500 hover:text-neutral-900 transition-colors">
            <Bookmark className="w-5 h-5" />
            Save
          </button>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-16 pt-12 border-t border-neutral-200">
          <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
            You Might Also Like
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPosts.map(rel => (
              <Link to={`/blog/${rel.slug}`} key={rel.id} className="group">
                <div className="h-40 overflow-hidden rounded-xl bg-neutral-100 mb-3">
                  <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h4 className="text-base font-bold text-neutral-900 group-hover:text-pink-500 transition-colors line-clamp-2 leading-snug">{rel.title}</h4>
                <p className="mt-1 text-xs text-neutral-500">{rel.formattedDate}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Custom Comments Section */}
      <div className="mt-16 pt-12 border-t border-neutral-200">
        <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-pink-500" /> Discussion ({comments.length})
        </h3>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="bg-neutral-50 p-6 rounded-2xl mb-8 border border-neutral-200/50">
          <h4 className="text-sm font-bold text-neutral-900 mb-4">Leave a Reply</h4>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="bg-white text-sm p-3 rounded-lg border border-neutral-200 outline-none focus:border-pink-500"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              required
            />
            <textarea
              rows={4}
              placeholder="Write your comment..."
              className="bg-white text-sm p-3 rounded-lg border border-neutral-200 outline-none focus:border-pink-500"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            ></textarea>
            <button type="submit" className="bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm py-3 px-6 rounded-lg self-start transition-colors">
              Post Comment
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map(c => (
            <div key={c.id} className="flex flex-col border-b border-neutral-100 pb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-neutral-900">{c.author}</span>
                <span className="text-xs text-neutral-400">{c.date}</span>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/:slug" element={<PostPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
