import { getPostBySlug, getAllPosts } from '@/lib/posts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import styles from './post.module.css';

const SITE_URL = 'https://www.unboundascent.com';
const AUTHOR_NAME = 'Chris Bustos';

function getCanonicalPostUrl(slug) {
  return `${SITE_URL}/blog/${slug}`;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const url = getCanonicalPostUrl(slug);
  const description = post.description;

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      url,
      type: 'article',
      siteName: 'Unbound Ascent',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

function BlogPostingJsonLd({ post }) {
  const url = getCanonicalPostUrl(post.slug);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
    },
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return (
    <>
      <BlogPostingJsonLd post={post} />
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
