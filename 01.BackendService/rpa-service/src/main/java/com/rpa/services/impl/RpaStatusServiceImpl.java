package com.rpa.services.impl;

import com.rpa.common.CommonMessage;
import com.rpa.mapper.RpaStatusMapper;
import com.rpa.model.dto.RpaComboboxDto;
import com.rpa.model.response.ApiResponse;
import com.rpa.services.RpaStatusService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RpaStatusServiceImpl implements RpaStatusService {

    @Autowired
    private RpaStatusMapper statusMapper;

    @Override
    public ApiResponse<?> getStatusCbx() {
        List<RpaComboboxDto> statusCbxList = statusMapper.getStatusCbx();
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C000.getMessageId())
                .data(statusCbxList)
                .build();
    }
}
