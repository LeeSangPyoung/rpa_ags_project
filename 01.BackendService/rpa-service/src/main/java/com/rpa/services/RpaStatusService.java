package com.rpa.services;

import com.rpa.model.response.ApiResponse;

public interface RpaStatusService {

    /**
     * Get Status combobox
     *
     * @return ApiResponseDto
     */
    ApiResponse<?> getStatusCbx();
}
