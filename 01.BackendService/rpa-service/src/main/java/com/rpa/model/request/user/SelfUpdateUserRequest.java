package com.rpa.model.request.user;

import com.rpa.validator.annotation.PhoneNumber;
import com.rpa.validator.annotation.SizeAllowEmpty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SelfUpdateUserRequest {
    @SizeAllowEmpty(min = 6, max = 50)
    private String userName;
    @Email
    @Max(200)
    private String email;
    @PhoneNumber
    private String phoneNumber;
}
