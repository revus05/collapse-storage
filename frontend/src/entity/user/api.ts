import { createApi } from "@reduxjs/toolkit/query/react";
import {
  type ApiResponse,
  baseQuery,
  type SignInUserRequestDTO,
  type UpdateUserRequestDTO,
  type UserDTO,
} from "shared/api";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQuery("users"),
  tagTypes: ["me"],
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
    getMe: builder.query<ApiResponse<UserDTO>, void>({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
      providesTags: ["me"],
    }),
    updateMe: builder.mutation<ApiResponse<UserDTO>, UpdateUserRequestDTO>({
      query: (body) => ({
        url: "/me",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["me"],
    }),
  }),
});

export default userApi;
export const {
  useGetMeQuery,
  useSignInUserMutation,
  useSignUpUserMutation,
  useSignOutUserMutation,
  useUpdateMeMutation,
} = userApi;
