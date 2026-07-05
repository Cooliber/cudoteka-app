import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const categories = defineCollection({
  loader: glob({ base: './src/content/categories', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    icon: z.string(),
    description: z.string(),
    color: z.enum(['blue', 'mint', 'peach', 'gold', 'lilac']),
    metaTitle: z.string(),
    metaDescription: z.string(),
  }),
});

const workshops = defineCollection({
  loader: glob({ base: './src/content/workshops', pattern: '**/*.md' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    slug: z.string(),
    category: reference('categories'),
    shortDescription: z.string(),
    fullDescription: z.string(),
    ageRange: z.string(),
    duration: z.string(),
    materials: z.array(z.string()).optional(),
    image: image().optional(),
    imageAlt: z.string().optional(),
    featured: z.boolean().default(false),
    metaTitle: z.string(),
    metaDescription: z.string(),
  }),
});

const testimonials = defineCollection({
  loader: glob({ base: './src/content/testimonials', pattern: '**/*.md' }),
  schema: z.object({
    author: z.string(),
    role: z.string(),
    content: z.string(),
    rating: z.number().min(1).max(5).default(5),
    source: z.string().optional(),
  }),
});

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    slug: z.string(),
    pubDate: z.coerce.date(),
    category: z.string(),
    excerpt: z.string(),
    image: image().optional(),
    imageAlt: z.string().optional(),
    metaTitle: z.string(),
    metaDescription: z.string(),
  }),
});

const gallery = defineCollection({
  loader: glob({ base: './src/content/gallery', pattern: '**/*.md' }),
  schema: ({ image }) => z.object({
    image: image(),
    alt: z.string(),
    category: z.string(),
    featured: z.boolean().default(false),
  }),
});

const downloads = defineCollection({
  loader: glob({ base: './src/content/downloads', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    category: z.enum(['wakacje', 'artykulacja', 'logopedia', 'inne']),
    file: z.string(),
    fileSize: z.string(),
    icon: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
  }),
});

export const collections = { categories, workshops, testimonials, posts, gallery, downloads };
