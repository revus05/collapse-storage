package com.collapse.collapsestorage.controller;

import com.collapse.collapsestorage.dto.productmaterial.ProductMaterialDTO;
import com.collapse.collapsestorage.dto.productmaterial.ProductMaterialRequestDTO;
import com.collapse.collapsestorage.dto.response.Response;
import com.collapse.collapsestorage.service.ProductMaterialService;
import com.collapse.collapsestorage.swagger.productmaterial.CreateProductMaterialOperation;
import com.collapse.collapsestorage.swagger.productmaterial.DeleteProductMaterialOperation;
import com.collapse.collapsestorage.swagger.productmaterial.GetAllProductMaterialsOperation;
import com.collapse.collapsestorage.swagger.productmaterial.GetProductMaterialByIdOperation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product-materials")
@Tag(name = "Связи продукт-материал", description = "Управление связями продуктов и материалов")
@RequiredArgsConstructor
public class ProductMaterialController {
    private final ProductMaterialService productMaterialService;

    @CreateProductMaterialOperation
    @PostMapping
    public Response createProductMaterial(@Valid @RequestBody ProductMaterialRequestDTO dto) {
        ProductMaterialDTO productMaterial = productMaterialService.createProductMaterial(dto);
        return new Response("Связь продукта и материала создана", HttpStatus.CREATED, productMaterial);
    }

    @GetAllProductMaterialsOperation
    @GetMapping
    public Response getAllProductMaterials() {
        List<ProductMaterialDTO> productMaterials = productMaterialService.getAllProductMaterials();
        return new Response("Список связей продукта и материала", HttpStatus.OK, productMaterials);
    }

    @GetProductMaterialByIdOperation
    @GetMapping("/{uuid}")
    public Response getProductMaterialById(@PathVariable String uuid) {
        ProductMaterialDTO productMaterial = productMaterialService.getProductMaterialById(uuid);
        return new Response("Связь продукта и материала найдена", HttpStatus.OK, productMaterial);
    }

    @DeleteProductMaterialOperation
    @DeleteMapping("/{uuid}")
    public Response deleteProductMaterial(@PathVariable String uuid) {
        productMaterialService.deleteProductMaterial(uuid);
        return new Response("Связь продукта и материала удалена", HttpStatus.OK);
    }
}
