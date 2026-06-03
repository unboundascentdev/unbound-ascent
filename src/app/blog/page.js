import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPostImage from '@/components/BlogPostImage';
import styles from './blog.module.css';

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Blog</h1>
          <p className={styles.subtitle}>Thoughts on founder dependency, structural load, and building businesses that don't run entirely through you.</p>
        </div>
        <div className={styles.list}>
          {posts.map(post => (
            <article key={post.slug} className={styles.post}>
              <Link href={`/blog/${post.slug}`} className={styles.imageLink}>
                <BlogPostImage post={post} className={styles.thumbnail} />
              </Link>
              <span className={styles.tag}>Founder Advisory</span>
              <Link href={`/blog/${post.slug}`}>
                <h2 className={styles.postTitle}>{post.title}</h2>
              </Link>
              <p className={styles.date}>{post.date}</p>
              <p className={styles.excerpt}>{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
