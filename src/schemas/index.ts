import { z } from "zod";

//make sure it matches 1234567890
const PHONE_NUMBER_REGEX = /^\d+([-\s]?\d+)*$/;

//make sure it matches https://www.linkedin.com/in/username
const LINKEDIN_URL_REGEX =
  /^(https:\/\/)(www\.)linkedin\.com\/in\/[a-zA-Z0-9_-]+$/;

export const userSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1, "No name provided"),
  email: z.string().min(1, "No email provided").email("Invalid email format"),
  dialingCode: z.string().min(1, "No dialing code provided"),
  phoneNumber: z
    .string()
    .min(1, "No phone number provided")
    .regex(new RegExp(PHONE_NUMBER_REGEX), "Invalid phone number"),
  linkedInUrl: z
    .string()
    .min(1, "No LinkedIn URL provided")
    .regex(new RegExp(LINKEDIN_URL_REGEX), "Invalid LinkedIn URL"),
});

export type UserDTO = z.infer<typeof userSchema>;
