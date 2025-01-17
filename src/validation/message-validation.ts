import { z } from "zod";

export const messageValidation = z.object({
  message: z.string(),
  phone_number: z.string().min(10),
});
