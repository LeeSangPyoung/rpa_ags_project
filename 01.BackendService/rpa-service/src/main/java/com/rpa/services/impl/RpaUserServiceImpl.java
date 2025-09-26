package com.rpa.services.impl;

import com.rpa.common.CommonMessage;
import com.rpa.common.UserStatus;
import com.rpa.exception.RpaException;
import com.rpa.mapper.RpaUserMapper;
import com.rpa.model.dto.RpaUserDto;
import com.rpa.model.param.RpaUserParam;
import com.rpa.model.request.user.ChangePwRequest;
import com.rpa.model.request.user.RegisterUserRequest;
import com.rpa.model.request.user.SelfUpdateUserRequest;
import com.rpa.model.response.ApiResponse;
import com.rpa.model.response.RpaUserResponse;
import com.rpa.services.RpaUserService;
import com.rpa.utilities.BeanUtility;
import com.rpa.utilities.DateUtility;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
public class RpaUserServiceImpl implements RpaUserService {

    @Autowired
    private RpaUserMapper rpaUserMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${user.password-period}")
    private Long passwordMinPeriod;

    @Override
    public ApiResponse<?> getUserInfo() {
        // Get userId
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();
        RpaUserParam param = RpaUserParam.builder()
                                        .userId(userId)
                						.statusId(UserStatus.ACTIVE.getStatusId())
                                        .build();
        // Get user information by userId
        RpaUserDto user = rpaUserMapper.getUserFullInfo(param);
        if (ObjectUtils.isEmpty(user)) {
            return ApiResponse.builder()
                    .status(HttpServletResponse.SC_OK)
                    .messageId(CommonMessage.E001.getMessageId())
                    .build();
        }
        RpaUserResponse response = BeanUtility.convertValue(user, RpaUserResponse.class);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C000.getMessageId())
                .data(response)
                .build();
    }

    @Override
    public ApiResponse<?> changePassword(ChangePwRequest request) {
        // Get userId
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();
        RpaUserParam param = RpaUserParam.builder()
                                        .userId(userId)
                						.statusId(UserStatus.ACTIVE.getStatusId())
                                        .build();
        RpaUserDto user = rpaUserMapper.getUserFullInfo(param);
        if (ObjectUtils.isEmpty(user)) {
            throw new RpaException(CommonMessage.E001.getMessageId());
        }
		//If password is reset by admin, allow change without check last time password changing
        if (user.getMustChangePw() != 1) {
            Long currentTime = new Date().getTime();
            Long lastChangePassTime = DateUtility.parse(user.getLastChangePassAt()).getTime();
            if (currentTime - lastChangePassTime < passwordMinPeriod) {
                return ApiResponse.builder()
                        .status(HttpServletResponse.SC_OK)
                        .messageId(CommonMessage.E007.getMessageId())
                        .build();
            }
        }
		// Check input current password with password in db
        if (passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            String encryptPass = passwordEncoder.encode(request.getNewPassword());
            RpaUserParam changePWParam = RpaUserParam.builder()
                                                    .userId(userId)
                                                    .password(encryptPass)
                                                    .mustChangePw(0)
                    								.lastChangePassAt(DateUtility.parse(new Date()))
                                                    .build();
            rpaUserMapper.updateRpaUser(changePWParam);
            return ApiResponse.builder()
                    .status(HttpServletResponse.SC_OK)
                    .messageId(CommonMessage.C002.getMessageId())
                    .build();
        } else {
            return ApiResponse.builder()
                    .status(HttpServletResponse.SC_OK)
                    .messageId(CommonMessage.E015.getMessageId())
                    .build();
        }
    }

    @Override
    public ApiResponse<?> registerUser(RegisterUserRequest request) {

        int countUser =  rpaUserMapper.countUserByUserId(request.getUserId());
        if (countUser != 0) {
            throw new RpaException(CommonMessage.E011.getMessageId());
        }
        RpaUserParam param = BeanUtility.convertValue(request, RpaUserParam.class);
        String encryptedPassword = passwordEncoder.encode(request.getPassword());
        param.setPassword(encryptedPassword);
        param.setStatusId(UserStatus.SUBMITTED.getStatusId());
        rpaUserMapper.insertRpaUser(param);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C003.getMessageId())
                .build();
    }

    @Override
    @Transactional
    public ApiResponse<?> selfUpdateUser(SelfUpdateUserRequest request) {
        RpaUserParam param = BeanUtility.convertValue(request, RpaUserParam.class);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();
        param.setUserId(userId);
        RpaUserDto user = rpaUserMapper.getUser(param);
        if (ObjectUtils.isEmpty(user)) {
            return ApiResponse.builder()
                    .status(HttpServletResponse.SC_OK)
                    .messageId(CommonMessage.E001.getMessageId())
                    .build();
        }
        rpaUserMapper.updateRpaUser(param);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C002.getMessageId())
                .build();
    }
}
