package com.rpa.controllers;


import com.rpa.model.request.history.SearchActionInstanceRequest;
import com.rpa.model.request.history.SearchStepExecutionRequest;
import com.rpa.model.request.history.SearchStepInstanceRequest;
import com.rpa.model.response.ApiResponse;
import com.rpa.services.RpaHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/history")
public class RpaHistoryController {

    @Autowired
    private RpaHistoryService rpaHistoryService;


    @PostMapping("/action-instance")
    public ApiResponse<?> getActionInstancePage(@RequestBody @Validated SearchActionInstanceRequest request) {
        return rpaHistoryService.getActionInstancePage(request);
    }

    @PostMapping("/step-instance")
    public ApiResponse<?> getStepInstancePage(@RequestBody @Validated SearchStepInstanceRequest request) {
        return rpaHistoryService.getStepInstancePage(request);
    }

    @PostMapping("/step-execution")
    public ApiResponse<?> getStepExecutionPage(@RequestBody @Validated SearchStepExecutionRequest request) {
        return rpaHistoryService.getStepExecutionPage(request);
    }

    @GetMapping("/execution-log")
    public ApiResponse<?> getExecutionLogDetail(@RequestParam("id") Integer id) {
        return rpaHistoryService.getExecutionLogDetail(id);
    }
}
