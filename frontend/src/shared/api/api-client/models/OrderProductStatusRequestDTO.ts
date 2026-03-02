/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderProductMaterialUsageDTO } from './OrderProductMaterialUsageDTO';
export type OrderProductStatusRequestDTO = {
    /**
     * Статус изготовления
     */
    status: 'QUEUED' | 'IN_PROGRESS' | 'DONE';
    /**
     * Фактические использованные количества по материалам (для статуса DONE)
     */
    materialUsages?: Array<OrderProductMaterialUsageDTO>;
};

