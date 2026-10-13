import type { APIRoute } from 'astro';
import { contentPageCount, allPages } from '../lib/content';

const escapeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export const GET: APIRoute = ({ site }) => {
  if (!site) return new Response('Site URL is not configured.', { status: 500 });

  const pages = allPages();
  if (pages.length !== contentPageCount()) {
    return new Response('Sitemap content route count mismatch.', { status: 500 });
  }

  const routes = ['/', ...pages.map((page) => `/${page.slug}/`)];
  if (new Set(routes).size !== routes.length) {
    return new Response('Sitemap contains duplicate routes.', { status: 500 });
  }
  const urls = routes.map((route) => `<url><loc>${escapeXml(new URL(route, site).href)}</loc></url>`).join('');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
