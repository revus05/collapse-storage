/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MaterialDTO = {
    /**
     * Material uuid
     */
    uuid: string;
    /**
     * Material title
     */
    title: string;
    /**
     * Material measure units
     */
    unit: 'METER' | 'SQUARE_METER' | 'PIECE' | 'KILOGRAM';
    /**
     * Available material colors
     */
    availableColors: Array<'RED' | 'GRAPHITE' | 'GREEN' | 'VIOLET' | 'ORANGE' | 'DARK_RED' | 'BLACK' | 'CYAN' | 'PINK' | 'WHITE' | 'LIME' | 'YELLOW'>;
    /**
     * Quantity in stock
     */
    quantityInStock: number;
    /**
     * Reserved material quantity
     */
    quantityReserved: number;
    /**
     * Minimum level to order more
     */
    quantityMinimumLevel: number;
    /**
     * Creation timestamp
     */
    createdAt: string;
    /**
     * Last update timestamp
     */
    updatedAt: string;
};

