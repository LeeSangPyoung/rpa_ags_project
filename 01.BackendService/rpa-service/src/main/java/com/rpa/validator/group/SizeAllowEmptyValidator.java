package com.rpa.validator.group;

import com.rpa.validator.annotation.SizeAllowEmpty;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.util.ClassUtils;

import java.math.BigDecimal;

public class SizeAllowEmptyValidator implements ConstraintValidator<SizeAllowEmpty, Object> {

    int min;
    int max;

    @Override
    public void initialize(SizeAllowEmpty constraintAnnotation) {
        min = constraintAnnotation.min();
        max = constraintAnnotation.max();
    }

    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
        if (ObjectUtils.isEmpty(o)) {
            return true;
        }
        Class<?> clazz = o.getClass();
        if (ClassUtils.isPrimitiveOrWrapper(clazz) || clazz.equals(String.class) || clazz.equals(BigDecimal.class)) {
            return String.valueOf(o).getBytes().length >= min && String.valueOf(o).getBytes().length <= max;
        }
        return false;
    }
}
