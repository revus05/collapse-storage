package com.collapse.collapsestorage.dto.order;

import com.collapse.collapsestorage.enums.ProductionStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class OrderProductStatusRequestDTO {
    @Schema(description = "Статус изготовления", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull
    private ProductionStatus status;

    @Schema(description = "Фактические использованные количества по материалам (для статуса DONE)")
    @Valid
    private List<OrderProductMaterialUsageDTO> materialUsages = new ArrayList<>();
}
