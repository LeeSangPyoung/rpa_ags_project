package com.rpa.model.request.admin;

import com.rpa.validator.annotation.Password;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPwRequest {
    @NotEmpty
    private String userId;
    @Password
    private String password;
}
