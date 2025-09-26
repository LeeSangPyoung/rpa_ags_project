package com.rpa.validator;

import com.rpa.common.Constant;
import com.rpa.validator.annotation.Email;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.apache.commons.lang3.ObjectUtils;

public class EmailValidator implements ConstraintValidator<Email, Object> {

    @Override
    public void initialize(Email constraintAnnotation) {

    }

    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
        if (ObjectUtils.isEmpty(o)) {
            return true;
        }
        String inputEmail = (String)o;
        if (inputEmail.matches(Constant.EMAIL_REGEX)) {
            return true;
        }
        return false;
    }
}
