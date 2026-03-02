/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductDTO } from './ProductDTO';
export type OrderProductDTO = {
    /**
     * UUID позиции заказа
     */
    uuid: string;
    /**
     * UUID заказа
     */
    orderUuid: string;
    /**
     * Статус изготовления
     */
    status: 'QUEUED' | 'IN_PROGRESS' | 'DONE';
    /**
     * Продукт
     */
    product: ProductDTO;
    /**
     * Creation timestamp
     */
    createdAt: string;
    /**
     * Last update timestamp
     */
    updatedAt: string;
};

