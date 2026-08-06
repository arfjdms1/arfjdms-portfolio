export const site = {
  brand: 'arfjdms',
  domain: 'arfjdms.me',
  githubUser: 'arfjdms1',
  tagline: 'Builder of game infra, native tools, and hosting that stays honest.',
  headline: 'Code, servers, and systems that hold up under load.',
  email: '',
  skills: [
    'TypeScript',
    'React',
    'Kotlin',
    'C++',
    'Vite',
    'Linux',
    'Game hosting',
    'Minecraft tooling',
  ],
} as const

export function githubUrl(path = ''): string {
  const base = `https://github.com/${site.githubUser}`
  return path ? `${base}/${path}` : base
}
