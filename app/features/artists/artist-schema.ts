import { z } from 'zod';

export const ArtistFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z
        .string()
        .min(1, "Slug cannot be empty")
        .max(100, "Slug cannot be longer than 100 characters")
        .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers and dashes")
        .optional()
        .or(z.literal("")),
});

export type ArtistFormInput = z.infer<typeof ArtistFormSchema>;