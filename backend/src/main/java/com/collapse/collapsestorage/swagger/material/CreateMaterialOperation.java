package com.collapse.collapsestorage.swagger.material;

import com.collapse.collapsestorage.dto.material.MaterialDTO;
import com.collapse.collapsestorage.dto.material.MaterialRequestDTO;
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
        summary = "Создание материала",
        description = "Создает новый материал",
        requestBody = @RequestBody(
                description = "Данные для создания материала",
                content = @Content(
                        schema = @Schema(implementation = MaterialRequestDTO.class)
                )
        ),
        responses = {
                @ApiResponse(
                        responseCode = "201",
                        description = "Материал успешно создан",
                        content = @Content(
                                schema = @Schema(implementation = MaterialDTO.class)
                        )
                )
        }
)
public @interface CreateMaterialOperation {}