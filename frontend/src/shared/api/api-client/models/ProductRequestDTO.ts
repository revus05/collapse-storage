/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProductMaterialRequestDTO } from './CreateProductMaterialRequestDTO';
export type ProductRequestDTO = {
    /**
     * Список изображений
     */
    images?: Array<string>;
    /**
     * Название продукта
     */
    title: string;
    /**
     * Цвет внутри
     */
    insideColors: Array<'RED' | 'GRAPHITE' | 'GREEN' | 'VIOLET' | 'ORANGE' | 'DARK_RED' | 'BLACK' | 'CYAN' | 'PINK' | 'WHITE' | 'LIME' | 'YELLOW'>;
    /**
     * Цвет снаружи
     */
    outsideColors: Array<'RED' | 'GRAPHITE' | 'GREEN' | 'VIOLET' | 'ORANGE' | 'DARK_RED' | 'BLACK' | 'CYAN' | 'PINK' | 'WHITE' | 'LIME' | 'YELLOW'>;
    /**
     * Список материалов с количеством и цветом
     */
    materials: Array<CreateProductMaterialRequestDTO>;
};

