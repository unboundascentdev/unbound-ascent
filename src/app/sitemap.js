import { getAllPosts } from '@/lib/posts'

export default async function sitemap() {
  const posts = await getAllPosts()

  const postUrls = posts.map((post) => ({
    url: `https://www.unboundascent.com/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: 'https://www.unboundascent.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.unboundascent.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.unboundascent.com/assessment',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...postUrls,
  ]
}
