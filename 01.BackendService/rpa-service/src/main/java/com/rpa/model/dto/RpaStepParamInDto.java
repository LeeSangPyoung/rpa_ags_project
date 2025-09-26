package com.rpa.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RpaStepParamInDto {
    private Integer stepExecutionId;
    private Integer no;
    private String paramKey;
    private String paramValue;
    private Boolean isDynamic;
    private String paramValueDefault;
    private String frstRegUserId;
    private String frstRegDate;
    private String chgRegUserId;
    private String chgRegDate;
}