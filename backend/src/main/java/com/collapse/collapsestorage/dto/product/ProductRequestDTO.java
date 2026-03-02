package com.collapse.collapsestorage.dto.product;

import com.collapse.collapsestorage.dto.productmaterial.CreateProductMaterialRequestDTO;
import com.collapse.collapsestorage.enums.Color;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ProductRequestDTO {
    @Schema(description = "Список изображений")
    private List<String> images = new ArrayList<>();

    @Schema(description = "Название продукта", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank
    private String title;

    @Schema(description = "Цвет внутри", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull
    private List<Color> insideColors;

    @Schema(description = "Цвет снаружи", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull
    private List<Color> outsideColors;

    @Schema(description = "Список материалов с количеством и цветом", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty
    @Valid
    private List<CreateProductMaterialRequestDTO> materials = new ArrayList<>();
}
