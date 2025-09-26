package com.rpa.controllers;


import com.rpa.model.request.step.RpaStepParamInTemplateRequest;
import com.rpa.model.request.step.SearchStepParamInTemplateRequest;
import com.rpa.model.response.ApiResponse;
import com.rpa.services.RpaStepParamInTemplateService;
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
@RequestMapping("/step-param-in-template")
public class RpaStepParamInTempletaController {

    @Autowired
    private RpaStepParamInTemplateService rpaStepParamInTemplateService;

    @GetMapping("/combobox")
    public ApiResponse<?> getStepParamInTemplateCbx(){
        return  rpaStepParamInTemplateService.getStepParamInTemplateCbx();
    }

	@PostMapping
    public ApiResponse<?> getRpaStepParamInTemplateList(@RequestBody @Validated SearchStepParamInTemplateRequest request) {
        return rpaStepParamInTemplateService.getStepParamInTemplatePage(request);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping("/insert")
    public ApiResponse<?> insertRpaStepParamInTemplate(@RequestBody @Validated(Insert.class) RpaStepParamInTemplateRequest request) {
        return rpaStepParamInTemplateService.insertRpaStepParamInTemplate(request);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping("/update")
    public ApiResponse<?> updateRpaStepParamInTemplate(@RequestBody @Validated(Update.class) RpaStepParamInTemplateRequest request) {
        return rpaStepParamInTemplateService.updateRpaStepParamInTemplate(request);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping("/delete")
    public ApiResponse<?> deleteRpaStepParamInTemplate(@RequestParam(value = "id") Integer id) {
        return rpaStepParamInTemplateService.deleteRpaStepParamInTemplate(id);
    }
}
