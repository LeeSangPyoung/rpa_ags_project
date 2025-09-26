package com.rpa.controllers;


import com.rpa.model.request.account.RpaAccountRequest;
import com.rpa.model.request.account.SearchAccountRequest;
import com.rpa.model.response.ApiResponse;
import com.rpa.services.RpaAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/account")
public class RpaAccountController {

    @Autowired
    private RpaAccountService rpaAccountService;

	@PostMapping
    public ApiResponse<?> getRpaAccountList(@RequestBody @Validated SearchAccountRequest request) {
        return rpaAccountService.getAccountList(request);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping("/insert")
    public ApiResponse<?> insertRpaAccount(@RequestBody @Validated RpaAccountRequest request) {
        return rpaAccountService.insertRpaAccount(request);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping("/update")
    public ApiResponse<?> updateRpaAccount(@RequestBody @Validated RpaAccountRequest request) {
        return rpaAccountService.updateRpaAccount(request);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping("/delete")
    public ApiResponse<?> deleteRpaAccount(@RequestBody @Validated RpaAccountRequest request) {
        return rpaAccountService.deleteRpaAccount(request);
    }
}
