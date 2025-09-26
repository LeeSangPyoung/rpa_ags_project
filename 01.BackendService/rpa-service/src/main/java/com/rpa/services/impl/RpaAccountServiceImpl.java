package com.rpa.services.impl;

import com.rpa.common.CommonMessage;
import com.rpa.exception.RpaException;
import com.rpa.mapper.RpaAccountMapper;
import com.rpa.model.dto.RpaAccountDto;
import com.rpa.model.param.RpaAccountParam;
import com.rpa.model.request.account.RpaAccountRequest;
import com.rpa.model.request.account.SearchAccountRequest;
import com.rpa.model.response.ApiResponse;
import com.rpa.services.RpaAccountService;
import com.rpa.utilities.BeanUtility;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RpaAccountServiceImpl implements RpaAccountService {

    @Autowired
    private RpaAccountMapper rpaAccountMapper;
    
    @Override
    public ApiResponse<?> getAccountList(SearchAccountRequest request) {
        RpaAccountParam param = BeanUtility.convertValue(request, RpaAccountParam.class);
        List<RpaAccountDto> rpaAccountList = rpaAccountMapper.getAccountList(param);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C000.getMessageId())
                .data(rpaAccountList)
                .build();
    }

    @Override
    public ApiResponse<?> insertRpaAccount(RpaAccountRequest request) {
		RpaAccountParam param = BeanUtility.convertValue(request, RpaAccountParam.class);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();
        param.setFrstRegUserId(userId);
        rpaAccountMapper.insertRpaAccount(param);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C001.getMessageId())
                .build();
    }

    @Override
    public ApiResponse<?> updateRpaAccount(RpaAccountRequest request) {
        checkExistAccount(request);
        RpaAccountParam param = BeanUtility.convertValue(request, RpaAccountParam.class);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();
        param.setChgRegDate(userId);
        rpaAccountMapper.updateRpaAccount(param);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C002.getMessageId())
                .build();
    }

    @Override
    @Transactional
    public ApiResponse<?> deleteRpaAccount(RpaAccountRequest request) {
        checkExistAccount(request);
        RpaAccountParam param = BeanUtility.convertValue(request, RpaAccountParam.class);
        rpaAccountMapper.deleteRpaAccount(param);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C006.getMessageId())
                .build();
    }

    @Override
    public void checkExistAccount(RpaAccountRequest request) {
        RpaAccountParam param = BeanUtility.convertValue(request, RpaAccountParam.class);
        int count = rpaAccountMapper.countAccountById(param);
        if (count == 0) {
            throw new RpaException(CommonMessage.E024.getMessageId());
        }
    }
}
