package com.rpa.services;


import com.rpa.model.request.account.RpaAccountRequest;
import com.rpa.model.request.account.SearchAccountRequest;
import com.rpa.model.response.ApiResponse;

public interface RpaAccountService {

    /**
     * Get Account page
     * @param request SearchAccountRequest
     * @return ApiResponseDto
     */
    ApiResponse<?> getAccountList(SearchAccountRequest request);

    /**
     * Insert Account
     * @param request RpaAccountRequest
     */
    ApiResponse<?> insertRpaAccount(RpaAccountRequest request);

    /**
     * Update Account
     * @param request RpaAccountRequest
     */
    ApiResponse<?> updateRpaAccount(RpaAccountRequest request);

    /**
     * Delte Account
     * @param request RpaAccountRequest
     */
    ApiResponse<?> deleteRpaAccount(RpaAccountRequest request);

    /**
     * Check Account Group exist or not
     *
     * @param request  RpaAccountRequest
     * @return int
     */
    void checkExistAccount(RpaAccountRequest request);
}
