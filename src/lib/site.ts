import type { Lang } from '../i18n/ui';

export const site = {
  name: 'Kilika',
  maker: 'Raphaëlle Aknin',
  // International format without "+" or spaces for wa.me links. FR 06 82 05 87 31 -> 33682058731
  whatsapp: '33682058731',
  phoneDisplay: '06 82 05 87 31',
  email: 'raphaelle.aknin@wanadoo.fr',
  instagram: '', // add the handle when available, e.g. 'kilika.creations'
};

/** Localised path: FR at root, EN under /en. */
export function localizedPath(path: string, lang: Lang): string {
  const clean = '/' + path.replace(/^\/+/, '');
  if (lang === 'en') return clean === '/' ? '/en' : '/en' + clean;
  return clean;
}

/** Build a wa.me link with a pre-filled message. */
export function waLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
