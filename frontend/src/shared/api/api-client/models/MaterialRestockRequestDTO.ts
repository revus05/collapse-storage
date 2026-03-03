/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MaterialRestockRequestDTO = {
    /**
     * UUID заявки
     */
    uuid: string;
    /**
     * UUID материала
     */
    materialUuid: string;
    /**
     * Название материала
     */
    materialTitle: string;
    /**
     * UUID позиции заказа
     */
    orderProductUuid: string;
    /**
     * UUID заказа
     */
    orderUuid: string;
    /**
     * Название продукта
     */
    productTitle: string;
    /**
     * UUID пользователя, который создал заявку
     */
    requestedByUserUuid: string;
    /**
     * Имя пользователя, который создал заявку
     */
    requestedByUserName: string;
    /**
     * Статус заявки
     */
    status: 'NEW';
    /**
     * Creation timestamp
     */
    createdAt: string;
    /**
     * Last update timestamp
     */
    updatedAt: string;
};

