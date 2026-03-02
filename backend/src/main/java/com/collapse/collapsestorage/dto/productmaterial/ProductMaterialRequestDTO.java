package com.collapse.collapsestorage.dto.productmaterial;

import com.collapse.collapsestorage.enums.Color;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductMaterialRequestDTO {
    @Schema(description = "UUID продукта", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank
    private String productUuid;

    @Schema(description = "UUID материала", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank
    private String materialUuid;

    @Schema(description = "Количество материала, используемое в продукте", requiredMode = Schema.RequiredMode.REQUIRED)
    @Positive
    private double quantity;

    @Schema(description = "Цвет материала для конкретного продукта", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull
    private Color color;
}
