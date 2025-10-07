import { z } from "zod";
import { GENDER } from "../../utlis/common/enum";

// Register Validation
export const registerSchema = z.object({
  fullName: z.string().min(2).max(20),
  email: z.string().email(),
  password: z.string().min(6), // على الأقل 6 حروف
  phoneNumber: z.string().optional(),
  gender: z.nativeEnum(GENDER),
});

// Login Validation
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Confirm Email Validation
export const confirmEmailSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6), // OTP 6 أرقام
});
