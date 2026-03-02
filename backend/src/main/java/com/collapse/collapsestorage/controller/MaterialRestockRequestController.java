package com.collapse.collapsestorage.controller;

import com.collapse.collapsestorage.dto.materialrestockrequest.MaterialRestockRequestDTO;
import com.collapse.collapsestorage.dto.materialrestockrequest.MaterialRestockRequestRequestDTO;
import com.collapse.collapsestorage.dto.response.Response;
import com.collapse.collapsestorage.dto.user.UserDTO;
import com.collapse.collapsestorage.enums.Role;
import com.collapse.collapsestorage.exception.UnauthorizedException;
import com.collapse.collapsestorage.service.MaterialRestockRequestService;
import com.collapse.collapsestorage.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/material-restock-requests")
@Tag(name = "Заявки на пополнение", description = "Управление заявками на пополнение материалов")
@RequiredArgsConstructor
public class MaterialRestockRequestController {
    private final MaterialRestockRequestService materialRestockRequestService;
    private final UserService userService;

    @PostMapping
    public Response createRequest(@Valid @RequestBody MaterialRestockRequestRequestDTO dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        assert auth != null;
        String userUuid = ((UserDetails) Objects.requireNonNull(auth.getPrincipal())).getUsername();
        MaterialRestockRequestDTO request = materialRestockRequestService.createRequest(dto, userUuid);
        return new Response("Заявка на пополнение создана", HttpStatus.CREATED, request);
    }

    @GetMapping
    public Response getAllRequests() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        assert auth != null;
        UserDTO user = userService.getMe(((UserDetails) Objects.requireNonNull(auth.getPrincipal())).getUsername());
        if (user.getRole() != Role.ADMIN) {
            throw new UnauthorizedException("Доступ только для администраторов");
        }

        List<MaterialRestockRequestDTO> requests = materialRestockRequestService.getAllRequests();
        return new Response("Список заявок на пополнение", HttpStatus.OK, requests);
    }
}
