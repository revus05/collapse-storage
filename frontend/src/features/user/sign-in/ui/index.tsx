"use client";

import { useSignInForm, useSignInSubmit } from "features/user/sign-in";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { paths } from "shared/navigation/paths";
import { Button } from "shared/ui/button";
import { Field, FieldError } from "shared/ui/field";
import { Input } from "shared/ui/input";

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useSignInForm();

  const { onSubmit, isLoading } = useSignInSubmit();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-bg-neutral-primary/70 flex w-100 flex-col gap-6 rounded-2xl border p-8 shadow-sm backdrop-blur-[32px]"
    >
      <h2 className="text-xl font-semibold">Вход</h2>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Input {...register("email")} type="email" placeholder={"Email"} />
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
        </div>
        <Link
          href={paths.signUp}
          className={
            "text-text-neutral-tertiary text-sm hover:underline hover:bg-accent/20 hover:text-accent w-fit"
          }
        >
          Создать аккаунт
        </Link>
        <Button className={"mx-auto"} type={"submit"} disabled={isLoading}>
          Отправить
        </Button>
      </div>
    </form>
  );
};
