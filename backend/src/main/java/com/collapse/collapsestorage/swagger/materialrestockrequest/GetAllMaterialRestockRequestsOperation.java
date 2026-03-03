package com.collapse.collapsestorage.swagger.materialrestockrequest;

import com.collapse.collapsestorage.dto.materialrestockrequest.MaterialRestockRequestDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Operation(
        summary = "Получение всех заявок на пополнение",
        description = "Возвращает список всех заявок на пополнение (только для администратора)",
        responses = {
                @ApiResponse(
                        responseCode = "200",
                        description = "Список заявок получен",
                        content = @Content(
                                array = @ArraySchema(
                                        schema = @Schema(implementation = MaterialRestockRequestDTO.class)
                                )
                        )
                ),
                @ApiResponse(
                        responseCode = "401",
                        description = "Доступ только для администратора"
                )
        }
)
public @interface GetAllMaterialRestockRequestsOperation {
}
