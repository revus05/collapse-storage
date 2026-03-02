package com.collapse.collapsestorage.swagger.order;

import com.collapse.collapsestorage.dto.order.OrderDTO;
import com.collapse.collapsestorage.dto.order.OrderRequestDTO;
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
        summary = "Создание заказа",
        description = "Создает новый заказ",
        requestBody = @RequestBody(
                description = "Данные для создания заказа",
                content = @Content(
                        schema = @Schema(implementation = OrderRequestDTO.class)
                )
        ),
        responses = {
                @ApiResponse(
                        responseCode = "201",
                        description = "Заказ успешно создан",
                        content = @Content(
                                schema = @Schema(implementation = OrderDTO.class)
                        )
                )
        }
)
public @interface CreateOrderOperation {}
