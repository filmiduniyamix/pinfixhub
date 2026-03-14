import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import SmartDescription from '../../components/SmartDescription';
import PostCard from '../../components/PostCard';
import postsData from '../../data/posts.json';

export default function PostDetail({ post, relatedPosts }) {
  const router = useRouter();

  if (router.isFallback) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>{post.title} - PinClone</title>
        <meta property="og:image" content={post.image} />
        <meta property="og:title" content={post.title} />
      </Head>

      {/* Header without category props so it only searches */}
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-[40px] shadow-xl overflow-hidden flex flex-col md:flex-row animate-fade-in-up">
          
          {/* Left Side: Large Image */}
          <div className="md:w-1/2 relative bg-black">
            <Image 
              src={post.image} 
              alt={post.title} 
              width={1000} 
              height={1000} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side: Details & Smart Description */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">{post.title}</h1>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories.map(cat => (
                <span key={cat} className="bg-pink-100 text-pink-700 font-bold px-4 py-1.5 rounded-full text-sm">
                  {cat}
                </span>
              ))}
            </div>

            {/* Smart Description Component handles Links & Telegram-style formats */}
            <div className="flex-grow">
              <SmartDescription text={post.description} />
            </div>

            <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-gray-100">
              {post.tags.map(tag => (
                <span key={tag} className="text-gray-500 bg-gray-100 px-3 py-1 rounded-lg text-sm font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">More like this</h2>
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
              {relatedPosts.map(p => <PostCard key={p.id} post={p} />)}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Next.js Static Export Requirements
export async function getStaticPaths() {
  const paths = postsData.map(post => ({
    params: { id: post.id }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = postsData.find(p => p.id === params.id);
  
  // Find related posts (overlapping categories)
  const relatedPosts = postsData
    .filter(p => p.id !== post.id && p.categories.some(c => post.categories.includes(c)))
    .slice(0, 8); // Max 8 related

  return { props: { post, relatedPosts } };
}
