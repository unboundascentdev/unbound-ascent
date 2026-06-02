import { getPostBySlug, getAllPosts } from '@/lib/posts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import styles from './post.module.css';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <Link href="/blog" className={styles.back}>← Back to blog</Link>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.date}>{post.date}</p>
        <div className={styles.body}>
          {post.content.split('\n').map((paragraph, i) => (
            paragraph.trim() ? (
              <p key={i}>{paragraph}</p>
            ) : null
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}