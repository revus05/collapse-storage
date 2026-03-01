package com.collapse.collapsestorage.swagger.user;

import com.collapse.collapsestorage.dto.user.SignUpUserRequestDTO;
import com.collapse.collapsestorage.dto.user.UserDTO;
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
    summary = "Регистрация пользователя",
    description = "Создает нового пользователя",
    requestBody = @RequestBody(
        description = "Данные для регистрации пользователя",
        content = @Content(
            schema = @Schema(implementation = SignUpUserRequestDTO.class)
        )
    ),
    responses = {
        @ApiResponse(
            responseCode = "201",
            description = "Пользователь успешно создан",
            content = @Content(
                schema = @Schema(implementation = UserDTO.class)
            )
        )
    }
)
public @interface SignUpOperation {
}