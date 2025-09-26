package com.rpa.services;

import com.rpa.model.request.DeleteListRequest;
import com.rpa.model.request.step.RpaStepRequest;
import com.rpa.model.request.step.SearchStepRequest;
import com.rpa.model.response.ApiResponse;

public interface RpaStepService {

    /**
     * Get Step list combobox
     * @return ApiResponse
     */
    ApiResponse<?> getStepCbx(Integer rpaActionId);

    /**
     * Get Step By Id
     * @param id Integer
     * @return ApiResponse
     */
    ApiResponse<?> getStepById(Integer id);
    
    /**
     * Get step page
     * @param request SearchStepRequest
     * @return ApiResponseDto
     */
    ApiResponse<?> getStepPage(SearchStepRequest request);

    /**
     * Insert Step
     * @param request RpaStepRequest
     */
    ApiResponse<?> insertRpaStep(RpaStepRequest request);

    /**
     * Update Step
     * @param request RpaStepRequest
     */
    ApiResponse<?> updateRpaStep(RpaStepRequest request);

    /**
     * Delte Step
     * @param id Integer
     */
    ApiResponse<?> deleteRpaStep(Integer id);

    /**
     * Delte Step List
     * @param request DeleteStepListRequest
     */
    ApiResponse<?> deleteRpaStepList(DeleteListRequest request);

    /**
     * Check Step exist or not
     *
     * @param id Integer
     * @return void
     */
    void checkExistStep(Integer id);

}
