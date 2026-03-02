package com.collapse.collapsestorage.dto.order;

import com.collapse.collapsestorage.entity.Order;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
public class OrderDTO {
    @Schema(description = "UUID заказа", requiredMode = Schema.RequiredMode.REQUIRED)
    private String uuid;

    @Schema(description = "Список продуктов в заказе", requiredMode = Schema.RequiredMode.REQUIRED)
    private List<OrderProductDTO> products;

    @Schema(description = "Creation timestamp", type = "string", format = "date-time", requiredMode = Schema.RequiredMode.REQUIRED)
    private Instant createdAt;

    @Schema(description = "Last update timestamp", type = "string", format = "date-time", requiredMode = Schema.RequiredMode.REQUIRED)
    private Instant updatedAt;

    public OrderDTO(Order order) {
        this.uuid = order.getUuid();
        this.products = order.getProducts().stream().map(OrderProductDTO::new).toList();
        this.createdAt = order.getCreatedAt();
        this.updatedAt = order.getUpdatedAt();
    }
}
