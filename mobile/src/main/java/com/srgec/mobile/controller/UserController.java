package com.srgec.mobile.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.srgec.mobile.model.User;
import com.srgec.mobile.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final UserService uService;
    public UserController(UserService uService) {
        this.uService = uService;
    }
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return uService.getAllUsers();
    }
    @PostMapping("/register")
    public User addUser(@RequestBody User user){
        return uService.registUser(user);
    }
    
    @PostMapping("/login")
    public String login(@RequestBody User user) throws Exception {
        return uService.login(user.getEmail(), user.getPassword());
    }
}
