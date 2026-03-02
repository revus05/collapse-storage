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
      providesTags: (result) =>
        result?.data
          ? [
              { type: "products", id: "LIST" },
              ...result.data.map((product) => ({
                type: "products" as const,
                id: product.uuid,
              })),
            ]
          : [{ type: "products", id: "LIST" }],
    }),
    getProductById: builder.query<ApiResponse<ProductDTO>, string>({
      query: (uuid) => ({
        url: `/${uuid}`,
        method: "GET",
      }),
      providesTags: (_result, _error, uuid) => [{ type: "products", id: uuid }],
    }),
    createProduct: builder.mutation<ApiResponse<ProductDTO>, ProductRequestDTO>(
      {
        query: (body) => ({
          url: "",
          method: "POST",
          body,
        }),
        invalidatesTags: [{ type: "products", id: "LIST" }],
      },
    ),
    updateProduct: builder.mutation<
      ApiResponse<ProductDTO>,
      { uuid: string; body: ProductRequestDTO }
    >({
      query: ({ uuid, body }) => ({
        url: `/${uuid}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { uuid }) => [
        { type: "products", id: "LIST" },
        { type: "products", id: uuid },
      ],
    }),
    deleteProduct: builder.mutation<ApiResponse<void>, string>({
      query: (uuid) => ({
        url: `/${uuid}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, uuid) => [
        { type: "products", id: "LIST" },
        { type: "products", id: uuid },
      ],
    }),
  }),
});

export default productApi;

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
