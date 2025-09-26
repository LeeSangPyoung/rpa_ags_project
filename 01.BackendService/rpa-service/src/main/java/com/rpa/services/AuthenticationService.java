package com.rpa.services;

import com.rpa.model.response.ApiResponse;
import com.rpa.model.request.user.LoginRequest;


public interface AuthenticationService {
    /**
     * Login using userId and password
     * @param request LoginRequest
     * @return ApiResponseDto
     */
    ApiResponse<?> login(LoginRequest request);
}
