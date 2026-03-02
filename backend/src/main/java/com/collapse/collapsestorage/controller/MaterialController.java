package com.collapse.collapsestorage.controller;

import com.collapse.collapsestorage.dto.material.MaterialDTO;
import com.collapse.collapsestorage.dto.material.MaterialRequestDTO;
import com.collapse.collapsestorage.dto.response.Response;
import com.collapse.collapsestorage.service.MaterialService;
import com.collapse.collapsestorage.swagger.material.CreateMaterialOperation;
import com.collapse.collapsestorage.swagger.material.DeleteMaterialOperation;
import com.collapse.collapsestorage.swagger.material.GetAllMaterialsOperation;
import com.collapse.collapsestorage.swagger.material.GetMaterialByIdOperation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/materials")
@Tag(name = "Материалы", description = "Управление материалами")
@RequiredArgsConstructor
public class MaterialController {
    private final MaterialService materialService;

    @CreateMaterialOperation
    @PostMapping
    public Response createProduct(@Valid @RequestBody MaterialRequestDTO dto) {
        MaterialDTO product = materialService.createMaterial(dto);
        return new Response("Материал создан", HttpStatus.CREATED, product);
    }

    @GetAllMaterialsOperation
    @GetMapping
    public Response getAllProducts() {
        List<MaterialDTO> materialServiceAllProducts = materialService.getAllMaterials();
        return new Response("Список материалов", HttpStatus.OK, materialServiceAllProducts);
    }

    @GetMaterialByIdOperation
    @GetMapping("/{uuid}")
    public Response getProductById(@PathVariable String uuid) {
        MaterialDTO material = materialService.getMaterialById(uuid);
        return new Response("Материал найден", HttpStatus.OK, material);
    }

    @DeleteMaterialOperation
    @DeleteMapping("/{uuid}")
    public Response deleteProduct(@PathVariable String uuid) {
        materialService.deleteProduct(uuid);
        return new Response("Материал удален", HttpStatus.OK);
    }
}