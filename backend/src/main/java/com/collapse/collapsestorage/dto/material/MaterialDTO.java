package com.collapse.collapsestorage.dto.material;

import com.collapse.collapsestorage.entity.Material;
import com.collapse.collapsestorage.enums.Color;
import com.collapse.collapsestorage.enums.Unit;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
public class MaterialDTO {

    @Schema(description = "Material uuid", requiredMode = Schema.RequiredMode.REQUIRED)
    private String uuid;

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

    @Schema(description = "Creation timestamp", type = "string", format = "date-time", requiredMode = Schema.RequiredMode.REQUIRED)
    private Instant createdAt;

    @Schema(description = "Last update timestamp", type = "string", format = "date-time", requiredMode = Schema.RequiredMode.REQUIRED)
    private Instant updatedAt;

    public MaterialDTO(Material material) {
        this.uuid = material.getUuid();
        this.title = material.getTitle();
        this.unit = material.getUnit();
        this.availableColors = material.getAvailableColors();
        this.quantityInStock = material.getQuantityInStock();
        this.quantityReserved = material.getQuantityReserved();
        this.quantityMinimumLevel = material.getQuantityMinimumLevel();
        this.createdAt = material.getCreatedAt();
        this.updatedAt = material.getUpdatedAt();
    }
}