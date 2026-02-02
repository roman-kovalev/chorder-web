import { z } from "zod";

const envSchema = z.object({
    API_URL: z.url(),
    NODE_ENV: z.enum(["development", "production"])
})

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error("❌ Invalid environment variables: ", z.treeifyError(parsed.error));

    throw new Error("Invalid environment variables");
}

export const env = parsed.data;
export const isProd = env.NODE_ENV === "production";
export const isDev = env.NODE_ENV === "development";