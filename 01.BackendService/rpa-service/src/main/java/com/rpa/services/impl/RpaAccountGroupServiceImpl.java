package com.rpa.services.impl;

import com.rpa.common.CommonMessage;
import com.rpa.exception.RpaException;
import com.rpa.mapper.RpaAccountGroupMapper;
import com.rpa.model.dto.RpaAccountGroupDto;
import com.rpa.model.dto.RpaComboboxDto;
import com.rpa.model.param.RpaAccountGroupParam;
import com.rpa.model.request.accountgroup.RpaAccountGroupRequest;
import com.rpa.model.request.accountgroup.SearchAccountGroupRequest;
import com.rpa.model.response.ApiResponse;
import com.rpa.services.RpaAccountGroupService;
import com.rpa.utilities.BeanUtility;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RpaAccountGroupServiceImpl implements RpaAccountGroupService {

    @Autowired
    private RpaAccountGroupMapper rpaAccountGroupMapper;

    @Override
    public ApiResponse<?> getAccountGroupCbx() {
        List<RpaComboboxDto> accountGroupCbx = rpaAccountGroupMapper.getAccountGroupCbx();
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C000.getMessageId())
                .data(accountGroupCbx)
                .build();
    }

    @Override
    public ApiResponse<?> getAccountGroupList(SearchAccountGroupRequest request) {
        RpaAccountGroupParam param = BeanUtility.convertValue(request, RpaAccountGroupParam.class);
        List<RpaAccountGroupDto> rpaAccountGroupPage = rpaAccountGroupMapper.getAccountGroupList(param);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C000.getMessageId())
                .data(rpaAccountGroupPage)
                .build();
    }

    @Override
    public ApiResponse<?> insertRpaAccountGroup(RpaAccountGroupRequest request) {
		RpaAccountGroupParam param = BeanUtility.convertValue(request, RpaAccountGroupParam.class);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();
        param.setFrstRegUserId(userId);
        rpaAccountGroupMapper.insertRpaAccountGroup(param);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C001.getMessageId())
                .build();
    }

    @Override
    public ApiResponse<?> updateRpaAccountGroup(RpaAccountGroupRequest request) {
        checkExistAccountGroup(request.getId());
        RpaAccountGroupParam param = BeanUtility.convertValue(request, RpaAccountGroupParam.class);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();
        param.setChgRegDate(userId);
        rpaAccountGroupMapper.updateRpaAccountGroup(param);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C002.getMessageId())
                .build();
    }

    @Override
    @Transactional
    public ApiResponse<?> deleteRpaAccountGroup(Integer id) {
        checkExistAccountGroup(id);
        rpaAccountGroupMapper.deleteRpaAccountGroup(id);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C006.getMessageId())
                .build();
    }

    @Override
    public void checkExistAccountGroup(Integer id) {
        int count = rpaAccountGroupMapper.countAccountGroupById(id);
        if (count == 0) {
            throw new RpaException(CommonMessage.E024.getMessageId());
        }
    }
}
