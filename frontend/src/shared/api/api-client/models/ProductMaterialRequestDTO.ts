/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ProductMaterialRequestDTO = {
    /**
     * UUID продукта
     */
    productUuid: string;
    /**
     * UUID материала
     */
    materialUuid: string;
    /**
     * Количество материала, используемое в продукте
     */
    quantity: number;
    /**
     * Цвет материала для конкретного продукта
     */
    color: 'RED' | 'GRAPHITE' | 'GREEN' | 'VIOLET' | 'ORANGE' | 'DARK_RED' | 'BLACK' | 'CYAN' | 'PINK' | 'WHITE' | 'LIME' | 'YELLOW';
};

