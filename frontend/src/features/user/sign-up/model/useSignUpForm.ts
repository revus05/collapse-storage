"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const signUpSchema = z
  .object({
    firstName: z.string().trim().nonempty("Имя обязательно"),
    lastName: z.string().trim().nonempty("Фамилия обязательна"),
    email: z
      .string()
      .trim()
      .nonempty("Email обязателен")
      .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: "Некорректный email адрес",
      }),
    password: z
      .string()
      .min(8, "Минимальная длина пароля 8 символов")
      .max(64, "Максимальная длина пароля 64 символа")
      .trim(),
    repeatPassword: z
      .string()
      .min(8, "Минимальная длина пароля 8 символов")
      .max(64, "Максимальная длина пароля 64 символа")
      .trim(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Пароли не совпадают",
    path: ["repeatPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;

export const useSignUpForm = () =>
  useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    mode: "onSubmit",
  });
