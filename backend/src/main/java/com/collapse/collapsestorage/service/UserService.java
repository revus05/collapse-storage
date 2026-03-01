package com.collapse.collapsestorage.service;

import com.collapse.collapsestorage.dto.user.SignInUserRequestDTO;
import com.collapse.collapsestorage.dto.user.SignUpUserRequestDTO;
import com.collapse.collapsestorage.dto.user.UserDTO;
import com.collapse.collapsestorage.entity.User;
import com.collapse.collapsestorage.exception.UnauthorizedException;
import com.collapse.collapsestorage.exception.UserAlreadyExistsException;
import com.collapse.collapsestorage.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserDTO signUpUser(SignUpUserRequestDTO signUpUserRequestDTO) throws UserAlreadyExistsException {
        if (userRepository.findByEmail(signUpUserRequestDTO.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException(
                    "email",
                    "Пользователь с таким email уже существует"
            );
        }

        String encodedPassword = passwordEncoder.encode(signUpUserRequestDTO.getPassword());
        signUpUserRequestDTO.setPassword(encodedPassword);

        User savedUser = userRepository.save(new User(signUpUserRequestDTO));

        return new UserDTO(savedUser);
    }

    public UserDTO signInUser(SignInUserRequestDTO signInUserRequestDTO) throws UnauthorizedException {
        User foundUser = userRepository.findByEmail(signInUserRequestDTO.getEmail())
            .filter(user -> passwordEncoder.matches(signInUserRequestDTO.getPassword(), user.getPassword()))
            .orElseThrow(() -> new UnauthorizedException("Нет пользователя с введенными данными"));

        return new UserDTO(foundUser);
    }

    public UserDTO getMe(String userUuid) throws UnauthorizedException {
        User foundUser = userRepository.findById(userUuid)
            .orElseThrow(() -> new UnauthorizedException("Нет пользователя для такого uuid"));

        return new UserDTO(foundUser);
    }
}
