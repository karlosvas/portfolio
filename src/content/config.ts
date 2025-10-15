// src/content/config.ts
import { defineCollection, z } from "astro:content";

const cvCollection = defineCollection({
  type: "data",
  schema: z.object({
    pdfUrl: z.string(),
    updatedAt: z.date(),
  }),
});

export const collections = {
  cv: cvCollection,
};
