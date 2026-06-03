import { getPostImagePath } from '@/lib/posts';

export default function BlogPostImage({ post, className, priority = false }) {
  const src = getPostImagePath(post);
  const alt = post.imageAlt || post.title;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={1200}
      height={630}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
