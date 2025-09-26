package com.rpa.validator;

import com.rpa.common.Constant;
import com.rpa.validator.annotation.Password;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.apache.commons.lang3.ObjectUtils;

public class PasswordValidator implements ConstraintValidator<Password, Object> {

    @Override
    public void initialize(Password constraintAnnotation) {

    }

    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
        if (ObjectUtils.isEmpty(o)) {
            return true;
        }
        String password = (String)o;
        if (password.matches(Constant.PASSWORD_REGEX)) {
            return true;
        }
        return false;
    }
}
