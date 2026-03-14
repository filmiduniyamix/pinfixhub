import Link from 'next/link';
import Image from 'next/image';

export default function PostCard({ post }) {
  return (
    <div className="break-inside-avoid mb-6 group animate-fade-in-up">
      <Link href={`/post/${post.id}`}>
        <div className="relative rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gray-100">
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={800}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-3xl"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-white font-extrabold text-xl leading-tight mb-2">{post.title}</h3>
            <div className="flex flex-wrap gap-2">
              {post.categories.map(cat => (
                <span key={cat} className="text-xs px-3 py-1 bg-white/20 text-white font-medium rounded-full backdrop-blur-md">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
