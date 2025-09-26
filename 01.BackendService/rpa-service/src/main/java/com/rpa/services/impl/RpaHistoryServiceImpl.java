package com.rpa.services.impl;

import com.rpa.common.CommonMessage;
import com.rpa.mapper.RpaHistoryMapper;
import com.rpa.model.dto.ExecutionLogDetailDto;
import com.rpa.model.dto.RpaActionInstanceDto;
import com.rpa.model.dto.RpaStepExecutionDto;
import com.rpa.model.dto.RpaStepInstanceDto;
import com.rpa.model.param.RpaActionInstanceParam;
import com.rpa.model.param.RpaStepExecutionParam;
import com.rpa.model.param.RpaStepInstanceParam;
import com.rpa.model.request.history.SearchActionInstanceRequest;
import com.rpa.model.request.history.SearchStepExecutionRequest;
import com.rpa.model.request.history.SearchStepInstanceRequest;
import com.rpa.model.response.ApiResponse;
import com.rpa.model.response.RpaPageResponse;
import com.rpa.services.RpaHistoryService;
import com.rpa.utilities.BeanUtility;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RpaHistoryServiceImpl implements RpaHistoryService {

    @Autowired
    private RpaHistoryMapper rpaHistoryMapper;

    @Override
    public ApiResponse<?> getActionInstancePage(SearchActionInstanceRequest request) {
        RpaActionInstanceParam param = BeanUtility.convertValue(request, RpaActionInstanceParam.class);
        Integer offset = (request.getPage() -1) * request.getLimit();
        param.setOffset(offset);
        Long total = rpaHistoryMapper.getActionInstanceListCount(param);
        List<RpaActionInstanceDto> rpaStepParamInTemplatePage = rpaHistoryMapper.getActionInstancePage(param);
        RpaPageResponse<RpaActionInstanceDto> response = new RpaPageResponse<>();
        response.setPage(rpaStepParamInTemplatePage);
        response.setTotal(total);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C000.getMessageId())
                .data(response)
                .build();
    }

    @Override
    public ApiResponse<?> getStepInstancePage(SearchStepInstanceRequest request) {
        RpaStepInstanceParam param = BeanUtility.convertValue(request, RpaStepInstanceParam.class);
        Integer offset = (request.getPage() -1) * request.getLimit();
        param.setOffset(offset);
        Long total = rpaHistoryMapper.getStepInstanceListCount(param);
        List<RpaStepInstanceDto> rpaStepParamInTemplatePage = rpaHistoryMapper.getStepInstancePage(param);
        RpaPageResponse<RpaStepInstanceDto> response = new RpaPageResponse<>();
        response.setPage(rpaStepParamInTemplatePage);
        response.setTotal(total);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C000.getMessageId())
                .data(response)
                .build();
    }

    @Override
    public ApiResponse<?> getStepExecutionPage(SearchStepExecutionRequest request) {
        RpaStepExecutionParam param = BeanUtility.convertValue(request, RpaStepExecutionParam.class);
        Integer offset = (request.getPage() -1) * request.getLimit();
        param.setOffset(offset);
        Long total = rpaHistoryMapper.getStepExecutionListCount(param);
        List<RpaStepExecutionDto> rpaStepParamInTemplatePage = rpaHistoryMapper.getStepExecutionPage(param);
        RpaPageResponse<RpaStepExecutionDto> response = new RpaPageResponse<>();
        response.setPage(rpaStepParamInTemplatePage);
        response.setTotal(total);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C000.getMessageId())
                .data(response)
                .build();
    }

    @Override
    public ApiResponse<?> getExecutionLogDetail(Integer id) {
        ExecutionLogDetailDto result = rpaHistoryMapper.getExecutionLogDetail(id);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C000.getMessageId())
                .data(result)
                .build();
    }
}
