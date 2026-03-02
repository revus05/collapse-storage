package com.collapse.collapsestorage.service;

import com.collapse.collapsestorage.dto.material.MaterialDTO;
import com.collapse.collapsestorage.dto.material.MaterialRequestDTO;
import com.collapse.collapsestorage.entity.Material;
import com.collapse.collapsestorage.repository.MaterialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MaterialService {
    private final MaterialRepository materialRepository;

    public MaterialDTO createMaterial(MaterialRequestDTO dto) {
        Material material = new Material(dto);
        return new MaterialDTO(materialRepository.save(material));
    }

    public List<MaterialDTO> getAllMaterials() {
        return materialRepository.findAll().stream().map(MaterialDTO::new).collect(Collectors.toList());
    }

    public MaterialDTO getMaterialById(String uuid) {
        return materialRepository.findById(uuid).map(MaterialDTO::new).orElseThrow();
    }

    public void deleteProduct(String uuid) {
        materialRepository.deleteById(uuid);
    }
}