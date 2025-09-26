package com.rpa.services;

import com.rpa.model.response.ApiResponse;
import com.rpa.model.request.user.ChangePwRequest;
import com.rpa.model.request.user.RegisterUserRequest;
import com.rpa.model.request.user.SelfUpdateUserRequest;

public interface RpaUserService {

    /**
     * Get User by userId
     *
     * @return ApiResponseDto
     */
    ApiResponse<?> getUserInfo();

    /**
     * Change user password
     * @param request ResetPwRequest
     * @return ApiResponseDto
     */
    ApiResponse<?> changePassword(ChangePwRequest request);

    /**
     * Register new user
     * @param request RpaUserRequest
     * @return ApiResponseDto
     */
    ApiResponse<?> registerUser(RegisterUserRequest request);

    /**
     * Update user by itself
     * @param request SelfUpdateUserRequest
     * @return ApiResponseDto
     */
    ApiResponse<?> selfUpdateUser(SelfUpdateUserRequest request);

}
