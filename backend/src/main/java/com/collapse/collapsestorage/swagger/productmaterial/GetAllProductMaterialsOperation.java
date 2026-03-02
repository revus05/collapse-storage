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
        summary = "Получение всех связей продукта и материала",
        description = "Возвращает список всех связей продукта и материала",
        responses = {
                @ApiResponse(
                        responseCode = "200",
                        description = "Список связей продукта и материала",
                        content = @Content(
                                schema = @Schema(implementation = ProductMaterialDTO.class)
                        )
                )
        }
)
public @interface GetAllProductMaterialsOperation {}
