/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderProductDTO } from './OrderProductDTO';
export type OrderDTO = {
    /**
     * UUID заказа
     */
    uuid: string;
    /**
     * Список продуктов в заказе
     */
    products: Array<OrderProductDTO>;
    /**
     * Creation timestamp
     */
    createdAt: string;
    /**
     * Last update timestamp
     */
    updatedAt: string;
};

