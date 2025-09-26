package com.rpa.controllers;

import com.rpa.model.request.DeleteListRequest;
import com.rpa.model.request.action.ManualExecActionRequest;
import com.rpa.model.request.action.RpaActionRequest;
import com.rpa.model.request.action.SearchActionRequest;
import com.rpa.model.response.ApiResponse;
import com.rpa.services.RpaActionService;
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
@RequestMapping("/action")
public class RpaActionController {

    @Autowired
    private RpaActionService rpaActionService;

    @GetMapping("/combobox")
    public ApiResponse<?> getActionCbx(){
        return  rpaActionService.getActionCbx();
    }

    @GetMapping()
    public ApiResponse<?> getActionById(@RequestParam(value = "id") Integer id){
        return  rpaActionService.getActionById(id);
    }

	@PostMapping
    public ApiResponse<?> getRpaAccountList(@RequestBody @Validated SearchActionRequest request) {
        return rpaActionService.getActionPage(request);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping("/insert")
    public ApiResponse<?> insertRpaAction(@RequestBody @Validated RpaActionRequest request) {
        return rpaActionService.insertRpaAction(request);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping("/update")
    public ApiResponse<?> updateRpaAction(@RequestBody @Validated(Update.class) RpaActionRequest request) {
        return rpaActionService.updateRpaAction(request);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping("/delete")
    public ApiResponse<?> deleteRpaActionList(@RequestBody @Validated DeleteListRequest request) {
        return rpaActionService.deleteRpaActionList(request);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping("/manual-execute")
    public ApiResponse<?> manualExecAction(@RequestBody @Validated ManualExecActionRequest request) {
        return rpaActionService.manualExecAction(request);
    }
}
