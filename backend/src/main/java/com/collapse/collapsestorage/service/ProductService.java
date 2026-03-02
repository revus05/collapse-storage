package com.collapse.collapsestorage.service;

import com.collapse.collapsestorage.dto.product.ProductDTO;
import com.collapse.collapsestorage.dto.product.ProductRequestDTO;
import com.collapse.collapsestorage.entity.ProductMaterial;
import com.collapse.collapsestorage.entity.Material;
import com.collapse.collapsestorage.entity.Product;
import com.collapse.collapsestorage.repository.MaterialRepository;
import com.collapse.collapsestorage.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final MaterialRepository materialRepository;

    public ProductDTO createProduct(ProductRequestDTO dto) {
        Product product = new Product(dto);

        List<ProductMaterial> productMaterials = dto.getMaterials().stream()
                .map(materialInfo -> {
                    Material material = materialRepository.findById(materialInfo.getMaterialUuid()).orElseThrow();
                    ProductMaterial productMaterial = new ProductMaterial();
                    productMaterial.setProduct(product);
                    productMaterial.setMaterial(material);
                    productMaterial.setQuantity(materialInfo.getQuantity());
                    productMaterial.setColor(materialInfo.getColor());
                    return productMaterial;
                })
                .toList();
        product.setProductMaterials(new ArrayList<>(productMaterials));

        return new ProductDTO(productRepository.save(product));
    }

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream().map(ProductDTO::new).collect(Collectors.toList());
    }

    public ProductDTO getProductById(String uuid) {
        return productRepository.findById(uuid).map(ProductDTO::new).orElseThrow();
    }

    public ProductDTO updateProduct(String uuid, ProductRequestDTO dto) {
        Product product = productRepository.findById(uuid).orElseThrow();

        product.setImages(dto.getImages());
        product.setTitle(dto.getTitle());
        product.setInsideColors(dto.getInsideColors());
        product.setOutsideColors(dto.getOutsideColors());

        List<ProductMaterial> productMaterials = dto.getMaterials().stream()
                .map(materialInfo -> {
                    Material material = materialRepository.findById(materialInfo.getMaterialUuid()).orElseThrow();
                    ProductMaterial productMaterial = new ProductMaterial();
                    productMaterial.setProduct(product);
                    productMaterial.setMaterial(material);
                    productMaterial.setQuantity(materialInfo.getQuantity());
                    productMaterial.setColor(materialInfo.getColor());
                    return productMaterial;
                })
                .toList();

        product.getProductMaterials().clear();
        product.getProductMaterials().addAll(productMaterials);

        return new ProductDTO(productRepository.save(product));
    }

    public void deleteProduct(String uuid) {
        productRepository.deleteById(uuid);
    }
}
