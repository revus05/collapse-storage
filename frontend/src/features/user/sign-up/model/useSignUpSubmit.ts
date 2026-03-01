"use client";

import { useSignUpUserMutation } from "entity/user";
import type { SignUpFormData } from "features/user/sign-up";
import { useRouter } from "next/navigation";
import { paths } from "shared/navigation/paths";

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
        console.error(error);
      }
    },
    isLoading,
  };
};
