package com.rpa.model.request.user;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
    @NotEmpty
    private String userId;
    @NotEmpty
    private String password;
}
