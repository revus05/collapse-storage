import { createApi } from "@reduxjs/toolkit/query/react";
import {
  type ApiResponse,
  baseQuery,
  type SignInUserRequestDTO,
  type UserDTO,
} from "shared/api";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQuery("users"),
  endpoints: (builder) => ({
    signUpUser: builder.mutation<ApiResponse<UserDTO>, SignInUserRequestDTO>({
      query: (body) => ({
        url: "/sign-up",
        method: "POST",
        body,
      }),
    }),
    signInUser: builder.mutation<ApiResponse<UserDTO>, SignInUserRequestDTO>({
      query: (body) => ({
        url: "/sign-in",
        method: "POST",
        body,
      }),
    }),
    signOutUser: builder.mutation<ApiResponse<void>, void>({
      query: () => ({
        url: "/sign-out",
        method: "POST",
      }),
    }),
  }),
});

export default userApi;
export const {
  useSignInUserMutation,
  useSignUpUserMutation,
  useSignOutUserMutation,
} = userApi;
