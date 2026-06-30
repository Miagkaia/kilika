import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    category: z.enum(['bebe', 'pet']),
    order: z.number().default(50),
    featured: z.boolean().default(false),
    title_fr: z.string(),
    title_en: z.string(),
    price: z.number(),
    priceSuffix_fr: z.string().optional(),
    priceSuffix_en: z.string().optional(),
    desc_fr: z.string(),
    desc_en: z.string(),
    story_fr: z.string().optional(),
    story_en: z.string().optional(),
    fabrics: z.array(z.string()).default([]),
    colors: z.array(z.string()).default([]),
    sizes: z.array(z.object({ label: z.string(), price: z.number() })).default([]),
    images: z.array(z.string()).default([]),
  }),
});

export const collections = { products };
