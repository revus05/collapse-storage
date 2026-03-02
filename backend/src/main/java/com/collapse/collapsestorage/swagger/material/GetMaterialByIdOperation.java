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
        summary = "Получение материала по UUID",
        description = "Возвращает материал по его уникальному идентификатору",
        responses = {
                @ApiResponse(
                        responseCode = "200",
                        description = "Материал найден",
                        content = @Content(
                                schema = @Schema(implementation = MaterialDTO.class)
                        )
                )
        }
)
public @interface GetMaterialByIdOperation {}