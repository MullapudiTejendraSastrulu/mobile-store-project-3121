package com.srgec.mobile.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.srgec.mobile.config.JwtService;
import com.srgec.mobile.model.User;
import com.srgec.mobile.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {
    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    public UserService(UserRepository userRepo, PasswordEncoder encoder, JwtService jwtService) {
        this.userRepo = userRepo;
        this.encoder = encoder;
        this.jwtService = jwtService;
    }
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }
    public User registUser(User user){
     String encodedPass= encoder.encode(user.getPassword());
     user.setPassword(encodedPass);
     return userRepo.save(user);
    }
    public String login(String email, String password) {

    User user = userRepo.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (!encoder.matches(password, user.getPassword())) {
        throw new RuntimeException("Invalid Password");
    }

    return jwtService.generateToken(user.getEmail());
}
    
}
