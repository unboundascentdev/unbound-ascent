import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
        <div className={styles.grid}>
          {posts.map((post, index) => (
            <article key={post.slug} className={styles.card + (index === 0 ? ' ' + styles.featured : '')}>
              <Link href={'/blog/' + post.slug} className={styles.cardLink}>
                <div className={styles.cardTop}>
                  <span className={styles.tag}>Founder Advisory</span>
                  <h2 className={styles.cardTitle}>{post.title}</h2>
                  <p className={styles.cardExcerpt}>{post.excerpt}</p>
                </div>
                <div className={styles.cardBottom}>
                  <span className={styles.date}>{post.date}</span>
                  <span className={styles.readMore}>Read more</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
