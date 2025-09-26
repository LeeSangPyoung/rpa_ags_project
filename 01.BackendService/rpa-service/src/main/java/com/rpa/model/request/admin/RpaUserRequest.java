package com.rpa.model.request.admin;

import com.rpa.validator.annotation.Email;
import com.rpa.validator.annotation.Password;
import com.rpa.validator.annotation.PhoneNumber;
import com.rpa.validator.annotation.SizeAllowEmpty;
import com.rpa.validator.group.Insert;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RpaUserRequest {
    @NotEmpty
    private String userId;
    @Password
    private String password;
    @SizeAllowEmpty(min = 6, max = 50)
    private String userName;
    @Email
    @Size(max = 200)
    @NotEmpty(groups = {Insert.class})
    private String email;
    @PhoneNumber
    @NotEmpty(groups = {Insert.class})
    private String phoneNumber;
    private Integer statusId;
    private Integer mustChangePw;
    @NotNull(groups = {Insert.class})
    private Integer roleId;
}
