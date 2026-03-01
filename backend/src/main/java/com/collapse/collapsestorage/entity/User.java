package com.collapse.collapsestorage.entity;

import com.collapse.collapsestorage.dto.user.SignUpUserRequestDTO;
import com.collapse.collapsestorage.enums.Role;
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
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String uuid;

    private String image;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private Role role = Role.USER;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    public User() {}

    public User(SignUpUserRequestDTO requestBody) {
        this.firstName = requestBody.getFirstName();
        this.lastName = requestBody.getLastName();
        this.email = requestBody.getEmail();
        this.password = requestBody.getPassword();
    }
}