import { getPostBySlug, getAllPosts } from '@/lib/posts';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return (
    <main className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-12">{post.date}</p>
      <div className="prose prose-gray max-w-none">
        {post.content.split('\n').map((paragraph, i) => (
          paragraph ? <p key={i} className="mb-4 text-gray-700 leading-relaxed">{paragraph}</p> : null
        ))}
      </div>
    </main>
  );
}