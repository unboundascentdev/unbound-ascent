import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-12">Blog</h1>
        <div className="space-y-12">
          {posts.map(post => (
            <article key={post.slug} className="border-b border-gray-100 pb-12">
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-xl font-semibold hover:text-purple-600 transition-colors mb-2">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-400 text-sm mb-3">{post.date}</p>
              <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}