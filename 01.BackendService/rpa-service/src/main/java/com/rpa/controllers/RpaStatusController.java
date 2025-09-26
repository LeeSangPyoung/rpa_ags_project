package com.rpa.controllers;

import com.rpa.model.response.ApiResponse;
import com.rpa.services.RpaStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/status")
public class RpaStatusController {

    @Autowired
    private RpaStatusService rpaStatusService;

    @GetMapping("/combobox")
    public ApiResponse<?> getStatusCbx(){
        return rpaStatusService.getStatusCbx();
    }
}
