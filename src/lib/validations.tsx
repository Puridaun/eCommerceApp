import z from "zod";

export const SignUpValidation = z
  .object({
    fullName: z.string().min(1, "Full name"),
    email: z.string().email(),
    password: z.string().min(6, "Too short"),
    confirmPassword: z.string().min(6, "Password not matched"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export const SignInValidation = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Too short"),
});

export type SignUpValidationType = z.infer<typeof SignUpValidation>;

export type SignInValidationType = z.infer<typeof SignInValidation>;
