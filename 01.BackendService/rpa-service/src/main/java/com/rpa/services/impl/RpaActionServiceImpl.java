package com.rpa.services.impl;

import com.rpa.common.CommonMessage;
import com.rpa.exception.RpaException;
import com.rpa.mapper.RpaActionMapper;
import com.rpa.model.dto.RpaActionDto;
import com.rpa.model.dto.RpaComboboxDto;
import com.rpa.model.param.RpaActionParam;
import com.rpa.model.request.DeleteListRequest;
import com.rpa.model.request.action.ManualExecActionRequest;
import com.rpa.model.request.action.RpaActionRequest;
import com.rpa.model.request.action.SearchActionRequest;
import com.rpa.model.response.ApiResponse;
import com.rpa.model.response.RpaPageResponse;
import com.rpa.services.RpaActionService;
import com.rpa.utilities.BeanUtility;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RpaActionServiceImpl implements RpaActionService {

    @Autowired
    private RpaActionMapper rpaActionMapper;

    @Override
    public ApiResponse<?> getActionCbx() {
        List<RpaComboboxDto> actionCbxList = rpaActionMapper.getActionCbx();
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C000.getMessageId())
                .data(actionCbxList)
                .build();
    }

    @Override
    public ApiResponse<?> getActionPage(SearchActionRequest request) {
        if (!StringUtils.isEmpty(request.getKeyword())
                && (!StringUtils.isEmpty(request.getName())
                	|| !StringUtils.isEmpty(request.getFrstRegUserId()))) {
			throw new RpaException(CommonMessage.E001.getMessageId());
        }
        RpaActionParam param = BeanUtility.convertValue(request, RpaActionParam.class);
        Integer offset = (request.getPage() -1) * request.getLimit();
        param.setOffset(offset);
		Long total = rpaActionMapper.getActionListCount(param);
        List<RpaActionDto> rpaActionPage = rpaActionMapper.getActionPage(param);
        RpaPageResponse<RpaActionDto> response = new RpaPageResponse<>();
        response.setPage(rpaActionPage);
        response.setTotal(total);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C000.getMessageId())
                .data(response)
                .build();
    }

    @Override
    public ApiResponse<?> getActionById(Integer id) {
        RpaActionDto rpaActionDto = rpaActionMapper.getActionById(id);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C000.getMessageId())
                .data(rpaActionDto)
                .build();
    }

    @Override
    public ApiResponse<?> insertRpaAction(RpaActionRequest request) {
		RpaActionParam param = BeanUtility.convertValue(request, RpaActionParam.class);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();
        param.setFrstRegUserId(userId);
        rpaActionMapper.insertRpaAction(param);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C001.getMessageId())
                .build();
    }

    @Override
    public ApiResponse<?> updateRpaAction(RpaActionRequest request) {
        RpaActionParam param = BeanUtility.convertValue(request, RpaActionParam.class);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();
        param.setChgRegUserId(userId);
        checkExistAction(param.getId());
        rpaActionMapper.updateRpaAction(param);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C002.getMessageId())
                .build();
    }

    @Override
    @Transactional
    public ApiResponse<?> deleteRpaActionList(DeleteListRequest request) {
        for (Integer id : request.getIdList()) {
            checkExistAction(id);
        }
        rpaActionMapper.deleteRpaActionList(request.getIdList());
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C006.getMessageId())
                .build();
    }

    @Override
    public ApiResponse<?> manualExecAction(ManualExecActionRequest request) {
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C007.getMessageId())
                .data(request)
                .build();
    }

    @Override
    public void checkExistAction(Integer id) {
        int count = rpaActionMapper.countActionById(id);
        if (count == 0) {
            throw new RpaException(CommonMessage.E024.getMessageId());
        }
    }
}
