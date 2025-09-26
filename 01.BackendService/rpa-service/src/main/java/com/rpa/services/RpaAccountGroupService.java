package com.rpa.services;

import com.rpa.model.request.accountgroup.RpaAccountGroupRequest;
import com.rpa.model.request.accountgroup.SearchAccountGroupRequest;
import com.rpa.model.response.ApiResponse;

public interface RpaAccountGroupService {

    /**
     * Get AccountGroup list combobox
     */
    ApiResponse<?> getAccountGroupCbx();

    /**
     * Get AccountGroup page
     * @param request SearchAccountGroupRequest
     * @return ApiResponseDto
     */
    ApiResponse<?> getAccountGroupList(SearchAccountGroupRequest request);

    /**
     * Insert AccountGroup
     * @param request RpaAccountGroupRequest
     */
    ApiResponse<?> insertRpaAccountGroup(RpaAccountGroupRequest request);

    /**
     * Update AccountGroup
     * @param request RpaAccountGroupRequest
     */
    ApiResponse<?> updateRpaAccountGroup(RpaAccountGroupRequest request);

    /**
     * Delte AccountGroup
     * @param id Integer
     */
    ApiResponse<?> deleteRpaAccountGroup(Integer id);

    /**
     * Check Account Group exist or not
     *
     * @param id Integer
     * @return void
     */
    void checkExistAccountGroup(Integer id);
}
