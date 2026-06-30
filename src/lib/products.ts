import { getCollection, getEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';
import { ui } from '../i18n/ui';
import { waLink } from './site';

export type ProductEntry = Awaited<ReturnType<typeof getCollection<'products'>>>[number];

export async function allProducts() {
  const items = await getCollection('products');
  return items.sort((a, b) => a.data.order - b.data.order);
}

export async function productsByCategory(cat: 'bebe' | 'pet') {
  return (await allProducts()).filter((p) => p.data.category === cat);
}

export async function featuredProducts() {
  return (await allProducts()).filter((p) => p.data.featured);
}

export function title(p: ProductEntry, lang: Lang) {
  return lang === 'en' ? p.data.title_en : p.data.title_fr;
}
export function desc(p: ProductEntry, lang: Lang) {
  return lang === 'en' ? p.data.desc_en : p.data.desc_fr;
}

export function formatPrice(n: number) {
  return Number.isInteger(n) ? `${n} €` : `${n.toFixed(2).replace('.', ',')} €`;
}

/** "À partir de 32 €" / "From 32 €" */
export function priceLabel(p: ProductEntry, lang: Lang) {
  const from = ui[lang]['shop.from'];
  const sizes = p.data.sizes;
  const min = sizes.length ? Math.min(...sizes.map((s) => s.price)) : p.data.price;
  const hasRange = sizes.length > 1 && Math.min(...sizes.map((s) => s.price)) !== Math.max(...sizes.map((s) => s.price));
  return hasRange ? `${from} ${formatPrice(min)}` : formatPrice(min);
}

/** Pre-filled WhatsApp order link for a product. */
export function productWaLink(p: ProductEntry, lang: Lang) {
  const t = title(p, lang);
  const intro = ui[lang]['wa.intro'];
  return waLink(`${intro} : « ${t} » (Kilika).`);
}

/** Related products in the same category (excluding current). */
export async function relatedProducts(p: ProductEntry, limit = 3) {
  const same = await productsByCategory(p.data.category);
  return same.filter((x) => x.id !== p.id).slice(0, limit);
}

export { getEntry };
