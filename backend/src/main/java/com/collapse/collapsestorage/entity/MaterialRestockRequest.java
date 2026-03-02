package com.collapse.collapsestorage.entity;

import com.collapse.collapsestorage.enums.MaterialRestockRequestStatus;
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
@Table(name = "material_restock_requests")
@EntityListeners(AuditingEntityListener.class)
public class MaterialRestockRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String uuid;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "material_uuid", nullable = false)
    private Material material;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "order_product_uuid", nullable = false)
    private OrderProduct orderProduct;

    @Column(nullable = false)
    private String requestedByUserUuid;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MaterialRestockRequestStatus status = MaterialRestockRequestStatus.NEW;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
