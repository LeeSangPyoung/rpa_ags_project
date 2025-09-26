package com.rpa.services;

import com.rpa.model.request.step.RpaStepParamInTemplateRequest;
import com.rpa.model.request.step.SearchStepParamInTemplateRequest;
import com.rpa.model.response.ApiResponse;

public interface RpaStepParamInTemplateService {

    /**
     * Get StepParamInTemplate list combobox
     * @return ApiResponse
     */
    ApiResponse<?> getStepParamInTemplateCbx();

    /**
     * Get step page
     * @param request SearchStepParamInTemplateRequest
     * @return ApiResponseDto
     */
    ApiResponse<?> getStepParamInTemplatePage(SearchStepParamInTemplateRequest request);

    /**
     * Insert StepParamInTemplate
     * @param request RpaStepParamInTemplateRequest
     */
    ApiResponse<?> insertRpaStepParamInTemplate(RpaStepParamInTemplateRequest request);

    /**
     * Update StepParamInTemplate
     * @param request RpaStepParamInTemplateRequest
     */
    ApiResponse<?> updateRpaStepParamInTemplate(RpaStepParamInTemplateRequest request);

    /**
     * Delte StepParamInTemplate
     * @param id Integer
     */
    ApiResponse<?> deleteRpaStepParamInTemplate(Integer id);

}
