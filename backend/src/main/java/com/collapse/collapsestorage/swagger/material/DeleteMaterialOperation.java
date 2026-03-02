package com.collapse.collapsestorage.swagger.material;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Operation(
        summary = "Удаление материала",
        description = "Удаляет материал по UUID",
        responses = {
                @ApiResponse(
                        responseCode = "200",
                        description = "Материал удален"
                )
        }
)
public @interface DeleteMaterialOperation {}