package com.rpa.services.impl;

import com.rpa.common.CommonMessage;
import com.rpa.common.UserStatus;
import com.rpa.exception.RpaException;
import com.rpa.mapper.RpaUserMapper;
import com.rpa.model.RpaUserDetails;
import com.rpa.model.dto.RpaUserDto;
import com.rpa.model.param.RpaUserParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private RpaUserMapper rpaUserMapper;

    @Override
    public RpaUserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        RpaUserDetails userDetails;
        RpaUserParam param = RpaUserParam.builder()
                                        .userId(userId)
                                        .build();
        RpaUserDto rpaUser = rpaUserMapper.getUserFullInfo(param);
        if (ObjectUtils.isEmpty(rpaUser)){
            throw new RpaException(new UsernameNotFoundException("User not found"), CommonMessage.E001.getMessageId());
        }
        if (rpaUser.getStatusId() == UserStatus.ACTIVE.getStatusId()){
            userDetails =  new RpaUserDetails(rpaUser.getUserId(),
                                                rpaUser.getPassword(),
                                                RpaUserDetails.authorities(rpaUser.getRoleName()),
                                                rpaUser.getLockCount(),
                    							rpaUser.getMustChangePw());
        }
        else if (rpaUser.getStatusId() == UserStatus.LOCKED.getStatusId()) {
            throw new RpaException(CommonMessage.E020.getMessageId());
        } else {
            throw new RpaException(CommonMessage.E021.getMessageId());
        }
        return userDetails;
    }
}
