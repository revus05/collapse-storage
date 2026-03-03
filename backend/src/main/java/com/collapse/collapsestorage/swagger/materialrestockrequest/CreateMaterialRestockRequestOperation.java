package com.collapse.collapsestorage.swagger.materialrestockrequest;

import com.collapse.collapsestorage.dto.materialrestockrequest.MaterialRestockRequestDTO;
import com.collapse.collapsestorage.dto.materialrestockrequest.MaterialRestockRequestRequestDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
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
        summary = "Создание заявки на пополнение",
        description = "Создает новую заявку на пополнение материалов",
        requestBody = @RequestBody(
                description = "Данные для создания заявки",
                content = @Content(
                        schema = @Schema(implementation = MaterialRestockRequestRequestDTO.class)
                )
        ),
        responses = {
                @ApiResponse(
                        responseCode = "201",
                        description = "Заявка успешно создана",
                        content = @Content(
                                schema = @Schema(implementation = MaterialRestockRequestDTO.class)
                        )
                )
        }
)
public @interface CreateMaterialRestockRequestOperation {
}
