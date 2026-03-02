package com.collapse.collapsestorage.swagger.productmaterial;

import com.collapse.collapsestorage.dto.productmaterial.ProductMaterialDTO;
import com.collapse.collapsestorage.dto.productmaterial.ProductMaterialRequestDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Operation(
        summary = "Создание связи продукта и материала",
        description = "Создает новую связь продукта и материала с количеством и цветом",
        requestBody = @RequestBody(
                description = "Данные для создания связи продукта и материала",
                content = @Content(
                        schema = @Schema(implementation = ProductMaterialRequestDTO.class)
                )
        ),
        responses = {
                @ApiResponse(
                        responseCode = "201",
                        description = "Связь продукта и материала успешно создана",
                        content = @Content(
                                schema = @Schema(implementation = ProductMaterialDTO.class)
                        )
                )
        }
)
public @interface CreateProductMaterialOperation {}
