package com.rpa.services;

import com.rpa.model.request.history.SearchActionInstanceRequest;
import com.rpa.model.request.history.SearchStepExecutionRequest;
import com.rpa.model.request.history.SearchStepInstanceRequest;
import com.rpa.model.response.ApiResponse;
import org.apache.ibatis.annotations.Param;

public interface RpaHistoryService {

    /**
     * Get Action Instance page
     * @param request SearchActionInstanceRequest
     * @return ApiResponseDto
     */
    ApiResponse<?> getActionInstancePage(SearchActionInstanceRequest request);

    /**
     * Get Step Instance page
     * @param request SearchStepRequest
     * @return ApiResponseDto
     */
    ApiResponse<?> getStepInstancePage(SearchStepInstanceRequest request);

    /**
     * Get step page
     * @param request SearchStepRequest
     * @return ApiResponseDto
     */
    ApiResponse<?> getStepExecutionPage(SearchStepExecutionRequest request);

    /**
     * Get Execution Log Detail by Id
     * @param id Integer
     * @return ApiResponse
     */
    ApiResponse<?> getExecutionLogDetail(@Param("id") Integer id);

}
