package com.collapse.collapsestorage.dto.productmaterial;

import com.collapse.collapsestorage.entity.ProductMaterial;
import com.collapse.collapsestorage.enums.Color;
import com.collapse.collapsestorage.enums.Unit;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class ProductMaterialDTO {
    @Schema(description = "UUID связи", requiredMode = Schema.RequiredMode.REQUIRED)
    private String uuid;

    @Schema(description = "Количество материала для продукта", requiredMode = Schema.RequiredMode.REQUIRED)
    private double quantity;

    @Schema(description = "Цвет материала в продукте", requiredMode = Schema.RequiredMode.REQUIRED)
    private Color color;

    @Schema(description = "UUID продукта", requiredMode = Schema.RequiredMode.REQUIRED)
    private String productUuid;

    @Schema(description = "Название продукта", requiredMode = Schema.RequiredMode.REQUIRED)
    private String productTitle;

    @Schema(description = "UUID материала", requiredMode = Schema.RequiredMode.REQUIRED)
    private String materialUuid;

    @Schema(description = "Название материала", requiredMode = Schema.RequiredMode.REQUIRED)
    private String materialTitle;

    @Schema(description = "Единицы измерения материала", requiredMode = Schema.RequiredMode.REQUIRED)
    private Unit materialUnit;

    @Schema(description = "Creation timestamp", type = "string", format = "date-time", requiredMode = Schema.RequiredMode.REQUIRED)
    private Instant createdAt;

    @Schema(description = "Last update timestamp", type = "string", format = "date-time", requiredMode = Schema.RequiredMode.REQUIRED)
    private Instant updatedAt;

    public ProductMaterialDTO(ProductMaterial productMaterial) {
        this.uuid = productMaterial.getUuid();
        this.quantity = productMaterial.getQuantity();
        this.color = productMaterial.getColor();
        this.productUuid = productMaterial.getProduct().getUuid();
        this.productTitle = productMaterial.getProduct().getTitle();
        this.materialUuid = productMaterial.getMaterial().getUuid();
        this.materialTitle = productMaterial.getMaterial().getTitle();
        this.materialUnit = productMaterial.getMaterial().getUnit();
        this.createdAt = productMaterial.getCreatedAt();
        this.updatedAt = productMaterial.getUpdatedAt();
    }
}
