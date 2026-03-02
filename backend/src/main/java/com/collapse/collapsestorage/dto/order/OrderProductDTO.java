package com.collapse.collapsestorage.dto.order;

import com.collapse.collapsestorage.dto.product.ProductDTO;
import com.collapse.collapsestorage.entity.OrderProduct;
import com.collapse.collapsestorage.enums.ProductionStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class OrderProductDTO {
    @Schema(description = "UUID позиции заказа", requiredMode = Schema.RequiredMode.REQUIRED)
    private String uuid;

    @Schema(description = "UUID заказа", requiredMode = Schema.RequiredMode.REQUIRED)
    private String orderUuid;

    @Schema(description = "Статус изготовления", requiredMode = Schema.RequiredMode.REQUIRED)
    private ProductionStatus status;

    @Schema(description = "Продукт", requiredMode = Schema.RequiredMode.REQUIRED)
    private ProductDTO product;

    @Schema(description = "Creation timestamp", type = "string", format = "date-time", requiredMode = Schema.RequiredMode.REQUIRED)
    private Instant createdAt;

    @Schema(description = "Last update timestamp", type = "string", format = "date-time", requiredMode = Schema.RequiredMode.REQUIRED)
    private Instant updatedAt;

    public OrderProductDTO(OrderProduct orderProduct) {
        this.uuid = orderProduct.getUuid();
        this.orderUuid = orderProduct.getOrder().getUuid();
        this.status = orderProduct.getStatus();
        this.product = new ProductDTO(orderProduct.getProduct());
        this.createdAt = orderProduct.getCreatedAt();
        this.updatedAt = orderProduct.getUpdatedAt();
    }
}
