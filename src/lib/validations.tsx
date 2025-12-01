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

export const CheckoutValidation = z.object({
  firstName: z.string().min(1, "First Name este obligatoriu"),
  lastName: z.string().min(1, "Last Name este obligatoriu"),
  email: z.string().email("Email invalid"),
  phone: z.string().min(1, "Phone este obligatoriu"),
  street: z.string().min(1, "Street este obligatoriu"),
  city: z.string().min(1, "City este obligatoriu"),
  zip: z.string().min(1, "Zip este obligatoriu"),
  country: z.string().min(1, "Country este obligatoriu"),
  cardNumber: z.string().min(16, "Numar card invalid"),
  expiry: z.string().min(5, "MM/YY invalid"),
  cvc: z.string().min(3, "CVC invalid"),
});

export type CheckoutValidationType = z.infer<typeof CheckoutValidation>;

export type SignUpValidationType = z.infer<typeof SignUpValidation>;

export type SignInValidationType = z.infer<typeof SignInValidation>;
