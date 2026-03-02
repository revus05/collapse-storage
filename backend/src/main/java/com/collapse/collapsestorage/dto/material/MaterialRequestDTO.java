package com.collapse.collapsestorage.dto.material;

import com.collapse.collapsestorage.enums.Color;
import com.collapse.collapsestorage.enums.Unit;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MaterialRequestDTO {
    @Schema(description = "Material title", requiredMode = Schema.RequiredMode.REQUIRED)
    private String title;

    @Schema(description = "Material measure units", requiredMode = Schema.RequiredMode.REQUIRED)
    private Unit unit;

    @Schema(description = "Available material colors", requiredMode = Schema.RequiredMode.REQUIRED)
    private List<Color> availableColors;

    @Schema(description = "Quantity in stock", requiredMode = Schema.RequiredMode.REQUIRED)
    private double quantityInStock;

    @Schema(description = "Reserved material quantity", requiredMode = Schema.RequiredMode.REQUIRED)
    private double quantityReserved;

    @Schema(description = "Minimum level to order more", requiredMode = Schema.RequiredMode.REQUIRED)
    private double quantityMinimumLevel;
}