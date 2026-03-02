package com.collapse.collapsestorage.entity;

import com.collapse.collapsestorage.dto.material.MaterialRequestDTO;
import com.collapse.collapsestorage.enums.Color;
import com.collapse.collapsestorage.enums.Unit;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Hidden
@Getter
@Setter
@Table(name = "materials")
@EntityListeners(AuditingEntityListener.class)
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String uuid;

    @Column(nullable = false)
    private String title;

    private Unit unit;

    @Column(nullable = false)
    private List<Color> availableColors;

    private double quantityInStock;

    private double quantityReserved;

    private double quantityMinimumLevel;

    @OneToMany(mappedBy = "material")
    private List<ProductMaterial> productMaterials = new ArrayList<>();

    @OneToMany(mappedBy = "material")
    private List<MaterialRestockRequest> restockRequests = new ArrayList<>();

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    public Material() {}

    public Material(MaterialRequestDTO dto) {
        this.title = dto.getTitle();
        this.unit = dto.getUnit();
        this.availableColors = dto.getAvailableColors();
        this.quantityInStock = dto.getQuantityInStock();
        this.quantityReserved = dto.getQuantityReserved();
        this.quantityMinimumLevel = dto.getQuantityMinimumLevel();
    }
}
