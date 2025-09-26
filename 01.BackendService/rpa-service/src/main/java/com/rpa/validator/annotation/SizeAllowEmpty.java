package com.rpa.validator.annotation;

import com.rpa.validator.group.SizeAllowEmptyValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Documented
@Constraint(validatedBy = SizeAllowEmptyValidator.class)
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD, ElementType.PARAMETER})
public @interface SizeAllowEmpty {
    String message() default "E014";

    int min() default 0;

    int max() default 0;

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
