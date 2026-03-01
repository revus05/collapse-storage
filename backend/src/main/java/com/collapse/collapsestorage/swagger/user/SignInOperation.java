package com.collapse.collapsestorage.swagger.user;

import com.collapse.collapsestorage.dto.user.SignInUserRequestDTO;
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
    summary = "Авторизация пользователя",
    description = "Авторизует пользователя",
    requestBody = @RequestBody(
        description = "Данные для авторизации пользователя",
        content = @Content(
            schema = @Schema(implementation = SignInUserRequestDTO.class)
        )
    ),
    responses = {
        @ApiResponse(
            responseCode = "200",
            description = "Пользователь успешно авторизован",
            content = @Content(schema = @Schema(implementation = UserDTO.class))
        ),
    }
)
public @interface SignInOperation {
}
