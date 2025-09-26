package com.rpa.model.request.user;

import com.rpa.validator.annotation.Email;
import com.rpa.validator.annotation.Password;
import com.rpa.validator.annotation.PhoneNumber;
import com.rpa.validator.annotation.SizeAllowEmpty;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterUserRequest {
    @NotEmpty
    @Size(min = 6, max = 50)
    private String userId;
    @SizeAllowEmpty(min = 6, max = 50)
    private String userName;
    @NotEmpty
    @Password
    private String password;
    @NotEmpty
    @Email
    @Size(max = 200)
    private String email;
    @NotEmpty
    @PhoneNumber
    private String phoneNumber;
    @NotNull
    private Integer roleId;
}
