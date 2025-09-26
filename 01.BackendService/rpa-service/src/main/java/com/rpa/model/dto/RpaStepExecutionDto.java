package com.rpa.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RpaStepExecutionDto {
    private Integer id;
    private Integer rpaStepInstanceId;
    private Integer rpaStepId;
    private String rpaStepName;
    private Integer rpaActionId;
    private String rpaActionName;
    private String description;
    private Integer accountId;
    private String status;
    private String startTime;
    private String endTime;
    private String executionGroupId;
    private String resultLog;
    private String frstRegUserId;
    private String frstRegDate;
    private String chgRegUserId;
    private String chgRegDate;
}