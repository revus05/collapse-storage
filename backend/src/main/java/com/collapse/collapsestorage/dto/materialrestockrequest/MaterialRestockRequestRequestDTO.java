package com.collapse.collapsestorage.dto.materialrestockrequest;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MaterialRestockRequestRequestDTO {
    @Schema(description = "UUID материала", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank
    private String materialUuid;

    @Schema(description = "UUID позиции заказа", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank
    private String orderProductUuid;
}
