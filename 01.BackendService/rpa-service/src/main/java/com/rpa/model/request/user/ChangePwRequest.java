package com.rpa.model.request.user;

import com.rpa.validator.annotation.Password;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePwRequest {
    @NotEmpty
    private String oldPassword;
    @NotEmpty
    @Password
    private String newPassword;

}
