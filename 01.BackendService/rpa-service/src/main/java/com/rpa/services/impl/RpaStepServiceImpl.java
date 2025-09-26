package com.rpa.services.impl;

import com.rpa.common.CommonMessage;
import com.rpa.exception.RpaException;
import com.rpa.mapper.RpaStepMapper;
import com.rpa.model.dto.RpaComboboxDto;
import com.rpa.model.dto.RpaStepDto;
import com.rpa.model.param.RpaStepParam;
import com.rpa.model.request.DeleteListRequest;
import com.rpa.model.request.step.RpaStepRequest;
import com.rpa.model.request.step.SearchStepRequest;
import com.rpa.model.response.ApiResponse;
import com.rpa.model.response.RpaPageResponse;
import com.rpa.services.RpaAccountGroupService;
import com.rpa.services.RpaActionService;
import com.rpa.services.RpaStepService;
import com.rpa.utilities.BeanUtility;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RpaStepServiceImpl implements RpaStepService {

    @Autowired
    private RpaStepMapper rpaStepMapper;

    @Autowired
    private RpaActionService rpaActionService;

    @Autowired
    private RpaAccountGroupService rpaAccountGroupService;

    @Override
    public ApiResponse<?> getStepCbx(Integer rpaActionId) {
        List<RpaComboboxDto> actionCbxList = rpaStepMapper.getStepCbx(rpaActionId);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C000.getMessageId())
                .data(actionCbxList)
                .build();
    }

    @Override
    public ApiResponse<?> getStepById(Integer id) {
        RpaStepDto rpaStepDto = rpaStepMapper.getStepById(id);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C000.getMessageId())
                .data(rpaStepDto)
                .build();
    }

    @Override
    public ApiResponse<?> getStepPage(SearchStepRequest request) {
        RpaStepParam param = BeanUtility.convertValue(request, RpaStepParam.class);
        Integer offset = (request.getPage() -1) * request.getLimit();
        param.setOffset(offset);
		Long total = rpaStepMapper.getStepListCount(param);
        List<RpaStepDto> rpaStepPage = rpaStepMapper.getStepPage(param);
        RpaPageResponse<RpaStepDto> response = new RpaPageResponse<>();
        response.setPage(rpaStepPage);
        response.setTotal(total);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C000.getMessageId())
                .data(response)
                .build();
    }

    @Override
    public ApiResponse<?> insertRpaStep(RpaStepRequest request) {
		RpaStepParam param = BeanUtility.convertValue(request, RpaStepParam.class);
        rpaActionService.checkExistAction(param.getRpaActionId());
        if (param.getAccountGroupId() != null) {
            rpaAccountGroupService.checkExistAccountGroup(param.getAccountGroupId());
        }
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();
        param.setFrstRegUserId(userId);
        rpaStepMapper.insertRpaStep(param);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C001.getMessageId())
                .build();
    }

    @Override
    public ApiResponse<?> updateRpaStep(RpaStepRequest request) {
        RpaStepParam param = BeanUtility.convertValue(request, RpaStepParam.class);
        checkExistStep(param.getId());
        rpaActionService.checkExistAction(param.getRpaActionId());
        if (param.getAccountGroupId() != null) {
            rpaAccountGroupService.checkExistAccountGroup(param.getAccountGroupId());
        }
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();
        param.setChgRegUserId(userId);
        rpaStepMapper.updateRpaStep(param);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C002.getMessageId())
                .build();
    }

    @Override
    @Transactional
    public ApiResponse<?> deleteRpaStep(Integer id) {
        checkExistStep(id);
        rpaStepMapper.deleteRpaStep(id);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C006.getMessageId())
                .build();
    }

    @Override
    @Transactional
    public ApiResponse<?> deleteRpaStepList(DeleteListRequest request) {
        for (Integer id : request.getIdList()) {
            checkExistStep(id);
        }
        rpaStepMapper.deleteRpaStepList(request.getIdList());
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C006.getMessageId())
                .build();
    }

    @Override
    public void checkExistStep(Integer id) {
        int count = rpaStepMapper.countStepById(id);
        if (count == 0) {
            throw new RpaException(CommonMessage.E024.getMessageId());
        }
    }
}
