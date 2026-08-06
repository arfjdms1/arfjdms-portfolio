import { githubUrl } from './site'

export type Project = {
  id: string
  name: string
  description: string
  href: string
  tags: string[]
  featured?: boolean
}

export const featured: Project = {
  id: 'open-ember',
  name: 'Open Ember Hosting',
  description:
    'Minecraft-first game hosting with published RAM and CPU limits, a custom panel, and hardware that is not oversold. Live at openember.host.',
  href: 'https://openember.host',
  tags: ['Business', 'Hosting', 'Minecraft'],
  featured: true,
}

export const projects: Project[] = [
  {
    id: 'eaglerx-skinbridge',
    name: 'EaglerXSkinBridge',
    description:
      'Kotlin services that bridge Eaglercraft and Minecraft Java skins through MineSkin — practical infra for hybrid clients.',
    href: githubUrl('EaglerXSkinBridge'),
    tags: ['Kotlin', 'Minecraft', 'Infra'],
  },
  {
    id: 'image-viewer',
    name: 'Image-Viewer',
    description:
      'A native C++ image viewer — systems work outside the browser stack.',
    href: githubUrl('Image-Viewer'),
    tags: ['C++', 'Desktop'],
  },
]
