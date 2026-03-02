package com.collapse.collapsestorage.dto.order;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderProductMaterialUsageDTO {
    @Schema(description = "UUID связи продукта и материала", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank
    private String productMaterialUuid;

    @Schema(description = "Фактическое использованное количество материала", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull
    @DecimalMin(value = "0.0")
    private Double quantity;
}
