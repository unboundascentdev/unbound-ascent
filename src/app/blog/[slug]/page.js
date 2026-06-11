import { getPostBySlug, getAllPosts, getPostImagePath, getAbsoluteUrl, SITE_URL } from '@/lib/posts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPostImage from '@/components/BlogPostImage';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import styles from './post.module.css';

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
  const imageUrl = getAbsoluteUrl(getPostImagePath(post));
  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      url,
      type: 'article',
      siteName: 'Unbound Ascent',
      images: [{ url: imageUrl, alt: post.imageAlt || post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [imageUrl],
    },
    alternates: { canonical: url },
  };
}

function BlogPostingJsonLd({ post }) {
  const url = getCanonicalPostUrl(post.slug);
  const imageUrl = getAbsoluteUrl(getPostImagePath(post));
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Person', name: AUTHOR_NAME },
    url,
    image: imageUrl,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

const markdownComponents = {
  h2: ({children}) => <h2 className={styles.h2}>{children}</h2>,
  h3: ({children}) => <h3 className={styles.h3}>{children}</h3>,
  p: ({children}) => <p className={styles.p}>{children}</p>,
  strong: ({children}) => <strong className={styles.strong}>{children}</strong>,
  a: ({href, children}) => (
    <a href={href} className={styles.ctaButton} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
};

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
      <BlogPostImage post={post} className={styles.heroImage} priority />
        <div className={styles.body}>
          <ReactMarkdown components={markdownComponents}>{post.content}</ReactMarkdown>
        </div>
      </div>
      <Footer />
    </>
  );
}
