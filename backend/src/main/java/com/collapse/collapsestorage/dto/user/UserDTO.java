package com.collapse.collapsestorage.dto.user;

import com.collapse.collapsestorage.entity.User;
import com.collapse.collapsestorage.enums.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.annotation.Nullable;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Setter
@Getter
public class UserDTO {
    @Schema(description = "User uuid", requiredMode = Schema.RequiredMode.REQUIRED)
    private String uuid;

    @Schema(description = "User image URL", requiredMode = Schema.RequiredMode.REQUIRED)
    @Nullable
    private String image;

    @Schema(description = "FirstName", requiredMode = Schema.RequiredMode.REQUIRED)
    private String firstName;

    @Schema(description = "LastName", requiredMode = Schema.RequiredMode.REQUIRED)
    private String lastName;

    @Schema(description = "Email address", requiredMode = Schema.RequiredMode.REQUIRED)
    private String email;

    @Schema(description = "User role", requiredMode = Schema.RequiredMode.REQUIRED)
    private Role role;

    @Schema(description = "Creation timestamp", type = "string", format = "date-time", requiredMode = Schema.RequiredMode.REQUIRED)
    private Instant createdAt;

    @Schema(description = "Last update timestamp", type = "string", format = "date-time", requiredMode = Schema.RequiredMode.REQUIRED)
    private Instant updatedAt;

    public UserDTO(User user) {
        this.uuid = user.getUuid();
        this.image = user.getImage();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.createdAt = user.getCreatedAt();
        this.updatedAt = user.getUpdatedAt();
    }
}