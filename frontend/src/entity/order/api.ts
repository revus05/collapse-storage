import { createApi } from "@reduxjs/toolkit/query/react";
import {
  type ApiResponse,
  baseQuery,
  type OrderDTO,
  type OrderProductDTO,
  type OrderProductStatusRequestDTO,
  type OrderRequestDTO,
} from "shared/api";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQuery(""),
  tagTypes: ["orders", "order-product"],
  endpoints: (builder) => ({
    getAllOrders: builder.query<ApiResponse<OrderDTO[]>, void>({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "orders", id: "LIST" },
              ...result.data.map((order) => ({
                type: "orders" as const,
                id: order.uuid,
              })),
            ]
          : [{ type: "orders", id: "LIST" }],
    }),
    createOrder: builder.mutation<ApiResponse<OrderDTO>, OrderRequestDTO>({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "orders", id: "LIST" }],
    }),
    getOrderProductById: builder.query<ApiResponse<OrderProductDTO>, string>({
      query: (uuid) => ({
        url: `/order-products/${uuid}`,
        method: "GET",
      }),
      providesTags: (_result, _error, uuid) => [{ type: "order-product", id: uuid }],
    }),
    updateOrderProductStatus: builder.mutation<
      ApiResponse<OrderProductDTO>,
      { uuid: string; body: OrderProductStatusRequestDTO }
    >({
      query: ({ uuid, body }) => ({
        url: `/order-products/${uuid}/status`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { uuid }) => [
        { type: "orders", id: "LIST" },
        { type: "order-product", id: uuid },
      ],
    }),
  }),
});

export default orderApi;

export const {
  useGetAllOrdersQuery,
  useCreateOrderMutation,
  useGetOrderProductByIdQuery,
  useUpdateOrderProductStatusMutation,
} = orderApi;
