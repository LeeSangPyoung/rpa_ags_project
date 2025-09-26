package com.rpa.services.impl;

import com.rpa.common.CommonMessage;
import com.rpa.mapper.RpaRoleMapper;
import com.rpa.model.response.ApiResponse;
import com.rpa.model.dto.RpaRoleDto;
import com.rpa.services.RpaRoleService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RpaRoleServiceImpl implements RpaRoleService {

    @Autowired
    private RpaRoleMapper roleMapper;

    @Override
    public ApiResponse<?> getRoleCbx() {
        List<RpaRoleDto> roleList = roleMapper.getRoleCbx();
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C000.getMessageId())
                .data(roleList)
                .build();
    }
}
