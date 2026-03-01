import { createApi } from "@reduxjs/toolkit/query/react";
import {
  type ApiResponse,
  baseQuery,
  type ProductDTO,
  type ProductRequestDTO,
} from "shared/api";

const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQuery("products"),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<ApiResponse<ProductDTO[]>, void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    getProductById: builder.query<ApiResponse<ProductDTO>, string>({
      query: (uuid) => ({
        url: `/${uuid}`,
        method: "GET",
      }),
    }),
    createProduct: builder.mutation<ApiResponse<ProductDTO>, ProductRequestDTO>(
      {
        query: (body) => ({
          url: "",
          method: "POST",
          body,
        }),
        invalidatesTags: ["products"],
      },
    ),
    deleteProduct: builder.mutation<ApiResponse<void>, string>({
      query: (uuid) => ({
        url: `/${uuid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export default productApi;

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} = productApi;
