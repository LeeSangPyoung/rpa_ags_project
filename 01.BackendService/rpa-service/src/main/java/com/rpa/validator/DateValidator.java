package com.rpa.validator;

import com.rpa.utilities.DateUtility;
import com.rpa.validator.annotation.DateFormat;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.apache.commons.lang3.ObjectUtils;

public class DateValidator implements ConstraintValidator<DateFormat, Object> {

    String format;

    @Override
    public void initialize(DateFormat constraintAnnotation) {
		format = constraintAnnotation.format();
    }

    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
        if (ObjectUtils.isEmpty(o)) {
            return true;
        }
        return DateUtility.isValidFormatDate((String)o, format);
    }
}
