package com.rpa.controllers;

import com.rpa.model.response.ApiResponse;
import com.rpa.model.request.user.ChangePwRequest;
import com.rpa.model.request.user.SelfUpdateUserRequest;
import com.rpa.services.RpaUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/user")
public class RpaUserController {

    @Autowired
    private RpaUserService rpaUserService;

    @GetMapping()
    public ApiResponse<?> getUser(){
        return rpaUserService.getUserInfo();
    }

    @PostMapping("/change-password")
    public ApiResponse<?> changePassword(@RequestBody @Validated ChangePwRequest request){
        return rpaUserService.changePassword(request);
    }

    @PostMapping("/update")
    public ApiResponse<?> updateUser(@RequestBody @Validated SelfUpdateUserRequest request){
        return rpaUserService.selfUpdateUser(request);
    }
}
