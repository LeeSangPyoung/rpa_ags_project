package com.rpa.controllers;

import com.rpa.common.UserStatus;
import com.rpa.model.response.ApiResponse;
import com.rpa.model.request.admin.ResetPwBulkRequest;
import com.rpa.model.request.admin.RpaUserRequest;
import com.rpa.model.request.admin.SearchUserRequest;
import com.rpa.model.request.admin.UserListRequest;
import com.rpa.services.RpaAdminService;
import com.rpa.validator.group.Insert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/admin")
public class RpaAdminController {

    @Autowired
    private RpaAdminService rpaAdminService;

    @PostMapping("/user-list")
    public ApiResponse<?> getUserList(@RequestBody @Validated SearchUserRequest request) {
        return rpaAdminService.getRpaUserList(request);
    }

    @PostMapping("/create")
    public ApiResponse<?> createUser(@RequestBody @Validated(Insert.class) RpaUserRequest request) {
        return rpaAdminService.createUser(request);
    }

    @PostMapping("/reset-password")
    public ApiResponse<?> resetPassword(@RequestBody @Validated ResetPwBulkRequest request) {
        return rpaAdminService.resetPassword(request);
    }

    @PostMapping("/update")
    public ApiResponse<?> updateUser(@RequestBody @Validated RpaUserRequest request) {
        return rpaAdminService.updateStatus(request);
    }

    @PostMapping("/approve")
    public ApiResponse<?> approveUsers(@RequestBody @Validated UserListRequest request) {
        return rpaAdminService.approveRpaUser(request);
    }

    @PostMapping("/lock")
    public ApiResponse<?> lockUsers(@RequestBody @Validated UserListRequest request) {
        return rpaAdminService.updateStatus(request, UserStatus.LOCKED.getStatusId());
    }

    @PostMapping("/unlock")
    public ApiResponse<?> unlockUsers(@RequestBody @Validated UserListRequest request) {
        return rpaAdminService.unlockUsers(request);
    }

    @PostMapping("/reject")
    public ApiResponse<?> rejectUsers(@RequestBody @Validated UserListRequest request) {
        return rpaAdminService.updateStatus(request, UserStatus.REJECTED.getStatusId());
    }

    @PostMapping("/delete")
    public ApiResponse<?> deleteUser(@RequestBody @Validated UserListRequest request) {
        return rpaAdminService.deleteUserList(request);
    }
}
