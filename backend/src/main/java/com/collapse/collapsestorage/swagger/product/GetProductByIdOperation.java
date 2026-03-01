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
        summary = "Получение продукта по UUID",
        description = "Возвращает продукт по его уникальному идентификатору",
        responses = {
                @ApiResponse(
                        responseCode = "200",
                        description = "Продукт найден",
                        content = @Content(
                                schema = @Schema(implementation = ProductDTO.class)
                        )
                )
        }
)
public @interface GetProductByIdOperation {}