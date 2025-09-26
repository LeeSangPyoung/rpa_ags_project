package com.rpa.services.impl;

import com.rpa.common.CommonMessage;
import com.rpa.common.UserStatus;
import com.rpa.exception.RpaException;
import com.rpa.filter.JwtUtils;
import com.rpa.mapper.RpaUserMapper;
import com.rpa.model.RpaUserDetails;
import com.rpa.model.response.ApiResponse;
import com.rpa.model.param.RpaUserParam;
import com.rpa.model.request.user.LoginRequest;
import com.rpa.model.response.LoginResponse;
import com.rpa.services.AuthenticationService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    private UserDetailServiceImpl userDetailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private RpaUserMapper rpaUserMapper;

    @Override
    public ApiResponse<?> login(LoginRequest request) {
        String userId = request.getUserId();
        String password = request.getPassword();
        RpaUserDetails userDetails = userDetailService.loadUserByUsername(userId);
        int lockCount = userDetails.getLockCount();
        // Check if password is match or not
        RpaUserParam param = new RpaUserParam();
        param.setUserId(userId);
        if (!passwordEncoder.matches(password,userDetails.getPassword())) {
            lockCount ++;
            param.setLockCount(lockCount);
            if (lockCount ==5) {
                param.setStatusId(UserStatus.LOCKED.getStatusId());
            }
            rpaUserMapper.updateRpaUser(param);
            throw new RpaException(CommonMessage.E004.getMessageId(), new HashMap<>(Map.of("lockCount", lockCount)));
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userId, password));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        LoginResponse response = LoginResponse.builder()
        							.jwtToken(jwt)
                                    .userId(userDetails.getUsername())
                                    .roles(userDetails.getAuthorities().stream().
                                            map(GrantedAuthority::getAuthority).
                                            collect(Collectors.toList()))
                					.mustChangePw(userDetails.getMustChangePw())
                                    .build();

        // update lockCount = 0 in case login successfully
        param.setLockCount(0);
        rpaUserMapper.updateRpaUser(param);
        return ApiResponse.builder()
                        .status(HttpServletResponse.SC_OK)
                        .data(response)
                		.messageId(CommonMessage.C000.getMessageId())
                        .build();
    }

}
