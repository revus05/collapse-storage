package com.collapse.collapsestorage.dto.product;

import com.collapse.collapsestorage.dto.productmaterial.ProductMaterialDTO;
import com.collapse.collapsestorage.entity.Product;
import com.collapse.collapsestorage.enums.Color;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
public class ProductDTO {

    @Schema(description = "Product uuid", requiredMode = Schema.RequiredMode.REQUIRED)
    private String uuid;

    @Schema(description = "List of image URLs", requiredMode = Schema.RequiredMode.REQUIRED)
    private List<String> images;

    @Schema(description = "Product title", requiredMode = Schema.RequiredMode.REQUIRED)
    private String title;

    @Schema(description = "Inside color", requiredMode = Schema.RequiredMode.REQUIRED)
    private List<Color> insideColors;

    @Schema(description = "Outside color", requiredMode = Schema.RequiredMode.REQUIRED)
    private List<Color> outsideColors;

    @Schema(description = "Materials", requiredMode = Schema.RequiredMode.REQUIRED)
    private List<ProductMaterialDTO> materials;

    @Schema(description = "Creation timestamp", type = "string", format = "date-time", requiredMode = Schema.RequiredMode.REQUIRED)
    private Instant createdAt;

    @Schema(description = "Last update timestamp", type = "string", format = "date-time", requiredMode = Schema.RequiredMode.REQUIRED)
    private Instant updatedAt;

    public ProductDTO(Product product) {
        this.uuid = product.getUuid();
        this.images = product.getImages();
        this.title = product.getTitle();
        this.insideColors = product.getInsideColors();
        this.outsideColors = product.getOutsideColors();
        this.materials = product.getProductMaterials().stream().map(ProductMaterialDTO::new).toList();
        this.createdAt = product.getCreatedAt();
        this.updatedAt = product.getUpdatedAt();
    }
}
