"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const signInSchema = z.object({
  email: z.string().trim().nonempty("Email обязателен"),
  password: z
    .string()
    .min(8, "Минимальная длина пароля 8 символов")
    .max(64, "Максимальная длина пароля 64 символа")
    .trim(),
});

export type SignInFormData = z.infer<typeof signInSchema>;

export const useSignInForm = () =>
  useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });
