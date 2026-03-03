"use client";

import { useSignUpUserMutation } from "entity/user";
import type { SignUpFormData } from "features/user/sign-up";
import { useRouter } from "next/navigation";
import { isApiErrorWithMessage } from "shared/lib/apiError";
import { paths } from "shared/navigation/paths";
import { toast } from "sonner";

export const useSignUpSubmit = () => {
  const [signUpUser, { isLoading }] = useSignUpUserMutation();
  const router = useRouter();

  return {
    onSubmit: async (data: SignUpFormData) => {
      try {
        const res = await signUpUser(data).unwrap();
        if (res?.data) {
          router.push(paths.signIn);
        }
      } catch (error) {
        if (isApiErrorWithMessage(error)) {
          toast.error(error.data.message);
        } else {
          toast.error("Произошла неизвестная ошибка");
        }
      }
    },
    isLoading,
  };
};
