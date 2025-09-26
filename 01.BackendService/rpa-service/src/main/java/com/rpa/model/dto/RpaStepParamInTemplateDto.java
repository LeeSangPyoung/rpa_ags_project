package com.rpa.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RpaStepParamInTemplateDto {
    private Integer id;
    private Integer stepId;
    private String stepName;
    private String paramKey;
    private String paramValueTemplate;
    private Boolean isDynamic;
    private String frstRegUserId;
    private String frstRegDate;
    private String chgRegUserId;
    private String chgRegDate;
}