package com.rpa.controllers;


import com.rpa.model.request.step.RpaStepRequest;
import com.rpa.model.request.step.SearchStepRequest;
import com.rpa.model.response.ApiResponse;
import com.rpa.services.RpaStepService;
import com.rpa.validator.group.Insert;
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
@RequestMapping("/step")
public class RpaStepController {

    @Autowired
    private RpaStepService rpaStepService;

    @GetMapping("/combobox")
    public ApiResponse<?> getStepCbx(@RequestParam(value = "rpaActionId", required=false) Integer rpaActionId){
        return  rpaStepService.getStepCbx(rpaActionId);
    }

    @GetMapping()
    public ApiResponse<?> getStepById(@RequestParam(value = "id") Integer id){
        return  rpaStepService.getStepById(id);
    }

	@PostMapping
    public ApiResponse<?> getRpaStepList(@RequestBody @Validated SearchStepRequest request) {
        return rpaStepService.getStepPage(request);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping("/insert")
    public ApiResponse<?> insertRpaStep(@RequestBody @Validated(Insert.class) RpaStepRequest request) {
        return rpaStepService.insertRpaStep(request);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping("/update")
    public ApiResponse<?> updateRpaStep(@RequestBody @Validated(Update.class) RpaStepRequest request) {
        return rpaStepService.updateRpaStep(request);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping("/delete")
    public ApiResponse<?> deleteRpaStep(@RequestParam(value = "id") Integer id) {
        return rpaStepService.deleteRpaStep(id);
    }
}
