package com.collapse.collapsestorage.swagger.productmaterial;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Operation(
        summary = "Удаление связи продукта и материала",
        description = "Удаляет связь продукта и материала по UUID",
        responses = {
                @ApiResponse(
                        responseCode = "200",
                        description = "Связь продукта и материала удалена"
                )
        }
)
public @interface DeleteProductMaterialOperation {}
