import { defineCollection, z } from 'astro:content';

const blogCollection =  defineCollection({
		type: 'content',
		schema: z.object({
			title: z.string(),
			description: z.string().optional(),
			publishDate: z.coerce.date(),
			read: z.number().optional(),
			tags: z.array(z.string()).optional(),
			img: z.string().optional(),
			img_alt: z.string().optional(),
		}),
});

const proposalsCollection = defineCollection({
		type: 'content',
		schema: z.object({
			title: z.string(),
			company: z.string().optional(),
			role: z.string().optional(),
			date: z.coerce.date().optional(),
		}),
});

export const collections = {
	'blog': blogCollection,
	'proposals': proposalsCollection,
};