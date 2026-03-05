package com.collapse.collapsestorage.service;

import com.collapse.collapsestorage.dto.materialrestockrequest.MaterialRestockRequestDTO;
import com.collapse.collapsestorage.dto.materialrestockrequest.MaterialRestockRequestRequestDTO;
import com.collapse.collapsestorage.entity.Material;
import com.collapse.collapsestorage.entity.MaterialRestockRequest;
import com.collapse.collapsestorage.entity.OrderProduct;
import com.collapse.collapsestorage.entity.User;
import com.collapse.collapsestorage.repository.MaterialRepository;
import com.collapse.collapsestorage.repository.MaterialRestockRequestRepository;
import com.collapse.collapsestorage.repository.OrderProductRepository;
import com.collapse.collapsestorage.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MaterialRestockRequestService {
    private final MaterialRestockRequestRepository materialRestockRequestRepository;
    private final MaterialRepository materialRepository;
    private final OrderProductRepository orderProductRepository;
    private final UserRepository userRepository;
    private final TelegramNotificationService telegramNotificationService;

    public MaterialRestockRequestDTO createRequest(MaterialRestockRequestRequestDTO dto, String requestedByUserUuid) {
        Material material = materialRepository.findById(dto.getMaterialUuid()).orElseThrow();
        OrderProduct orderProduct = orderProductRepository.findById(dto.getOrderProductUuid()).orElseThrow();

        MaterialRestockRequest request = new MaterialRestockRequest();
        request.setMaterial(material);
        request.setOrderProduct(orderProduct);
        request.setRequestedByUserUuid(requestedByUserUuid);

        MaterialRestockRequest savedRequest = materialRestockRequestRepository.save(request);

        telegramNotificationService.sendOrderNotification(buildTelegramMessage(savedRequest));

        return toDto(savedRequest);
    }

    public List<MaterialRestockRequestDTO> getAllRequests() {
        return materialRestockRequestRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    private String buildTelegramMessage(MaterialRestockRequest request) {
        return "<b>Новая заявка на пополнение материала</b>\n" +
                "Материал: " + request.getMaterial().getTitle() + "\n" +
                "Заказ: #" + request.getOrderProduct().getOrder().getUuid().substring(0, 8) + "\n" +
                "Продукт: " + request.getOrderProduct().getProduct().getTitle() + "\n" +
                "Пользователь: #" + request.getRequestedByUserUuid().substring(0, 8);
    }

    private MaterialRestockRequestDTO toDto(MaterialRestockRequest request) {
        MaterialRestockRequestDTO dto = new MaterialRestockRequestDTO(request);
        dto.setRequestedByUserName(request.getRequestedByUserUuid());

        userRepository.findById(request.getRequestedByUserUuid())
                .map(this::getUserFullName)
                .ifPresent(dto::setRequestedByUserName);

        return dto;
    }

    private String getUserFullName(User user) {
        return user.getFirstName() + " " + user.getLastName();
    }
}
