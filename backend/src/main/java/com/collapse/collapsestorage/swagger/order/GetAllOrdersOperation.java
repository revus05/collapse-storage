package com.collapse.collapsestorage.swagger.order;

import com.collapse.collapsestorage.dto.order.OrderDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Operation(
        summary = "Получение всех заказов",
        description = "Возвращает список всех заказов",
        responses = {
                @ApiResponse(
                        responseCode = "200",
                        description = "Список заказов",
                        content = @Content(
                                schema = @Schema(implementation = OrderDTO.class)
                        )
                )
        }
)
public @interface GetAllOrdersOperation {}
