/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UserDTO = {
  /**
   * User uuid
   */
  uuid: string;
  /**
   * User image URL
   */
  image: string;
  /**
   * FirstName
   */
  firstName: string;
  /**
   * LastName
   */
  lastName: string;
  /**
   * Email address
   */
  email: string;
  /**
   * User role
   */
  role: "USER" | "ADMIN";
  /**
   * Creation timestamp
   */
  createdAt: string;
  /**
   * Last update timestamp
   */
  updatedAt: string;
};
