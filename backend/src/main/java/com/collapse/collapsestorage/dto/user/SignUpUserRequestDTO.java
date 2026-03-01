package com.collapse.collapsestorage.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SignUpUserRequestDTO {
    @Schema(description = "FirstName", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "Имя обязательно")
    private String firstName;

    @Schema(description = "LastName", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "Фамилия обязательна")
    private String lastName;

    @Schema(description = "Email address", requiredMode = Schema.RequiredMode.REQUIRED)
    @Email(message = "Email должен быть валидным")
    @NotBlank(message = "Email обязателен")
    private String email;

    @Schema(description = "User password", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "Пароль обязателен")
    @Size(min = 8, max = 128, message = "Пароль должен содержать от 8 до 128 символов")
    private String password;

    public SignUpUserRequestDTO(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}