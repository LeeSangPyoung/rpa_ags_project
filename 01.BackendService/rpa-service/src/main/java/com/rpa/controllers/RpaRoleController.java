package com.rpa.controllers;

import com.rpa.model.response.ApiResponse;
import com.rpa.services.RpaRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/role")
public class RpaRoleController {

    @Autowired
    private RpaRoleService rpaRoleService;

    @GetMapping("/combobox")
    public ApiResponse<?> getRoleCbx(){
        return rpaRoleService.getRoleCbx();
    }
}
