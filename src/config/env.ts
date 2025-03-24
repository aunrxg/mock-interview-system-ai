// function getEnvVariable(key: string): string {
//   const value = process.env[key];

//   if(!value) {
//     throw new Error(`Missing environment variable: ${key}`);
//   }
//   return value;
// }

// export const ACCESS_TOKEN_SECRET = getEnvVariable('ACCESS_TOKEN_SECRET');
// export const REFRESH_TOKEN_SECRET = getEnvVariable('REFRESH_TOKEN_SECRET');


import { z } from "zod";

const envSchema = z.object({
  ACCESS_TOKEN_SECRET: z.string().min(1, "ACCESS_TOKEN_SECRET is required"),
  REFRESH_TOKEN_SECRET: z.string().min(1, "REFRESH_TOKEN_SECRET is required"),
  ACCESS_TOKEN_EXPIRY: z.string().min(1),
  REFRESH_TOKEN_EXPIRY: z.string().min(1),
});

const parsedEnv = envSchema.safeParse(process.env);

if(!parsedEnv.success) {
  console.error("❌ Invalid environment variables: ", parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;