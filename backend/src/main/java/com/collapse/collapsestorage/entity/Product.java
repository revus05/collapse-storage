package com.collapse.collapsestorage.entity;

import com.collapse.collapsestorage.dto.product.ProductRequestDTO;
import com.collapse.collapsestorage.enums.Color;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.ArrayList;

@Entity
@Hidden
@Getter
@Setter
@Table(name = "products")
@EntityListeners(AuditingEntityListener.class)
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String uuid;

    private ArrayList<String> images;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private ArrayList<Color> insideColors;

    @Column(nullable = false)
    private ArrayList<Color> outsideColors;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    public Product() {}

    public Product(ProductRequestDTO dto) {
        this.images = dto.getImages();
        this.title = dto.getTitle();
        this.insideColors = dto.getInsideColors();
        this.outsideColors = dto.getOutsideColors();
    }
}