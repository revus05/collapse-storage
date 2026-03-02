package com.collapse.collapsestorage.controller;

import com.collapse.collapsestorage.dto.response.Response;
import com.collapse.collapsestorage.dto.user.SignInUserRequestDTO;
import com.collapse.collapsestorage.dto.user.SignUpUserRequestDTO;
import com.collapse.collapsestorage.dto.user.UpdateUserRequestDTO;
import com.collapse.collapsestorage.dto.user.UserDTO;
import com.collapse.collapsestorage.service.JwtService;
import com.collapse.collapsestorage.service.UserService;
import com.collapse.collapsestorage.swagger.user.GetMeOperation;
import com.collapse.collapsestorage.swagger.user.SignInOperation;
import com.collapse.collapsestorage.swagger.user.SignOutOperation;
import com.collapse.collapsestorage.swagger.user.SignUpOperation;
import com.collapse.collapsestorage.swagger.user.UpdateMeOperation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/users")
@Tag(name = "Пользователи", description = "Управление пользователями")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    @SignUpOperation
    @PostMapping("/sign-up")
    public Response signUpUser(@Valid @RequestBody SignUpUserRequestDTO signUpUserRequestDTO) {
        return new Response(
                "Пользователь успешно создан",
                HttpStatus.CREATED,
                userService.signUpUser(signUpUserRequestDTO));
    }

    @SignInOperation
    @PostMapping("/sign-in")
    public Response signInUser(
            @Valid @RequestBody SignInUserRequestDTO signInUserRequestDTO, HttpServletResponse response, HttpServletRequest request) {
        UserDTO loggedUser = userService.signInUser(signInUserRequestDTO);
        String token = jwtService.generateToken(loggedUser.getUuid());
        response.addCookie(jwtService.createJwtCookie(request, token, 60 * 60 * 24 * 7));
        return new Response("Пользователь успешно авторизован", HttpStatus.OK, loggedUser);
    }

    @GetMeOperation
    @GetMapping("/me")
    public Response getMeWithJwt() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        assert auth != null;
        UserDTO loggedUser = userService.getMe(((UserDetails) Objects.requireNonNull(auth.getPrincipal())).getUsername());
        return new Response("Пользователь успешно авторизован", HttpStatus.OK, loggedUser);
    }

    @UpdateMeOperation
    @PutMapping("/me")
    public Response updateMe(@Valid @RequestBody UpdateUserRequestDTO requestDTO) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        assert auth != null;
        UserDTO updatedUser = userService.updateMe(
                ((UserDetails) Objects.requireNonNull(auth.getPrincipal())).getUsername(),
                requestDTO
        );
        return new Response("Профиль успешно обновлен", HttpStatus.OK, updatedUser);
    }


    @SignOutOperation
    @PostMapping("/sign-out")
    public Response singOut(HttpServletResponse response, HttpServletRequest request) {
        response.addCookie(jwtService.createJwtCookie(request, "", 0));
        return new Response("Пользователь успешно вышел", HttpStatus.OK);
    }
}
