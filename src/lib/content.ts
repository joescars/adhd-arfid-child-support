import { readFileSync } from 'node:fs';
import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const projectRoot = fileURLToPath(new URL('../..', import.meta.url));
const contentRoots = ['docs', 'resources'];

function contentFiles(): string[] {
  return [
    ...contentRoots.flatMap((root) => markdownFiles(join(projectRoot, root))),
    join(projectRoot, 'DISCLAIMER.md'),
  ];
}

type ContentPage = {
  slug: string;
  title: string;
  section: string;
  sourcePath: string;
  html: string;
};

function markdownFiles(directory: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) results.push(...markdownFiles(path));
    else if (path.endsWith('.md')) results.push(path);
  }
  return results;
}

function titleFromMarkdown(markdown: string, fallback: string): string {
  const heading = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim();
  return heading || fallback.replace(/[-_]/g, ' ');
}

function slugForSource(sourcePath: string): string {
  const relativePath = relative(projectRoot, sourcePath).split(sep).join('/');
  const withoutExtension = relativePath.replace(/\.md$/, '');
  if (withoutExtension === 'docs/01-start-here') return 'start-here';
  if (withoutExtension === 'DISCLAIMER') return 'disclaimer';
  return withoutExtension.replace(/^docs\//, '').replace(/^resources\//, 'resources/');
}

function rewriteInternalLinks(markdown: string, sourcePath: string): string {
  return markdown.replace(/\]\(([^)]+)\)/g, (match, target: string) => {
    if (target.startsWith(('http://')) || target.startsWith('https://') || target.startsWith('#') || target.startsWith('mailto:')) return match;
    const [path, fragment] = target.split('#', 2);
    const resolved = join(sourcePath, '..', path);
    if (!resolved.endsWith('.md')) return match;
    const targetSource = resolved === join(projectRoot, 'DISCLAIMER.md') || resolved.startsWith(join(projectRoot, 'docs')) || resolved.startsWith(join(projectRoot, 'resources')) ? resolved : '';
    if (!targetSource) return match;
    const siteTarget = `/${slugForSource(targetSource)}/${fragment ? `#${fragment}` : ''}`;
    return `](${siteTarget})`;
  });
}

export function allPages(): ContentPage[] {
  return contentFiles()
    .map((sourcePath) => {
      const markdown = rewriteInternalLinks(readFileSync(sourcePath, 'utf8'), sourcePath);
      const relativePath = relative(projectRoot, sourcePath).split(sep).join('/');
      const slug = slugForSource(sourcePath);
      const title = titleFromMarkdown(markdown, slug.split('/').at(-1) || slug);
      const section = relativePath.startsWith('resources/') ? 'Resources' : relativePath === 'DISCLAIMER.md' ? 'Safety' : 'Guides';
      return { slug, title, section, sourcePath, html: marked.parse(markdown) as string };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function pageBySlug(slug: string): ContentPage | undefined {
  return allPages().find((page) => page.slug === slug);
}
