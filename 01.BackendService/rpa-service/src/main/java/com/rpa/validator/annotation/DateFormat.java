package com.rpa.validator.annotation;

import com.rpa.common.Constant;
import com.rpa.validator.DateValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Documented
@Constraint(validatedBy = DateValidator.class)
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD, ElementType.PARAMETER})
public @interface DateFormat {
    String message() default "E023";

    String format() default Constant.FORMAT_DATE_YYYY_MM_DD;

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
