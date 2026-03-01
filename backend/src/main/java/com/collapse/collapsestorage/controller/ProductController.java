package com.collapse.collapsestorage.controller;

import com.collapse.collapsestorage.dto.product.ProductDTO;
import com.collapse.collapsestorage.dto.product.ProductRequestDTO;
import com.collapse.collapsestorage.dto.response.Response;
import com.collapse.collapsestorage.service.ProductService;
import com.collapse.collapsestorage.swagger.product.CreateProductOperation;
import com.collapse.collapsestorage.swagger.product.DeleteProductOperation;
import com.collapse.collapsestorage.swagger.product.GetAllProductsOperation;
import com.collapse.collapsestorage.swagger.product.GetProductByIdOperation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@Tag(name = "Продукты", description = "Управление продуктами")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @CreateProductOperation
    @PostMapping
    public Response createProduct(@Valid @RequestBody ProductRequestDTO dto) {
        ProductDTO product = productService.createProduct(dto);
        return new Response("Продукт создан", HttpStatus.CREATED, product);
    }

    @GetAllProductsOperation
    @GetMapping
    public Response getAllProducts() {
        List<ProductDTO> products = productService.getAllProducts();
        return new Response("Список продуктов", HttpStatus.OK, products);
    }

    @GetProductByIdOperation
    @GetMapping("/{uuid}")
    public Response getProductById(@PathVariable String uuid) {
        ProductDTO product = productService.getProductById(uuid);
        return new Response("Продукт найден", HttpStatus.OK, product);
    }

    @DeleteProductOperation
    @DeleteMapping("/{uuid}")
    public Response deleteProduct(@PathVariable String uuid) {
        productService.deleteProduct(uuid);
        return new Response("Продукт удален", HttpStatus.OK, null);
    }
}