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
      providesTags: (result) =>
        result?.data
          ? [
              { type: "materials", id: "LIST" },
              ...result.data.map((material) => ({
                type: "materials" as const,
                id: material.uuid,
              })),
            ]
          : [{ type: "materials", id: "LIST" }],
    }),
    getMaterialById: builder.query<ApiResponse<MaterialDTO>, string>({
      query: (uuid) => ({
        url: `/${uuid}`,
        method: "GET",
      }),
      providesTags: (_result, _error, uuid) => [{ type: "materials", id: uuid }],
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
      invalidatesTags: [{ type: "materials", id: "LIST" }],
    }),
    deleteMaterial: builder.mutation<ApiResponse<void>, string>({
      query: (uuid) => ({
        url: `/${uuid}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, uuid) => [
        { type: "materials", id: "LIST" },
        { type: "materials", id: uuid },
      ],
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
