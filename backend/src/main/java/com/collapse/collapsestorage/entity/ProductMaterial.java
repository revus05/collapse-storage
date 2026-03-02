package com.collapse.collapsestorage.entity;

import com.collapse.collapsestorage.dto.productmaterial.ProductMaterialRequestDTO;
import com.collapse.collapsestorage.enums.Color;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;

@Entity
@Hidden
@Getter
@Setter
@Table(name = "product_material_links")
@EntityListeners(AuditingEntityListener.class)
public class ProductMaterial {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String uuid;

    @Column(nullable = false)
    private double quantity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Color color;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_uuid", referencedColumnName = "uuid", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "material_uuid", referencedColumnName = "uuid", nullable = false)
    private Material material;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    public ProductMaterial() {}

    public ProductMaterial(ProductMaterialRequestDTO dto, Product product, Material material) {
        this.quantity = dto.getQuantity();
        this.color = dto.getColor();
        this.product = product;
        this.material = material;
    }
}
