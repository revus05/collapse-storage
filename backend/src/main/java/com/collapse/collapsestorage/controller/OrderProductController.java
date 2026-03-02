package com.collapse.collapsestorage.controller;

import com.collapse.collapsestorage.dto.order.OrderProductDTO;
import com.collapse.collapsestorage.dto.order.OrderProductStatusRequestDTO;
import com.collapse.collapsestorage.dto.response.Response;
import com.collapse.collapsestorage.service.OrderService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order-products")
@Tag(name = "Позиции заказов", description = "Управление продуктами в заказах")
@RequiredArgsConstructor
public class OrderProductController {
    private final OrderService orderService;

    @GetMapping("/{uuid}")
    public Response getOrderProductById(@PathVariable String uuid) {
        OrderProductDTO orderProduct = orderService.getOrderProductById(uuid);
        return new Response("Позиция заказа найдена", HttpStatus.OK, orderProduct);
    }

    @PutMapping("/{uuid}/status")
    public Response updateOrderProductStatus(@PathVariable String uuid, @Valid @RequestBody OrderProductStatusRequestDTO dto) {
        OrderProductDTO orderProduct = orderService.updateOrderProductStatus(uuid, dto);
        return new Response("Статус позиции заказа обновлен", HttpStatus.OK, orderProduct);
    }
}
