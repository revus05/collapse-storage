/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductMaterialDTO } from './ProductMaterialDTO';
export type ProductDTO = {
    /**
     * Product uuid
     */
    uuid: string;
    /**
     * List of image URLs
     */
    images: Array<string>;
    /**
     * Product title
     */
    title: string;
    /**
     * Inside color
     */
    insideColors: Array<'RED' | 'GRAPHITE' | 'GREEN' | 'VIOLET' | 'ORANGE' | 'DARK_RED' | 'BLACK' | 'CYAN' | 'PINK' | 'WHITE' | 'LIME' | 'YELLOW'>;
    /**
     * Outside color
     */
    outsideColors: Array<'RED' | 'GRAPHITE' | 'GREEN' | 'VIOLET' | 'ORANGE' | 'DARK_RED' | 'BLACK' | 'CYAN' | 'PINK' | 'WHITE' | 'LIME' | 'YELLOW'>;
    /**
     * Materials
     */
    materials: Array<ProductMaterialDTO>;
    /**
     * Creation timestamp
     */
    createdAt: string;
    /**
     * Last update timestamp
     */
    updatedAt: string;
};

