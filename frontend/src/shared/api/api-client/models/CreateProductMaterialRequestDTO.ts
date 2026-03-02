/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateProductMaterialRequestDTO = {
    /**
     * UUID материала
     */
    materialUuid: string;
    /**
     * Количество материала для продукта
     */
    quantity: number;
    /**
     * Конкретный цвет материала
     */
    color: 'RED' | 'GRAPHITE' | 'GREEN' | 'VIOLET' | 'ORANGE' | 'DARK_RED' | 'BLACK' | 'CYAN' | 'PINK' | 'WHITE' | 'LIME' | 'YELLOW';
};

