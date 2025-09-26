package com.rpa.services.impl;

import com.rpa.common.CommonMessage;
import com.rpa.exception.RpaException;
import com.rpa.mapper.RpaStepParamInTemplateMapper;
import com.rpa.model.dto.RpaComboboxDto;
import com.rpa.model.dto.RpaStepParamInTemplateDto;
import com.rpa.model.param.RpaStepParamInTemplateParam;
import com.rpa.model.request.step.RpaStepParamInTemplateRequest;
import com.rpa.model.request.step.SearchStepParamInTemplateRequest;
import com.rpa.model.response.ApiResponse;
import com.rpa.model.response.RpaPageResponse;
import com.rpa.services.RpaStepParamInTemplateService;
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
public class RpaStepParamInTemplateServiceImpl implements RpaStepParamInTemplateService {

    @Autowired
    private RpaStepParamInTemplateMapper rpaStepParamInTemplateMapper;

    @Autowired
    private RpaStepService rpaStepService;

    @Override
    public ApiResponse<?> getStepParamInTemplateCbx() {
        List<RpaComboboxDto> actionCbxList = rpaStepParamInTemplateMapper.getStepParamInTemplateCbx();
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C000.getMessageId())
                .data(actionCbxList)
                .build();
    }

    @Override
    public ApiResponse<?> getStepParamInTemplatePage(SearchStepParamInTemplateRequest request) {
        RpaStepParamInTemplateParam param = BeanUtility.convertValue(request, RpaStepParamInTemplateParam.class);
        Integer offset = (request.getPage() -1) * request.getLimit();
        param.setOffset(offset);
		Long total = rpaStepParamInTemplateMapper.getStepParamInTemplateListCount(param);
        List<RpaStepParamInTemplateDto> rpaStepParamInTemplatePage = rpaStepParamInTemplateMapper.getStepParamInTemplatePage(param);
        RpaPageResponse<RpaStepParamInTemplateDto> response = new RpaPageResponse<>();
        response.setPage(rpaStepParamInTemplatePage);
        response.setTotal(total);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C000.getMessageId())
                .data(response)
                .build();
    }

    @Override
    public ApiResponse<?> insertRpaStepParamInTemplate(RpaStepParamInTemplateRequest request) {
		RpaStepParamInTemplateParam param = BeanUtility.convertValue(request, RpaStepParamInTemplateParam.class);
        rpaStepService.checkExistStep(param.getStepId());
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();
        param.setFrstRegUserId(userId);
        rpaStepParamInTemplateMapper.insertRpaStepParamInTemplate(param);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C001.getMessageId())
                .build();
    }

    @Override
    public ApiResponse<?> updateRpaStepParamInTemplate(RpaStepParamInTemplateRequest request) {
        RpaStepParamInTemplateParam param = BeanUtility.convertValue(request, RpaStepParamInTemplateParam.class);
        checkExistStepParamInTemplate(param.getId());
        rpaStepService.checkExistStep(param.getStepId());
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();
        param.setChgRegUserId(userId);
        rpaStepParamInTemplateMapper.updateRpaStepParamInTemplate(param);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C002.getMessageId())
                .build();
    }

    @Override
    @Transactional
    public ApiResponse<?> deleteRpaStepParamInTemplate(Integer id) {
        checkExistStepParamInTemplate(id);
        rpaStepParamInTemplateMapper.deleteRpaStepParamInTemplate(id);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C006.getMessageId())
                .build();
    }

    private void checkExistStepParamInTemplate(Integer id) {
        int count = rpaStepParamInTemplateMapper.countStepParamInTemplateById(id);
        if (count == 0) {
            throw new RpaException(CommonMessage.E024.getMessageId());
        }
    }
}
