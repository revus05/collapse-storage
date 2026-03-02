package com.collapse.collapsestorage.swagger.user;

import com.collapse.collapsestorage.dto.user.UpdateUserRequestDTO;
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
        summary = "Обновление профиля пользователя",
        description = "Обновляет профиль текущего пользователя",
        requestBody = @RequestBody(
                description = "Данные для обновления профиля",
                content = @Content(
                        schema = @Schema(implementation = UpdateUserRequestDTO.class)
                )
        ),
        responses = {
                @ApiResponse(
                        responseCode = "200",
                        description = "Профиль пользователя успешно обновлен",
                        content = @Content(schema = @Schema(implementation = UserDTO.class))
                ),
        }
)
public @interface UpdateMeOperation {
}
