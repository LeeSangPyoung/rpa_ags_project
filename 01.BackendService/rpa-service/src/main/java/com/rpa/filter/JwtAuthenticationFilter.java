package com.rpa.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rpa.common.CommonMessage;
import com.rpa.exception.RpaException;
import com.rpa.mapper.RpaUserMapper;
import com.rpa.model.dto.RpaUserDto;
import com.rpa.model.param.RpaUserParam;
import com.rpa.services.impl.UserDetailServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailServiceImpl userDetailService;

    @Autowired
    private RpaUserMapper rpaUserMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        try {
        String token = parseJwt(request);
        if (!StringUtils.isEmpty(token) && jwtUtils.validateJwtToken(token)) {
            String userName = jwtUtils.getUserNameFromJwtToken(token);
            UserDetails userDetails = userDetailService.loadUserByUsername(userName);

            //Check if need to change password or not
            RpaUserParam param = RpaUserParam.builder().userId(userName).build();
            RpaUserDto user = rpaUserMapper.getUserFullInfo(param);
            Integer mustChangePw = user.getMustChangePw();
            if (mustChangePw == 1 && !request.getRequestURI().endsWith("/change-password")) {
                throw new RpaException(CommonMessage.E016.getMessageId());
            }

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
        } catch (RpaException ex) {
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setStatus(HttpServletResponse.SC_OK);
            final Map<String, Object> body = new HashMap<>();
            body.put("status", HttpServletResponse.SC_FORBIDDEN);
            body.put("messageId", ex.getMessageId());
            final ObjectMapper mapper = new ObjectMapper();
            mapper.writeValue(response.getOutputStream(), body);
        }
    }

    public String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        if (!StringUtils.isEmpty(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }
        return null;
    }
}