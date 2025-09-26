package com.rpa.services;

import com.rpa.model.request.DeleteListRequest;
import com.rpa.model.request.action.ManualExecActionRequest;
import com.rpa.model.request.action.RpaActionRequest;
import com.rpa.model.request.action.SearchActionRequest;
import com.rpa.model.response.ApiResponse;

public interface RpaActionService {

    /**
     * Get Action list combobox
     */
    ApiResponse<?> getActionCbx();

    /**
     * Get Action page
     * @param request SearchActionRequest
     * @return ApiResponseDto
     */
    ApiResponse<?> getActionPage(SearchActionRequest request);

    /**
     * Get Action By Id
     * @param id Integer
     * @return ApiResponse
     */
    ApiResponse<?> getActionById(Integer id);

    /**
     * Insert Action
     * @param request RpaActionRequest
     */
    ApiResponse<?> insertRpaAction(RpaActionRequest request);

    /**
     * Update Action
     * @param request RpaActionRequest
     */
    ApiResponse<?> updateRpaAction(RpaActionRequest request);

    /**
     * Manual execute Action
     * @param request RpaManualExecActionRequest
     */
    ApiResponse<?> manualExecAction(ManualExecActionRequest request);

    /**
     * Delete Action List
     * @param request DeleteActionListRequest
     */
    ApiResponse<?> deleteRpaActionList(DeleteListRequest request);

    /**
     * Check A exist or not
     *
     * @param id Integer
     * @return void
     */
    void checkExistAction(Integer id);
}
