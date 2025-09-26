package com.rpa.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RpaStepParamOutDto {
    private Integer id;
    private Integer stepExecutionId;
    private String paramKey;
    private String paramValue;
    private String frstRegUserId;
    private String frstRegDate;
    private String chgRegUserId;
    private String chgRegDate;
}