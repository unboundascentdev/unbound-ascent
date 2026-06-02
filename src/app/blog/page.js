import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-12">Blog</h1>
      <div className="space-y-10">
        {posts.map(post => (
          <article key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-xl font-semibold hover:text-purple-600 transition-colors mb-2">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-500 text-sm mb-2">{post.date}</p>
            <p className="text-gray-600">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </main>
  );
}