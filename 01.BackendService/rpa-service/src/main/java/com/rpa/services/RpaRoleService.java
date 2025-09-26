package com.rpa.services;

import com.rpa.model.response.ApiResponse;

public interface RpaRoleService {

    /**
     * Get role list (ADMIN permission)
     *
     * @return ApiResponseDto
     */
    ApiResponse<?> getRoleCbx();
}
