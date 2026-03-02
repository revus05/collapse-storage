package com.collapse.collapsestorage.swagger.material;

import com.collapse.collapsestorage.dto.material.MaterialDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Operation(
        summary = "Получение всех материалов",
        description = "Возвращает список всех материалов",
        responses = {
                @ApiResponse(
                        responseCode = "200",
                        description = "Список материалов",
                        content = @Content(
                                schema = @Schema(implementation = MaterialDTO.class)
                        )
                )
        }
)
public @interface GetAllMaterialsOperation {}