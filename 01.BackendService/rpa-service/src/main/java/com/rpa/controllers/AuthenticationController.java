package com.rpa.controllers;

import com.rpa.model.response.ApiResponse;
import com.rpa.model.request.user.LoginRequest;
import com.rpa.model.request.user.RegisterUserRequest;
import com.rpa.services.AuthenticationService;
import com.rpa.services.RpaUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private RpaUserService rpaUserService;

	@PostMapping("/login")
    public ApiResponse<?> login(@RequestBody @Validated LoginRequest request) {
        return authenticationService.login(request);
    }

    @PostMapping("/register")
    public ApiResponse<?> register(@RequestBody @Validated RegisterUserRequest request){
        return rpaUserService.registerUser(request);
    }
}
