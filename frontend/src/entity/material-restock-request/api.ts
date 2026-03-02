import { createApi } from "@reduxjs/toolkit/query/react";
import {
  type ApiResponse,
  baseQuery,
  type MaterialRestockRequestDTO,
  type MaterialRestockRequestRequestDTO,
} from "shared/api";

const materialRestockRequestApi = createApi({
  reducerPath: "materialRestockRequestApi",
  baseQuery: baseQuery("material-restock-requests"),
  tagTypes: ["material-restock-requests"],
  endpoints: (builder) => ({
    getAllMaterialRestockRequests: builder.query<
      ApiResponse<MaterialRestockRequestDTO[]>,
      void
    >({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["material-restock-requests"],
    }),
    createMaterialRestockRequest: builder.mutation<
      ApiResponse<MaterialRestockRequestDTO>,
      MaterialRestockRequestRequestDTO
    >({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: ["material-restock-requests"],
    }),
  }),
});

export default materialRestockRequestApi;

export const {
  useGetAllMaterialRestockRequestsQuery,
  useCreateMaterialRestockRequestMutation,
} = materialRestockRequestApi;
