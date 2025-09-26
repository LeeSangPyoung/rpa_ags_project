package com.rpa.services;

import com.rpa.model.response.ApiResponse;
import com.rpa.model.request.admin.ResetPwBulkRequest;
import com.rpa.model.request.admin.RpaUserRequest;
import com.rpa.model.request.admin.SearchUserRequest;
import com.rpa.model.request.admin.UserListRequest;

public interface RpaAdminService {
    /**
     * Get List Rpa User  (ADMIN permission)
     * @param request RpaUserRequest
     * @return ApiResponseDto
     */
    ApiResponse<?> getRpaUserList(SearchUserRequest request);

    /**
     * Create new user (ADMIN permission)
     * @param request RpaUserRequest
     * @return ApiResponseDto
     */
    ApiResponse<?> createUser(RpaUserRequest request);

    /**
     * Reset user password (ADMIN permission)
     * @param request ResetPwBulkRequest
     * @return ApiResponseDto
     */
    ApiResponse<?> resetPassword(ResetPwBulkRequest request);

    /**
     * Update user (ADMIN permission)
     * @param request RpaUserRequest
     * @return ApiResponseDto
     */
    ApiResponse<?> updateStatus(RpaUserRequest request);

    /**
     * Update user status (ADMIN permission)
     * @param request UpdateStatusRequest
     * @return ApiResponseDto
     */
    ApiResponse<?> updateStatus(UserListRequest request, int statusId);

    /**
     * Unlock user (ADMIN permission)
     * @param request UpdateStatusRequest
     * @return ApiResponseDto
     */
    ApiResponse<?> unlockUsers(UserListRequest request);

    /**
     * Unlock an user
     *
     * @param request UserListRequest
     */
    ApiResponse<?> approveRpaUser(UserListRequest request);

    /**
     * delete User (ADMIN permission)
     * @param userId String
     * @return ApiResponseDto
     */
    ApiResponse<?> deleteUser(String userId);

    /**
     * delete User list (ADMIN permission)
     * @param request UserListRequest
     * @return ApiResponseDto
     */
    ApiResponse<?> deleteUserList(UserListRequest request);


}
