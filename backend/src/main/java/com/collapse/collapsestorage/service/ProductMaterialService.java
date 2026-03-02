package com.collapse.collapsestorage.service;

import com.collapse.collapsestorage.dto.productmaterial.ProductMaterialDTO;
import com.collapse.collapsestorage.dto.productmaterial.ProductMaterialRequestDTO;
import com.collapse.collapsestorage.entity.Material;
import com.collapse.collapsestorage.entity.Product;
import com.collapse.collapsestorage.entity.ProductMaterial;
import com.collapse.collapsestorage.repository.MaterialRepository;
import com.collapse.collapsestorage.repository.ProductMaterialRepository;
import com.collapse.collapsestorage.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductMaterialService {
    private final ProductMaterialRepository productMaterialRepository;
    private final ProductRepository productRepository;
    private final MaterialRepository materialRepository;

    public ProductMaterialDTO createProductMaterial(ProductMaterialRequestDTO dto) {
        Product product = productRepository.findById(dto.getProductUuid()).orElseThrow();
        Material material = materialRepository.findById(dto.getMaterialUuid()).orElseThrow();

        ProductMaterial productMaterial = new ProductMaterial(dto, product, material);
        return new ProductMaterialDTO(productMaterialRepository.save(productMaterial));
    }

    public List<ProductMaterialDTO> getAllProductMaterials() {
        return productMaterialRepository.findAll().stream().map(ProductMaterialDTO::new).collect(Collectors.toList());
    }

    public ProductMaterialDTO getProductMaterialById(String uuid) {
        return productMaterialRepository.findById(uuid).map(ProductMaterialDTO::new).orElseThrow();
    }

    public void deleteProductMaterial(String uuid) {
        productMaterialRepository.deleteById(uuid);
    }
}
