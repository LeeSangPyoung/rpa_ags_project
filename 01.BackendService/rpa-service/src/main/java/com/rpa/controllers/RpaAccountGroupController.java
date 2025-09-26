package com.rpa.controllers;


import com.rpa.model.request.accountgroup.RpaAccountGroupRequest;
import com.rpa.model.request.accountgroup.SearchAccountGroupRequest;
import com.rpa.model.response.ApiResponse;
import com.rpa.services.RpaAccountGroupService;
import com.rpa.validator.group.Update;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/account-group")
public class RpaAccountGroupController {

    @Autowired
    private RpaAccountGroupService rpaAccountGroupService;

    @GetMapping("/combobox")
    public ApiResponse<?> getAccountGroupCbx(){
        return  rpaAccountGroupService.getAccountGroupCbx();
    }

	@PostMapping
    public ApiResponse<?> getRpaAccountGroupList(@RequestBody @Validated SearchAccountGroupRequest request) {
        return rpaAccountGroupService.getAccountGroupList(request);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping("/insert")
    public ApiResponse<?> insertRpaAccountGroup(@RequestBody @Validated RpaAccountGroupRequest request) {
        return rpaAccountGroupService.insertRpaAccountGroup(request);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping("/update")
    public ApiResponse<?> updateRpaAccountGroup(@RequestBody @Validated(Update.class) RpaAccountGroupRequest request) {
        return rpaAccountGroupService.updateRpaAccountGroup(request);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping("/delete")
    public ApiResponse<?> deleteRpaAccountGroup(@RequestParam(value = "id") Integer id) {
        return rpaAccountGroupService.deleteRpaAccountGroup(id);
    }
}
