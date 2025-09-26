package com.rpa.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoginResponse {
	private String jwtToken;
    private String userId;
    private List<String> roles;
    private String status;
    private int mustChangePw;
}
