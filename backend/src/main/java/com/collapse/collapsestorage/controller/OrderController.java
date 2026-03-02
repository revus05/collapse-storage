package com.collapse.collapsestorage.controller;

import com.collapse.collapsestorage.dto.order.OrderDTO;
import com.collapse.collapsestorage.dto.order.OrderRequestDTO;
import com.collapse.collapsestorage.dto.response.Response;
import com.collapse.collapsestorage.service.OrderService;
import com.collapse.collapsestorage.swagger.order.CreateOrderOperation;
import com.collapse.collapsestorage.swagger.order.GetAllOrdersOperation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@Tag(name = "Заказы", description = "Управление заказами")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @CreateOrderOperation
    @PostMapping
    public Response createOrder(@Valid @RequestBody OrderRequestDTO dto) {
        OrderDTO order = orderService.createOrder(dto);
        return new Response("Заказ создан", HttpStatus.CREATED, order);
    }

    @GetAllOrdersOperation
    @GetMapping
    public Response getAllOrders() {
        List<OrderDTO> orders = orderService.getAllOrders();
        return new Response("Список заказов", HttpStatus.OK, orders);
    }
}
