package com.collapse.collapsestorage.dto.materialrestockrequest;

import com.collapse.collapsestorage.entity.MaterialRestockRequest;
import com.collapse.collapsestorage.enums.MaterialRestockRequestStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class MaterialRestockRequestDTO {
    @Schema(description = "UUID заявки", requiredMode = Schema.RequiredMode.REQUIRED)
    private String uuid;

    @Schema(description = "UUID материала", requiredMode = Schema.RequiredMode.REQUIRED)
    private String materialUuid;

    @Schema(description = "Название материала", requiredMode = Schema.RequiredMode.REQUIRED)
    private String materialTitle;

    @Schema(description = "UUID позиции заказа", requiredMode = Schema.RequiredMode.REQUIRED)
    private String orderProductUuid;

    @Schema(description = "UUID заказа", requiredMode = Schema.RequiredMode.REQUIRED)
    private String orderUuid;

    @Schema(description = "Название продукта", requiredMode = Schema.RequiredMode.REQUIRED)
    private String productTitle;

    @Schema(description = "UUID пользователя, который создал заявку", requiredMode = Schema.RequiredMode.REQUIRED)
    private String requestedByUserUuid;

    @Schema(description = "Имя пользователя, который создал заявку", requiredMode = Schema.RequiredMode.REQUIRED)
    private String requestedByUserName;

    @Schema(description = "Статус заявки", requiredMode = Schema.RequiredMode.REQUIRED)
    private MaterialRestockRequestStatus status;

    @Schema(description = "Creation timestamp", type = "string", format = "date-time", requiredMode = Schema.RequiredMode.REQUIRED)
    private Instant createdAt;

    @Schema(description = "Last update timestamp", type = "string", format = "date-time", requiredMode = Schema.RequiredMode.REQUIRED)
    private Instant updatedAt;

    public MaterialRestockRequestDTO(MaterialRestockRequest request) {
        this.uuid = request.getUuid();
        this.materialUuid = request.getMaterial().getUuid();
        this.materialTitle = request.getMaterial().getTitle();
        this.orderProductUuid = request.getOrderProduct().getUuid();
        this.orderUuid = request.getOrderProduct().getOrder().getUuid();
        this.productTitle = request.getOrderProduct().getProduct().getTitle();
        this.requestedByUserUuid = request.getRequestedByUserUuid();
        this.status = request.getStatus();
        this.createdAt = request.getCreatedAt();
        this.updatedAt = request.getUpdatedAt();
    }
}
