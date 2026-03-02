package com.collapse.collapsestorage.repository;

import com.collapse.collapsestorage.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaterialRepository extends JpaRepository<Material, String> {
    List<Material> findAllByUuidIn(List<String> uuids);
}