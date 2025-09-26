package com.rpa.validator;

import com.rpa.common.Constant;
import com.rpa.validator.annotation.PhoneNumber;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.apache.commons.lang3.ObjectUtils;

public class PhoneNumberValidator implements ConstraintValidator<PhoneNumber, Object> {

    @Override
    public void initialize(PhoneNumber constraintAnnotation) {

    }

    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
        if (ObjectUtils.isEmpty(o)) {
            return true;
        }
        String phoneNumber = (String)o;
        if (phoneNumber.matches(Constant.PHONE_NUMBER_REGEX)) {
            return true;
        }
        return false;
    }
}
