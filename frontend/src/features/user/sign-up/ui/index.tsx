"use client";

import { useSignUpForm, useSignUpSubmit } from "features/user/sign-up";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { paths } from "shared/navigation/paths";
import { Button } from "shared/ui/button";
import { Field, FieldError } from "shared/ui/field";
import { Input } from "shared/ui/input";

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useSignUpForm();

  const { onSubmit, isLoading } = useSignUpSubmit();

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-bg-neutral-primary/70 flex w-140 flex-col gap-6 rounded-2xl border p-8 shadow-sm backdrop-blur-[32px]"
    >
      <h2 className="text-xl font-semibold">Регистрация</h2>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Field>
              <Input
                {...register("lastName")}
                type="text"
                placeholder={"Фамилия"}
                aria-invalid={!!errors.lastName?.message}
              />
              <FieldError>{errors.lastName?.message}</FieldError>
            </Field>
            <Field>
              <Input
                {...register("firstName")}
                type="text"
                placeholder={"Имя"}
                aria-invalid={!!errors.firstName?.message}
              />
              <FieldError>{errors.firstName?.message}</FieldError>
            </Field>
          </div>
          <div className="flex flex-col gap-4">
            <Field>
              <Input
                {...register("email")}
                type="email"
                placeholder={"Email"}
                aria-invalid={!!errors.email?.message}
              />
              <FieldError>{errors.email?.message}</FieldError>
            </Field>

            <Field orientation="horizontal">
              <div className="flex gap-2 w-full">
                <div className={"flex flex-col gap-2 w-full"}>
                  <Input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder={"Пароль"}
                    aria-invalid={!!errors.password?.message}
                  />
                  <FieldError>{errors.password?.message}</FieldError>
                </div>
                <Button
                  onClick={() => setShowPassword((prev) => !prev)}
                  type="button"
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </Button>
              </div>
            </Field>
            <Field orientation="horizontal">
              <div className="flex gap-2 w-full">
                <div className={"flex flex-col gap-2 w-full"}>
                  <Input
                    {...register("repeatPassword")}
                    type={showRepeatPassword ? "text" : "password"}
                    placeholder={"Повторите пароль"}
                    aria-invalid={!!errors.repeatPassword?.message}
                  />
                  <FieldError>{errors.repeatPassword?.message}</FieldError>
                </div>
                <Button
                  onClick={() => setShowRepeatPassword((prev) => !prev)}
                  type="button"
                >
                  {showRepeatPassword ? <Eye /> : <EyeOff />}
                </Button>
              </div>
            </Field>
          </div>
        </div>
        <Link
          href={paths.signIn}
          className={
            "text-text-neutral-tertiary text-sm hover:underline hover:bg-accent/20 hover:text-accent w-fit"
          }
        >
          Войти в аккаунт
        </Link>
        <Button className={"mx-auto"} type={"submit"} disabled={isLoading}>
          Отправить
        </Button>
      </div>
    </form>
  );
};
