package com.collapse.collapsestorage.swagger.product;

import com.collapse.collapsestorage.dto.product.ProductDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Operation(
        summary = "Получение всех продуктов",
        description = "Возвращает список всех продуктов",
        responses = {
                @ApiResponse(
                        responseCode = "200",
                        description = "Список продуктов",
                        content = @Content(
                                schema = @Schema(implementation = ProductDTO.class)
                        )
                )
        }
)
public @interface GetAllProductsOperation {}