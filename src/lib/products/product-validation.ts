import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, "Product name is required")
    .max(100, "Product name must be less than 100 characters"),
  slug: z
    .string()
    .min(3, "Slug is required")
    .max(100, "Slug must be less than 100 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be URL-friendly (lowercase letters, numbers, and hyphens only)",
    ),
  tagline: z
    .string()
    .min(3, "Tagline is required")
    .max(150, "Tagline must be less than 150 characters"),
  description: z.string().min(1, "Description is required"),
  websiteUrl: z
    .string()
    .min(1, "Website URL is required")
    .url("Invalid URL format"),
  tags: z
    .string()
    .min(1, "At least one tag is required")
    .max(200, "Tags must be less than 200 characters")
    .transform((str) =>
      str
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter((tag) => tag.length > 0),
    ),
});
