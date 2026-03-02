package com.collapse.collapsestorage.repository;

import com.collapse.collapsestorage.entity.MaterialRestockRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaterialRestockRequestRepository extends JpaRepository<MaterialRestockRequest, String> {
}
