import { MetadataRoute } from 'next';
import { ARTICLES_DATA } from '@/data/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rayu.com';

  const routes = ['', '/about', '/articles', '/thoughts', '/resources', '/contact'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1 : 0.8,
    })
  );

  const articleRoutes = ARTICLES_DATA.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...articleRoutes];
}
