import { createApi } from "@reduxjs/toolkit/query/react";
import {
  type ApiResponse,
  baseQuery,
  type MaterialDTO,
  type MaterialRequestDTO,
} from "shared/api";

const materialApi = createApi({
  reducerPath: "materialApi",
  baseQuery: baseQuery("materials"),
  tagTypes: ["materials"],
  endpoints: (builder) => ({
    getAllMaterials: builder.query<ApiResponse<MaterialDTO[]>, void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["materials"],
    }),
    getMaterialById: builder.query<ApiResponse<MaterialDTO>, string>({
      query: (uuid) => ({
        url: `/${uuid}`,
        method: "GET",
      }),
    }),
    createMaterial: builder.mutation<
      ApiResponse<MaterialDTO>,
      MaterialRequestDTO
    >({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: ["materials"],
    }),
    deleteMaterial: builder.mutation<ApiResponse<void>, string>({
      query: (uuid) => ({
        url: `/${uuid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["materials"],
    }),
  }),
});

export default materialApi;

export const {
  useGetAllMaterialsQuery,
  useGetMaterialByIdQuery,
  useCreateMaterialMutation,
  useDeleteMaterialMutation,
} = materialApi;
