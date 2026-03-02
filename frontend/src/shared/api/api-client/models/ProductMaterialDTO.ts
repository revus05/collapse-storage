/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ProductMaterialDTO = {
    /**
     * UUID связи
     */
    uuid: string;
    /**
     * Количество материала для продукта
     */
    quantity: number;
    /**
     * Цвет материала в продукте
     */
    color: 'RED' | 'GRAPHITE' | 'GREEN' | 'VIOLET' | 'ORANGE' | 'DARK_RED' | 'BLACK' | 'CYAN' | 'PINK' | 'WHITE' | 'LIME' | 'YELLOW';
    /**
     * UUID продукта
     */
    productUuid: string;
    /**
     * Название продукта
     */
    productTitle: string;
    /**
     * UUID материала
     */
    materialUuid: string;
    /**
     * Название материала
     */
    materialTitle: string;
    /**
     * Единицы измерения материала
     */
    materialUnit: 'METER' | 'SQUARE_METER' | 'PIECE' | 'KILOGRAM';
    /**
     * Creation timestamp
     */
    createdAt: string;
    /**
     * Last update timestamp
     */
    updatedAt: string;
};

