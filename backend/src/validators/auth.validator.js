import { z } from "zod";

export const googleLoginSchema = z.object({
  body: z.object({
    idToken: z
      .string()
      .min(10, "Invalid Google ID token")
      .max(5000, "Invalid Google ID token"),
  }),
});
