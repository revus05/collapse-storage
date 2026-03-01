"use client";

import { signIn, useSignInUserMutation } from "entity/user";
import type { SignInFormData } from "features/user/sign-in/model/useSignInForm";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "shared/lib/hooks";
import { paths } from "shared/navigation/paths";

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
          router.push(paths.home);
        }
      } catch (error) {
        console.error(error);
      }
    },
    isLoading,
  };
};
