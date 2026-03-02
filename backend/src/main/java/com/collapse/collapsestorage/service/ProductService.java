package com.collapse.collapsestorage.service;

import com.collapse.collapsestorage.dto.product.ProductDTO;
import com.collapse.collapsestorage.dto.product.ProductRequestDTO;
import com.collapse.collapsestorage.entity.Material;
import com.collapse.collapsestorage.entity.Product;
import com.collapse.collapsestorage.repository.MaterialRepository;
import com.collapse.collapsestorage.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final MaterialRepository materialRepository;

    public ProductDTO createProduct(ProductRequestDTO dto) {
        Product product = new Product(dto);

        List<Material> foundMaterials = materialRepository.findAllByUuidIn(dto.getMaterialUuids());
        product.setMaterials(foundMaterials);

        return new ProductDTO(productRepository.save(product));
    }

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream().map(ProductDTO::new).collect(Collectors.toList());
    }

    public ProductDTO getProductById(String uuid) {
        return productRepository.findById(uuid).map(ProductDTO::new).orElseThrow();
    }

    public void deleteProduct(String uuid) {
        productRepository.deleteById(uuid);
    }
}