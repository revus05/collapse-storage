package com.collapse.collapsestorage.dto.order;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateOrderProductRequestDTO {
    @Schema(description = "UUID продукта", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank
    private String productUuid;
}
