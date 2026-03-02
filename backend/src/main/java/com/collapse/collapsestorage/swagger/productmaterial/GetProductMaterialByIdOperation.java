package com.collapse.collapsestorage.swagger.productmaterial;

import com.collapse.collapsestorage.dto.productmaterial.ProductMaterialDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Operation(
        summary = "Получение связи продукта и материала по UUID",
        description = "Возвращает связь продукта и материала по ее уникальному идентификатору",
        responses = {
                @ApiResponse(
                        responseCode = "200",
                        description = "Связь продукта и материала найдена",
                        content = @Content(
                                schema = @Schema(implementation = ProductMaterialDTO.class)
                        )
                )
        }
)
public @interface GetProductMaterialByIdOperation {}
