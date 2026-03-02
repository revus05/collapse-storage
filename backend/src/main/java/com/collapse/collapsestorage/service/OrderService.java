package com.collapse.collapsestorage.service;

import com.collapse.collapsestorage.dto.order.OrderDTO;
import com.collapse.collapsestorage.dto.order.OrderProductMaterialUsageDTO;
import com.collapse.collapsestorage.dto.order.OrderProductDTO;
import com.collapse.collapsestorage.dto.order.OrderProductStatusRequestDTO;
import com.collapse.collapsestorage.dto.order.OrderRequestDTO;
import com.collapse.collapsestorage.entity.Material;
import com.collapse.collapsestorage.entity.Order;
import com.collapse.collapsestorage.entity.OrderProduct;
import com.collapse.collapsestorage.entity.Product;
import com.collapse.collapsestorage.entity.ProductMaterial;
import com.collapse.collapsestorage.enums.ProductionStatus;
import com.collapse.collapsestorage.repository.OrderProductRepository;
import com.collapse.collapsestorage.repository.OrderRepository;
import com.collapse.collapsestorage.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderProductRepository orderProductRepository;
    private final ProductRepository productRepository;

    public OrderDTO createOrder(OrderRequestDTO dto) {
        Order order = new Order();
        Instant now = Instant.now();
        order.setCreatedAt(now);
        order.setUpdatedAt(now);

        List<OrderProduct> orderProducts = dto.getProducts().stream()
                .map(productInfo -> {
                    Product product = productRepository.findById(productInfo.getProductUuid()).orElseThrow();
                    OrderProduct orderProduct = new OrderProduct();
                    orderProduct.setOrder(order);
                    orderProduct.setProduct(product);
                    return orderProduct;
                })
                .toList();

        order.setProducts(new ArrayList<>(orderProducts));

        return new OrderDTO(orderRepository.save(order));
    }

    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream().map(OrderDTO::new).collect(Collectors.toList());
    }

    public OrderProductDTO getOrderProductById(String uuid) {
        return orderProductRepository.findById(uuid).map(OrderProductDTO::new).orElseThrow();
    }

    @Transactional
    public OrderProductDTO updateOrderProductStatus(String uuid, OrderProductStatusRequestDTO dto) {
        OrderProduct orderProduct = orderProductRepository.findById(uuid).orElseThrow();
        ProductionStatus previousStatus = orderProduct.getStatus();
        ProductionStatus nextStatus = dto.getStatus();

        if (previousStatus == nextStatus) {
            return new OrderProductDTO(orderProduct);
        }

        if (nextStatus == ProductionStatus.IN_PROGRESS) {
            reserveProductMaterials(orderProduct);
        } else if (nextStatus == ProductionStatus.DONE) {
            consumeProductMaterials(orderProduct, dto.getMaterialUsages(), previousStatus == ProductionStatus.IN_PROGRESS);
        } else if (nextStatus == ProductionStatus.QUEUED && previousStatus == ProductionStatus.IN_PROGRESS) {
            releaseReservedProductMaterials(orderProduct);
        }

        orderProduct.setStatus(dto.getStatus());
        return new OrderProductDTO(orderProductRepository.save(orderProduct));
    }

    private void reserveProductMaterials(OrderProduct orderProduct) {
        for (ProductMaterial productMaterial : orderProduct.getProduct().getProductMaterials()) {
            Material material = productMaterial.getMaterial();
            material.setQuantityReserved(material.getQuantityReserved() + productMaterial.getQuantity());
        }
    }

    private void releaseReservedProductMaterials(OrderProduct orderProduct) {
        for (ProductMaterial productMaterial : orderProduct.getProduct().getProductMaterials()) {
            Material material = productMaterial.getMaterial();
            material.setQuantityReserved(Math.max(0, material.getQuantityReserved() - productMaterial.getQuantity()));
        }
    }

    private void consumeProductMaterials(OrderProduct orderProduct, List<OrderProductMaterialUsageDTO> usages, boolean releaseReserved) {
        List<OrderProductMaterialUsageDTO> safeUsages = usages == null ? List.of() : usages;
        Map<String, Double> usageByProductMaterialUuid = new HashMap<>();
        for (OrderProductMaterialUsageDTO usage : safeUsages) {
            if (usage.getProductMaterialUuid() == null || usage.getQuantity() == null) {
                continue;
            }
            usageByProductMaterialUuid.put(usage.getProductMaterialUuid(), usage.getQuantity());
        }

        for (ProductMaterial productMaterial : orderProduct.getProduct().getProductMaterials()) {
            Material material = productMaterial.getMaterial();
            double plannedQuantity = productMaterial.getQuantity();
            double usedQuantity = usageByProductMaterialUuid.getOrDefault(productMaterial.getUuid(), plannedQuantity);

            if (releaseReserved) {
                material.setQuantityReserved(Math.max(0, material.getQuantityReserved() - plannedQuantity));
            }

            material.setQuantityInStock(material.getQuantityInStock() - usedQuantity);
        }
    }
}
