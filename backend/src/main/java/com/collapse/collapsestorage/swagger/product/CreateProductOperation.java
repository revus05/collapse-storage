package com.collapse.collapsestorage.swagger.product;

import com.collapse.collapsestorage.dto.product.ProductDTO;
import com.collapse.collapsestorage.dto.product.ProductRequestDTO;
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
        summary = "Создание продукта",
        description = "Создает новый продукт",
        requestBody = @RequestBody(
                description = "Данные для создания продукта",
                content = @Content(
                        schema = @Schema(implementation = ProductRequestDTO.class)
                )
        ),
        responses = {
                @ApiResponse(
                        responseCode = "201",
                        description = "Продукт успешно создан",
                        content = @Content(
                                schema = @Schema(implementation = ProductDTO.class)
                        )
                )
        }
)
public @interface CreateProductOperation {}