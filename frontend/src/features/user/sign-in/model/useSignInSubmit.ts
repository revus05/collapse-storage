"use client";

import { signIn, useSignInUserMutation } from "entity/user";
import type { SignInFormData } from "features/user/sign-in/model/useSignInForm";
import { useRouter } from "next/navigation";
import { isApiErrorWithMessage } from "shared/lib/apiError";
import { useAppDispatch } from "shared/lib/hooks";
import { paths } from "shared/navigation/paths";
import { toast } from "sonner";

export const useSignInSubmit = () => {
  const [signInUser, { isLoading }] = useSignInUserMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  return {
    onSubmit: async (data: SignInFormData) => {
      try {
        const res = await signInUser(data).unwrap();
        if (res?.data) {
          dispatch(signIn(res.data));
          router.push(paths.orders);
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
