package com.rpa.services.impl;

import com.rpa.common.CommonMessage;
import com.rpa.common.UserStatus;
import com.rpa.exception.RpaException;
import com.rpa.mapper.RpaUserMapper;
import com.rpa.model.dto.RpaUserDto;
import com.rpa.model.param.RpaUserParam;
import com.rpa.model.param.SearchListUserParam;
import com.rpa.model.request.admin.ResetPwBulkRequest;
import com.rpa.model.request.admin.ResetPwRequest;
import com.rpa.model.request.admin.RpaUserRequest;
import com.rpa.model.request.admin.SearchUserRequest;
import com.rpa.model.request.admin.UserListRequest;
import com.rpa.model.response.ApiResponse;
import com.rpa.model.response.RpaPageResponse;
import com.rpa.model.response.RpaUserResponse;
import com.rpa.services.RpaAdminService;
import com.rpa.utilities.BeanUtility;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RpaAdminServiceImpl implements RpaAdminService {

    @Autowired
    private RpaUserMapper rpaUserMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${user.password-default:tango1w2w3e4r%T}")
    private String defaultPassword;

    @Override
    public ApiResponse<?> getRpaUserList(SearchUserRequest request) {
        SearchListUserParam param = BeanUtility.convertValue(request, SearchListUserParam.class);
        Integer offset = (request.getPage() -1)* request.getLimit();
		param.setOffset(offset);
        Long total = rpaUserMapper.getUserListCount(param);
        List<RpaUserDto> userPage = rpaUserMapper.getUserPage(param);
        List<RpaUserResponse> userPageResponse = BeanUtility.convertValue(userPage, RpaUserResponse.class);
        RpaPageResponse<RpaUserResponse> response = new RpaPageResponse<>();
        response.setPage(userPageResponse);
        response.setTotal(total);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C000.getMessageId())
                .data(response).build();
    }

    @Override
    public ApiResponse<?> createUser(RpaUserRequest request) {
        RpaUserParam param = BeanUtility.convertValue(request, RpaUserParam.class);
        checkExistUser(param.getUserId());
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();
        param.setApproveUserId(userId);
        String password = request.getPassword();
        if (StringUtils.isEmpty(password)) {
            password = defaultPassword;
        }
        param.setPassword(passwordEncoder.encode(password));
		param.setStatusId(UserStatus.ACTIVE.getStatusId());
        param.setMustChangePw(1);
        rpaUserMapper.insertRpaUser(param);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C001.getMessageId())
                .build();
    }

    @Override
    @Transactional
    public ApiResponse<?> resetPassword(ResetPwBulkRequest request) {
        for (ResetPwRequest item : request.getUserList()) {
            RpaUserParam param = BeanUtility.convertValue(item, RpaUserParam.class);
            String password = item.getPassword();
            if (StringUtils.isEmpty(password)) {
                password = defaultPassword;
            }
            param.setPassword(passwordEncoder.encode(password));
            // Change user status to active
            param.setStatusId(UserStatus.ACTIVE.getStatusId());
            // Change lockCount to 0
            param.setLockCount(0);
            // To let user change password after reset
            param.setMustChangePw(1);
            rpaUserMapper.updateRpaUser(param);
        }
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C002.getMessageId())
                .build();
    }

    @Override
    public ApiResponse<?> updateStatus(RpaUserRequest request) {
        checkUserNotFound(request.getUserId());
        RpaUserParam param = BeanUtility.convertValue(request, RpaUserParam.class);
        if (!StringUtils.isEmpty(request.getPassword())) {
            param.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        rpaUserMapper.updateRpaUser(param);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C002.getMessageId())
                .build();
    }

    @Override
    public ApiResponse<?> updateStatus(UserListRequest request, int statusId) {
        rpaUserMapper.updateStatus(request.getUserList(), statusId);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C003.getMessageId())
                .build();
    }

    @Override
    public ApiResponse<?> unlockUsers(UserListRequest request) {
        rpaUserMapper.unlockRpaUser(request.getUserList());
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C004.getMessageId())
                .build();
    }

    @Override
    public ApiResponse<?> approveRpaUser(UserListRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String approveUserId = auth.getName();
        rpaUserMapper.approveRpaUser(request.getUserList(), approveUserId);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C004.getMessageId())
                .build();
    }

    @Override
    public ApiResponse<?> deleteUser(String userId) {
        checkUserNotFound(userId);
        rpaUserMapper.deleteRpaUser(userId);
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C006.getMessageId())
				.build();
    }

    @Override
    public ApiResponse<?> deleteUserList(UserListRequest request) {
        rpaUserMapper.deleteRpaUserList(request.getUserList());
        return ApiResponse.builder()
                .status(HttpServletResponse.SC_OK)
                .messageId(CommonMessage.C006.getMessageId())
                .build();
    }

    private void checkUserNotFound(String userId) {
        int countUser =  rpaUserMapper.countUserByUserId(userId);
        if (countUser == 0) {
            throw new RpaException(CommonMessage.E001.getMessageId());
        }
    }

    private void checkExistUser(String userId) {
        int countUser =  rpaUserMapper.countUserByUserId(userId);
        if (countUser != 0) {
            throw new RpaException(CommonMessage.E011.getMessageId());
        }
    }
}
